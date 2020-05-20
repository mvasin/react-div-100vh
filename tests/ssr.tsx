import React from 'react'
import { renderToString } from 'react-dom/server'
import Div100vh, { use100vh } from '../lib'
import { strict as assert } from 'assert'

// There are not enough unit tests yet to bring in Jest as a (rather heavy)
// dependency, the built-in NodeJS assertion functions are enough.

// passes sanity check that we are running in NodeJS environment
assert.strictEqual(typeof window, 'undefined', 'runs in Node env')

// doesn't blow up in NodeJS
assert.doesNotThrow(() => {
  renderToString(<Div100vh />)
})

// hook yields `undefined`
const HookApp = () => {
  const height = use100vh()
  const text = `The real height is ${String(height)}`
  return <div>{text}</div>
}
assert.match(renderToString(<HookApp />), /The real height is undefined/)
