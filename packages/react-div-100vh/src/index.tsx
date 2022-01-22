import React, { forwardRef, useState, useEffect, HTMLAttributes } from 'react'

let warned = false

type PropsOf<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  E extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>>

export interface OwnProps<E extends React.ElementType = React.ElementType> {
  as?: E
  style?: React.CSSProperties
}

export type Props<E extends React.ElementType> = OwnProps<E> &
  Omit<PropsOf<E>, keyof OwnProps>

const defaultElement = 'div'

const Div100vh = React.forwardRef(
  ({ as, style, ...other }: OwnProps, ref: React.Ref<Element>) => {
    const Element = as || defaultElement
    const height = use100vh()

    // TODO: warn only in development
    if (!warned && style?.height) {
      warned = true
      console.warn(
        '<Div100vh /> overrides the height property of the style prop'
      )
    }
    const styleWithRealHeight = {
      ...style,
      height: height ? `${height}px` : '100vh'
    }
    return <Element ref={ref} style={styleWithRealHeight} {...other} />
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: Props<E>
) => JSX.Element

export default Div100vh

export function use100vh(): number | null {
  const [height, setHeight] = useState<number | null>(measureHeight)

  const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce()

  useEffect(() => {
    if (!wasRenderedOnClientAtLeastOnce) return

    function setMeasuredHeight() {
      const measuredHeight = measureHeight()
      setHeight(measuredHeight)
    }

    window.addEventListener('resize', setMeasuredHeight)
    return () => window.removeEventListener('resize', setMeasuredHeight)
  }, [wasRenderedOnClientAtLeastOnce])
  return wasRenderedOnClientAtLeastOnce ? height : null
}

export function measureHeight(): number | null {
  if (!isClient()) return null
  return window.innerHeight
}

// Once we ended up on the client, the first render must look the same as on
// the server so hydration happens without problems. _Then_ we immediately
// schedule a subsequent update and return the height measured on the client.
// It's not needed for CSR-only apps, but is critical for SSR.
function useWasRenderedOnClientAtLeastOnce() {
  const [wasRenderedOnClientAtLeastOnce, setWasRenderedOnClientAtLeastOnce] =
    useState(false)

  useEffect(() => {
    if (isClient()) {
      setWasRenderedOnClientAtLeastOnce(true)
    }
  }, [])
  return wasRenderedOnClientAtLeastOnce
}

function isClient() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
