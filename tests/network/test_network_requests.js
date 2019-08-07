const wd = require('wd');
const chai = require('chai');
const expect = chai.expect;
const puppeteer = require('puppeteer-core');
const { harFromMessages } = require('chrome-har');
const fs = require('fs');

let driver;
let caps = {
  browserName: 'chrome',
  platformName: 'Mac OS',
  platformVersion: '10.14.5',
  chromeOptions: {
    args: ['--remote-debugging-port=9222']
  }
};

const observe = [
  'Page.loadEventFired',
  'Page.domContentEventFired',
  'Page.frameStartedLoading',
  'Page.frameAttached',
  'Network.requestWillBeSent',
  'Network.requestServedFromCache',
  'Network.dataReceived',
  'Network.responseReceived',
  'Network.resourceChangedPriority',
  'Network.loadingFinished',
  'Network.loadingFailed',
];

const events = [];

describe('simple selenium chrome test', async () => {
  before(async () => {
    driver = await wd.promiseChainRemote('http://localhost:4444/wd/hub');
    let res = await driver.init(caps);
    console.log(`Session ID ${res[0]}`);
  });
  after(async () => {
    await driver.quit();
  });
  it('should run a test in chrome', async () => {
    let browser = await puppeteer.connect({browserURL:'http://127.0.0.1:9222'});
    let pages = await browser.pages();
    for (let i=0;i<pages.length;i++) {
      let page = pages[i];
      const client = await page.target().createCDPSession();
      await client.send('Page.enable');
      await client.send('Network.enable');
      observe.forEach(method => {
        client.on(method, params => {
          events.push({ method, params });
        });
      });
    }
    await driver.get('https://google.com');
    let el = await driver.elementById('hplogo');
    expect(el).to.not.be.null;
    await browser.disconnect();
    const har = harFromMessages(events);
    fs.writeFileSync('/tmp/network.har', JSON.stringify(har));
  });
});