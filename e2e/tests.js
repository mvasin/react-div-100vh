const server = require('./server');
const {By} = require('selenium-webdriver');

exports.h1IsPresent = async function h1IsPresent(driver) {
  const url = await server.getURL();
  await driver.get(url);
  await driver.findElement(By.css('h1'));
};