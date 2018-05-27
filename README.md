# `Div100vh` React component
This is a workaround for iOS Safari and other mobile browsers.

At the top of the page, those browsers cover bottom of `100vh` page with "browser chrome" (navigation/context buttons), effectively cropping it. If you have something important at the bottom of your splash screen, chances are it will not be visible/available untill a user scrolls.

More on this issue [here](https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html
).

## API
- Install it: `npm install --save react-div-100vh` or `yarn add react-div-100vh`
- Import it: `import Div100vh from 'react-div-100vh`
- Then wrap your stuff with `<Div100vh>` as you would with a normal `<div style={{height: '100vh'}}>`, but this time mobile browsers should display the whole page on load:
```
<div>
  <Div100vh>
    <div>
      This is a 100vh div that avoids iOS and other mobile browser 100vh crop issue.
    </div>
  </Div100vh>
  <div>This goes after full window height div</div>
</div>
```
No need to specify any `height` css on `Div100vh`, it will be overriden in javascript anyway.

Please note that you most likely will want to set `body {margin: 0}` css, unless you use some css reset that does it for you.

## Demo
https://mvasin.github.io/react-div-100vh/