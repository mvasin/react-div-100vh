const {BROWSERSTACK_USERNAME, BROWSERSTACK_KEY} = process.env;
if (!BROWSERSTACK_USERNAME || !BROWSERSTACK_KEY)
  throw Error('Specify BROWSERSTACK_USERNAME and BROWSERSTACK_KEY env vars!');

const commonForBrowsers = {
  os: 'Windows',
  os_version: '10',
  resolution: '1024x768',
  'browserstack.user': BROWSERSTACK_USERNAME,
  'browserstack.key': BROWSERSTACK_KEY
}

exports.chrome70 = {
  browserName: 'Chrome',
  browser_version: '70.0',
  ...commonForBrowsers
}

exports.chrome37 = {
  browserName: 'Chrome',
  browser_version: '37.0',
  ...commonForBrowsers
}

// FIXME: for some reason, IE always fails
// exports.ie = {
//   browserName: 'IE',
//   browser_version: '11.0',
//   ...commonForBrowsers
// }