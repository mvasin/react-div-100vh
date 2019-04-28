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
