import React, { useState, useEffect, HTMLAttributes } from 'react'

export default function Div100vh({
  style = {},
  ...other
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  const height = use100vh()
  const styleWithRealHeight = {
    ...style,
    height: height ? `${height}px` : '100vh'
  }
  return <div style={styleWithRealHeight} {...other} />
}

export function use100vh(): number | null {
  const [height, setHeight] = useState<number | null>(null)

  const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce()

  useEffect(() => {
    function setMeasuredHeight() {
      const measuredHeight = measureHeight()
      if (wasRenderedOnClientAtLeastOnce && height !== measuredHeight)
        setHeight(measuredHeight)
    }

    window.addEventListener('resize', setMeasuredHeight)
    return () => window.removeEventListener('resize', setMeasuredHeight)
  }, [height, wasRenderedOnClientAtLeastOnce])
  return height
}

export function measureHeight(): number | null {
  if (!isClient()) return null
  return document.documentElement?.clientHeight || window.innerHeight
}

// Once we ended up on client, the first render must look the same as on
// the server so hydration happens without problems. _Then_ we immediately
// schedule a subsequent update and return the height measured on the client.
// It's not needed for CSR-only apps, but is critical for SSR.
function useWasRenderedOnClientAtLeastOnce() {
  const [
    wasRenderedOnClientAtLeastOnce,
    setWasRenderedOnClientAtLeastOnce
  ] = useState(false)

  useEffect(() => {
    if (isClient() && !wasRenderedOnClientAtLeastOnce) {
      setWasRenderedOnClientAtLeastOnce(true)
    }
  }, [wasRenderedOnClientAtLeastOnce])
  return wasRenderedOnClientAtLeastOnce
}

function isClient() {
  return typeof window !== 'undefined'
}
