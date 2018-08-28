# `Div100vh` React component
This is a workaround for iOS Safari and other mobile browsers.

At the top of the page, those browsers cover bottom of `100vh` page with "browser chrome" (navigation/context buttons), effectively cropping it. If you have something important at the bottom of your splash screen, chances are it will not be visible/available untill a user scrolls.

More on this issue [here](https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html
).

## API
- Install it: `npm install --save react-div-100vh` or `yarn add react-div-100vh`
- Then import the component and wrap your stuff with `<Div100vh>` as you would with a normal `<div style={{height: '100vh'}}>`, but this time mobile browsers should display the whole page on load:

### Default Behavior

```jsx
import Div100vh from 'react-div-100vh'

const MyFullscreenComponent = () => (
  <Div100vh>
    <marquee>Your stuff goes here</marquee>
  </Div100vh>
)
```
No need to specify any height css on `Div100vh`, it will be overriden in javascript anyway.

### Custom Styles

If you want to set the min-height (or any other property) instead, you can use special rvh (real viewport height) units passed through the style prop. `Div100vh` will find any style declarations with this unit and calculate the value as a percentage of `window.innerHeight`:

```jsx
  <Div100vh style={{minHeight: '50rvh'}}>
    <marquee>This is inside a div is at least 50% of viewport height.</marquee>
  </Div100vh>
```

Please note that you most likely will want to set `body {margin: 0}` css, unless you use some css reset that does it for you.

## Demo
https://mvasin.github.io/react-div-100vh/