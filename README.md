# `use100vh` React component

[![npm version](https://badge.fury.io/js/react-div-100vh.svg)](https://badge.fury.io/js/react-div-100vh)

This is a workaround for iOS Safari and other mobile browsers.

## The problem

At the top of the page, mobile browsers cover bottom of `100vh` page with "browser chrome" (that's the name for browser navigation/context buttons, don't confuse with the browser from Google), effectively cropping it. If you have something important at the bottom of your splash screen, chances are it will not be visible/available until user scrolls.

More on this issue [here](https://nicolas-hoizey.com/2015/02/viewport-height-is-taller-than-the-visible-part-of-the-document-in-some-mobile-browsers.html).

## The solution

Import `use100vh` hook, which will provide you the accurate vertical height in pixels. The return type is a `number`, so you may need to concatenate with `px`:

```jsx
import { use100vh } from 'react-div-100vh'

const Div100vh = ({ children }) => {
  const height = use100vh()
  return <div style={{ height: height + 'px' }}>{children}</div>
}
```

`Div100vh` is also exported, it's the default export:

```jsx
import Div100vh from 'react-div-100vh'

const MyFullHeightComponent = () => (
  <Div100vh>
    <marquee>Look ma, no crop!</marquee>
  </Div100vh>
)
```

Use `Div100vh` only for simple cases, for anything more involved turn to the `use100vh` hook.

Under the hood `use100vh` uses `getRealHeight` function, it's exported as well, so feel free to use it, even without React.

| `<div style={{height: '100vh'}}>`                                                                                               | `<Div100vh>`                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| ![Page cropped by bottom Safari chrome](https://raw.githubusercontent.com/mvasin/react-div-100vh/master/images/regular-div.png) | ![Page cropped by bottom Safari chrome](https://raw.githubusercontent.com/mvasin/react-div-100vh/master/images/react-div-100vh.png) |

## Server-side rendering

In Node environment (or, to be more specific, in an environment without `window` global object), window height doesn't make sense and can't be measured, hence `Div100vh` height falls back to `100vh`. If you have different logic in mind - use `use100vh` hook, it returns `undefined` if executed not in a browser.

## Testing

This component is tested with <a href="https://www.browserstack.com"><img title="BrowserStack" alt="BrowserStack Logo" height="40" src="https://raw.githubusercontent.com/mvasin/react-div-100vh/master/images/browser-stack.svg"></a>.
