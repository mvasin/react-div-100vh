import React, { FC } from 'react'
import {version} from '../package.json'

import { use100vh } from '../lib'

const Div100vh: FC = ({ children }) => {
  const realHeight = use100vh()
  return (
    <div
      style={{
        height: realHeight ? `${realHeight}px` : '100vh',
        background: 'lightblue',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {children}
    </div>
  )
}

export function Demo() {
  return (
    <div>
      <Div100vh>
        <div style={{ flex: 'auto', padding: '1rem' }}>
          <h1>
            The <code>Div100vh</code> / <code>use100vh</code> hook demo
          </h1>
          <p>Version {version}</p>
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
          Here's an input field to check the case when keyboard shows up on a
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
