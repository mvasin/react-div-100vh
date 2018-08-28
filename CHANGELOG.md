## 0.2 (Aug 28, 2018)
* `rvh`, "real viewport height" unit is introduced. `1rvh` equals to 1/100 of actually visible space (with mobile browser bottom chrome excluded). if implied `height: 100rvh` is not what you want, pass the component a `style` prop and use `rvh` units there anyway you'd like, i.e. `<Div100vh style={{ minHeight: '100rvh' }} />`. If you pass any CSS properties in `rvh` units to `style` prop, default `height: 100rvh` does not apply. (@drd, @joshuarrr and @mvasin in [#2](https://github.com/mvasin/react-div-100vh/pull/2))

## 0.1.8 (May 28, 2018)
* Initial release