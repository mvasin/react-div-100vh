// if you run it locally, have these env vars in scope or start with:
// BROWSERSTACK_USERNAME=foo BROWSERSTACK_KEY=bar node e2e/smoke-test.js

const {Builder} = require('selenium-webdriver');
const server = require('./server');
const tests = Object.values(require('./tests'));
const browsers = Object.values(require('./browsers'));

const buildDriver = browser => new Builder()
  .usingServer('http://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities(browser)
  .build()

// `runs` is a matrix of browsers and tests, flattened
const runs = tests.map(test => browsers.map(browser => {
  const driver = buildDriver(browser);
  return {
    name: test.name, // test function name
    browser,
    result: test(driver) // promise. async execution of tests is triggered here
  }
})).reduce((acc, val) => acc.concat(val), []) // flatten

async function report(runs) {
  // my version of https://stackoverflow.com/a/36115549/5274538
  // The idea is to make Promise.all not to stop on the first rejected promise.
  //
  // By the time Promise.all goes on to .then, failedRuns array contains all
  // the failed runs, and successfulRuns contains all successful runs.
  const failedRuns = [];
  const successfulRuns = [];
  const catchedRuns = runs.map(run => run.result
    .then(() => successfulRuns.push(run))
    .catch(e => {
      console.log(e);
      failedRuns.push(run)
    })
  );
  return Promise.all(catchedRuns).then(() => {
    server.close();

    const preface =
      `\nExecuted ${tests.length} test(s) in ${browsers.length} browser(s) (${runs.length} overall),`;
    if (failedRuns.length === 0) {
      console.log(`${preface} all runs succeeded.`);
      return 0; // exit code
    };
    // if some tests failed
    console.log(`${preface} ${failedRuns.length} run(s) failed.\n`)
    console.log('Here are the problematic combinations:')
    failedRuns.forEach(r => {
      const browser = `${r.browser.browserName} v.${r.browser.browser_version}`;
      console.log(`'${r.name}' test on '${browser} (${r.browser.os})' failed`);
    });
    return 1; // exit code
  })
}

// returns exit code 1 if any tests failed, required for CI
report(runs).then(exitCode => process.exit(exitCode));

// TODO: update status on BrowserStack (it's always green unless
// you make some REST calls)