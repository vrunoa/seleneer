const wd = require('wd');
const chai = require('chai');
const expect = chai.expect;
const puppeteer = require('puppeteer-core');
const DEFAULT_PLAYBACK_RATE = 2;
let PLAYBACK_RATE = DEFAULT_PLAYBACK_RATE;
if (process.env.PLAYBACK_RATE && !isNaN(process.env.PLAYBACK_RATE)) {
  PLAYBACK_RATE = parseInt(process.env.PLAYBACK_RATE)
}

let driver;
let caps = {
  browserName: 'chrome',
  platformName: 'Mac OS',
  platformVersion: '10.14.5',
  chromeOptions: {
    args: ['--remote-debugging-port=9222']
  }
}

describe('simple selenium chrome test', async function() {
  before(async () => {
    driver = await wd.promiseChainRemote('http://localhost:4444/wd/hub');
    res = await driver.init(caps)
    console.log(`Session ID ${res[0]}`);
  });
  after(async () => {
    await driver.quit()
  });
  it('should run a test in chrome', async function() {
    let browser = await puppeteer.connect({browserURL:"http://127.0.0.1:9222"});
    let pages = await browser.pages();
    for (let i=0;i<pages.length;i++) {
      let page = pages[0];
      const client = await page.target().createCDPSession();
      await client.send('Animation.enable');
      console.log(`Setting Animation playbackRate to :${PLAYBACK_RATE}`)
      await client.send('Animation.setPlaybackRate', {
        playbackRate: PLAYBACK_RATE
      });
    }
    await driver.get("https://www.w3schools.com/css/css3_animations.asp");
    let el = await driver.elementById('animated_div');
    expect(el).to.not.equal(null);
  });
});