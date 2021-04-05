/**
 * @jest-environment jsdom
 */

import React, { useRef, useState } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Div100vh from '.'
import { act } from 'react-dom/test-utils'

let container: HTMLDivElement | null
beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  container && document.body.removeChild(container)
  // have no idea why should it be set to null, just grabbed from
  // https://reactjs.org/docs/test-utils.html#act
  container = null
})

it('passes JSDOM environment sanity check', () => {
  expect(typeof window).toBe('object')
})

describe('Div100vh component', () => {
  it('does not unmount/re-mount resize listeners on unrelated re-renders', () => {
    const addListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeListenerSpy = jest.spyOn(window, 'removeEventListener')

    let renderCount = 0
    const TestApp = () => {
      const [bool, setBool] = useState(true)
      if (bool) setBool(false)
      renderCount++
      return <Div100vh>{bool}</Div100vh>
    }

    act(() => {
      render(<TestApp />, container)
    })

    // To make sure that provoking extra rendering works
    expect(renderCount).toBe(2)

    // Checks that resize listener was added only once given 2 re-renderings
    const resizeListenerMountCalls = addListenerSpy.mock.calls.filter(
      (params) => params[0] === 'resize'
    )
    expect(resizeListenerMountCalls.length).toBe(1)

    // Making sure un-mounting happens also just once
    act(() => {
      container && unmountComponentAtNode(container)
    })
    const resizeListenerUnmountCalls = removeListenerSpy.mock.calls.filter(
      (args) => args[0] === 'resize'
    )
    expect(resizeListenerUnmountCalls.length).toBe(1)
  })

  it('forwards ref', () => {
    let focus: () => void
    const TestApp = () => {
      const ref = useRef<HTMLDivElement>(null)
      focus = () => {
        ref.current?.focus()
      }
      return (
        <Div100vh
          ref={ref}
          // so we look up the target div by different means (not via the ref)
          data-test
          // https://github.com/jsdom/jsdom/issues/2586#issuecomment-561871527
          tabIndex={1}
        >
          hello
        </Div100vh>
      )
    }
    act(() => {
      render(<TestApp />, container)
    })

    const divElement = container?.querySelector('[data-test]')
    expect(document.activeElement === divElement).toBe(false)

    act(() => {
      focus()
    })

    expect(document.activeElement === divElement).toBe(true)
  })
})
