# `Div100vh` React component
[![CircleCI](https://circleci.com/gh/mvasin/react-div-100vh.svg?style=svg&circle-token=cd3f9e7031e393880d945af301841db926000ec4)](https://circleci.com/gh/mvasin/react-div-100vh)
[![npm version](https://badge.fury.io/js/react-div-100vh.svg)](https://badge.fury.io/js/react-div-100vh)

This is a workaround for iOS Safari and other mobile browsers.

## The problem

At the top of the page, mobile browsers cover bottom of `100vh` page with "browser chrome" (that's the name for browser navigation/context buttons, don't confuse with the browser from Google), effectively cropping it. If you have something important at the bottom of your splash screen, chances are it will not be visible/available until user scrolls.

More on this issue [here](https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html
).

## The solution
### iOS screenshots
| `<div style={{height: '100vh'}}>` | `<Div100vh>` |
| --- | --- |
| ![Page cropped by bottom Safari chrome](https://raw.githubusercontent.com/mvasin/react-div-100vh/master/images/regular-div.png) | ![Page cropped by bottom Safari chrome](https://raw.githubusercontent.com/mvasin/react-div-100vh/master/images/react-div-100vh.png) |

### The demo
Browse https://react-div-100vh.netlify.com on your phone!

## API
- Install it: `npm install --save react-div-100vh` or `yarn add react-div-100vh`
- Import the component and wrap your stuff with `<Div100vh>` as you would with a normal `<div style={{height: '100vh'}}>`, but this time mobile browsers should display the whole page on load:

### The default behavior

```jsx
import Div100vh from 'react-div-100vh'

const MyFullscreenComponent = () => (
  <Div100vh>
    <marquee>Your stuff goes here</marquee>
  </Div100vh>
)
```

### Using `rvh` units

If you want to set `min-height` (or any other property) instead, you can use made up `rvh` ("real viewport height") units in values of an object passed to `style` prop. `Div100vh` will find any style declarations with this unit and calculate the value as a percentage of `window.innerHeight`:

```jsx
  <Div100vh style={{minHeight: '50rvh'}}>
    <marquee>This is inside a div that takes at least 50% of viewport height.</marquee>
  </Div100vh>
```

If you don't specify `style` prop, it works as if you specified `{height: '100rvh'}`;
`<Div100vh>` is equivalent to `<Div100vh style={{height: '100rvh'}}>`.

If you do pass anything to the `style` prop, no implicit style is applied. You can do something like:

```jsx
<Div100vh
  style={{maxHeight: '70rvh', color: 'blue'}}
  onClick={() => console.log('hi')}
>
  <p>my content here</p>
</Div100vh>
```

The rest of the props are passed unchanged to the underlying `div` that `Div100vh` renders.


### Rendering non-`<div>` elements

You can also pass an `as` prop to render other elements than `<div>`s - for example, `<main>`, `<section>`, `<footer>`, et cetera. 

```jsx
<Div100vh as="main">
  <p>Some main content</p>
</Div100vh>
```

> ❗ Keep in mind that this works best with [block-level elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements), as inline-level elements don't respond to the CSS `height` property. 

## Additional considerations

Please note that most likely you will want to set `body {margin: 0}` css, unless you use some css reset that does it for you.

## Testing
This component is tested with Jest and <a href="https://www.browserstack.com"><img title="BrowserStack Logo" alt="BrowserStack Logo" height="40" src="images/Browserstack-logo.svg"></a>