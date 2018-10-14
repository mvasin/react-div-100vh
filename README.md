# `Div100vh` React component
[![CircleCI](https://circleci.com/gh/mvasin/react-div-100vh.svg?style=svg&circle-token=cd3f9e7031e393880d945af301841db926000ec4)](https://circleci.com/gh/mvasin/react-div-100vh)

This is a workaround for iOS Safari and other mobile browsers.

At the top of the page, those browsers cover bottom of `100vh` page with "browser chrome" (navigation/context buttons), effectively cropping it. If you have something important at the bottom of your splash screen, chances are it will not be visible/available until a user scrolls.

More on this issue [here](https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html
).

## API
- Install it: `npm install --save react-div-100vh` or `yarn add react-div-100vh`
- Then import the component and wrap your stuff with `<Div100vh>` as you would with a normal `<div style={{height: '100vh'}}>`, but this time mobile browsers should display the whole page on load:

### The default Behavior

```jsx
import Div100vh from 'react-div-100vh'

const MyFullscreenComponent = () => (
  <Div100vh>
    <marquee>Your stuff goes here</marquee>
  </Div100vh>
)
```
No need to specify any height css on `Div100vh`, it will be overriden in javascript anyway.

### Using `rvh` units

If you want to set the min-height (or any other property) instead, you can use special `rvh` ("real viewport height") units in values of a regular `style` object passed to `style` prop. `Div100vh` will find any style declarations with this unit and calculate the value as a percentage of `window.innerHeight`:

```jsx
  <Div100vh style={{minHeight: '50rvh'}}>
    <marquee>This is inside a div is at least 50% of viewport height.</marquee>
  </Div100vh>
```

Of you don't pass an object to the `style` prop, it works as if you specified `{height: '100rvh'}`:
```
<Div100vh style={{height: '100rvh'}}>
```

If you do pass anything to the `style` prop, no implicit style is applied, so you're on your own. You can do something like:
```
<Div100vh
  style={{maxHeight: '70rvh', color: 'blue'}}
  onClick={() => console.log('hi')}
>
  <p>my content here</p>
</Div100vh>
```

The rest of the props are passed through to the underlying `div` unchanged.

## Additional considerations

Please note that you most likely will want to set `body {margin: 0}` css, unless you use some css reset that does it for you.

## Demo
https://mvasin.github.io/react-div-100vh/