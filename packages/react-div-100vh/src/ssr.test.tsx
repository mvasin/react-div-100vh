import React from 'react'
import { renderToString } from 'react-dom/server'
import Div100vh, { use100vh } from '.'

describe('in NodeJS environment', () => {
  it('passes sanity check', () => {
    expect(typeof window).toBe('undefined')
  })

  describe('Div100vh component', () => {
    it('does not throw while rendering to a string', () => {
      expect(() => {
        renderToString(<Div100vh />)
      }).not.toThrow()
    })
  })

  describe('use100vh hook', () => {
    it('returns null', () => {
      const TestApp = () => {
        const height = use100vh()
        const text = `The real height is ${String(height)}`
        return <div>{text}</div>
      }
      expect(renderToString(<TestApp />)).toMatch(/The real height is null/)
    })
  })
})
