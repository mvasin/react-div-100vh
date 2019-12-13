## 0.3.8 (Dec 13, 2019)
* Revert 0.3.6 and 0.3.7 (@mvasin in [29](https://github.com/mvasin/react-div-100vh/pull/29))

## 0.3.7 (Dec 13, 2019)
* Fix 'error "document" is not available during server side rendering.' (@kyleboss-tinder in [28](https://github.com/mvasin/react-div-100vh/pull/28))

## 0.3.6 (Dec 10, 2019)
* Apply the styles on the first render (@meyerds in [26](https://github.com/mvasin/react-div-100vh/pull/26))

## 0.3.5 (Dec 8, 2019)
* Use document.documentElement.clientHeight instead of window.innerHeight (@roman-kaspar in [22](https://github.com/mvasin/react-div-100vh/pull/22))

## 0.3.4 (Aug 15, 2019)
* Add support for nondiv elements (@charlescrtr in [20](https://github.com/mvasin/react-div-100vh/pull/20))

## 0.3.3 (Apr 28, 2019)
* Avoid to use jest-get-type in production (@valse in [7](https://github.com/mvasin/react-div-100vh/pull/7))

## 0.3 (Oct 17, 2018)
* Get rid of unnecessary handling DOM node via `ref`, because props would do just fine
* Move demo from GitHub Pages to Netlify
* Improve support for `rvh` units: allow multiple `rvh` entries in a propersty value, allow `rvh` mixed with other values (i.e. `margin: 1px 1rvh`)

## 0.2 (Aug 28, 2018)
* `rvh`, "real viewport height" unit is introduced. `1rvh` equals to 1/100 of actually visible space (with mobile browser bottom chrome excluded). if implied `height: 100rvh` is not what you want, pass the component a `style` prop and use `rvh` units there anyway you'd like, i.e. `<Div100vh style={{ minHeight: '100rvh' }} />`. If you pass any CSS properties in `rvh` units to `style` prop, default `height: 100rvh` does not apply. (@drd, @joshuarrr and @mvasin in [#2](https://github.com/mvasin/react-div-100vh/pull/2))

## 0.1.8 (May 28, 2018)
* Initial release
