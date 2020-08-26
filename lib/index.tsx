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
  const [height, setHeight] = useState(getRealHeight())
  const setRealHeight = () => {
    if (height !== getRealHeight()) setHeight(getRealHeight())
  }

  useEffect(() => {
    window.addEventListener('resize', setRealHeight)
    return () => window.removeEventListener('resize', setRealHeight)
  }, [setRealHeight, height])
  return height
}

export function getRealHeight(): number | null {
  if (typeof window === 'undefined') return null
  return document.documentElement?.clientHeight || window.innerHeight
}
