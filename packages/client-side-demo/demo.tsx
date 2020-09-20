import React, { useState } from 'react'
import Div100vh from 'react-div-100vh'

const style = {
  background: 'lightblue',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
} as const

export function Demo(): JSX.Element {
  const [divType, setDivType] = useDivType()
  const DivComponent = divType === 'Div100vh' ? Div100vh : RegularDiv
  return (
    <div>
      <DivComponent style={style}>
      <div style={{ flex: 'auto', padding: '1rem', overflow: 'scroll' }}>
        <h1 style={{fontSize: '1rem'}}>
          The <code>Div100vh</code> / <code>use100vh</code> demo
        </h1>
        <p>Choose the wrapper for the area with the blue background:</p>
        <div onClick={() => {setDivType('Div100vh')} }>
          <input type="radio" name="divType" id="Div100vh" checked={divType === 'Div100vh'} />
          <label htmlFor="Div100vh">The <code>&lt;Div100vh&gt;</code> React component</label>
        </div>
        <div onClick={() => {setDivType('regularDiv')} }>
          <input type="radio" name="divType" id="regularDiv" checked={divType === 'regularDiv'} />
          <label htmlFor="regularDiv">a regular <code>&lt;div style=&#123;&#123;height: &quot;100vh&quot;&#125;&#125;&gt;</code></label>
        </div>
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
      </DivComponent>
      <Footer />
    </div>
  )
}

function useDivType() {
  const divTypeLocalStorage = window.localStorage.getItem('divType') as 'regularDiv' | 'Div100vh'
  const [divType, setDivType] = useState<'regularDiv' | 'Div100vh'>(divTypeLocalStorage ?? 'Div100vh')
  if (divTypeLocalStorage !== divType) window.localStorage.setItem('divType', divType)
  return [divType, setDivType] as const
}

function RegularDiv({children}: React.PropsWithChildren<unknown>) {
  return <div style={{...style, height: '100vh'}}>
    {children}
  </div>
}

const Footer = () => (
  <div style={{ padding: '1rem' }}>
    Something else goes here after the full window height div.
  </div>
)
