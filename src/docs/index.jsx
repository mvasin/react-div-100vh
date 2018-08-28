import React from "react";
import { render } from "react-dom";
import Div100vh from "../lib";
import "./styles.css";

function Demo() {
  return (
    <div>
      <Div100vh style={{ background: 'pink', display: 'flex', flexDirection: 'column', height: '100rvh', minHeight: '100rvh' }}>
        <div style={{flex: 'auto', padding: '1rem'}}>
          <h1>The Div100vh component demo</h1>
          <p>Div100vh component tries to avoid cropping of the bottom of the fullscreen splash page by mobile browsers.</p>
          <p>More on this issue <a href="https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html">
            here</a>.</p>
        </div>
        <div style={{background: 'lightgreen', padding: '1rem'}}>Chances are this part will be cropped by mobile browsers if you use a regular 100vh div wrapper.</div>
      </Div100vh>
      <div style={{padding: '1rem'}}>Something else goes here after the full window height div.</div>
    </div>
  );
}

render(<Demo />, document.getElementById("app"));
