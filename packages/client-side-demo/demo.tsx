import React from 'react'
import Div100vh from 'react-div-100vh'

const style = {
  background: 'lightblue',
  display: 'flex',
  flexDirection: 'column',
  height: '500px'
} as const

export function Demo(): JSX.Element {
  return (
    <div>
      <Div100vh style={style}>
        <div style={{ flex: 'auto', padding: '1rem' }}>
          <h1>
            The <code>Div100vh</code> / <code>use100vh</code> demo
          </h1>
          <p>
            Use <code>&lt;Div100vh&gt;</code> React component or{' '}
            <code>&lt;use100vh&gt;</code> hook to avoid cropping at the bottom
            of a fullscreen page in mobile browsers. More on this issue{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html"
            >
              here
            </a>
            .
          </p>
          Here is an input field to check the case when keyboard shows up on a
          mobile device:{' '}
          <input
            // https://stackoverflow.com/q/2989263/5274538
            style={{ fontSize: '16px' }}
          />
        </div>
        <div
          style={{
            background: 'lightgreen',
            padding: '1rem',
            height: '4.5rem'
          }}
        >
          Chances are this part will be cropped by mobile browsers if you use a
          regular 100vh div wrapper.
        </div>
      </Div100vh>
      <div style={{ padding: '1rem' }}>
        Something else goes here after the full window height div.
      </div>
    </div>
  )
}
