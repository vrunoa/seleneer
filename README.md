# seleneer (dont judge me, naming is hard)
Playing around combining Selenium & Puppeteer

# Why?
The idea for this project is just a POC on how to extend Selenium capabilities for Chrome injecting extra functionalities with Puppeteer Core. 

# How?
When launching Chrome with Selenium we're going to add an argument to expose devtools extended debugging for our selenium session. This is simply achieve by adding the `chromeOptions` capability:
```
chromeOptions: {
  args: ['--remote-debugging-port=9222']
}
```
With this port exposed we're going to connect to the devtools using puppeteer-core and prepare the Chrome session before start sending selenium commands
```
let browser = await puppeteer.connect({browserURL:"http://127.0.0.1:9222"});
...
```
For ex: In `test_animations.js` test we're changing the animation behaviour in Chrome by changing it's playbackRate. This way we can disable animations completely by setting the playbackrate to Zero;
```
await client.send('Animation.setPlaybackRate', {
  playbackRate: 0
});
```

# Development
```
npm install
npm run start-selenium
npm run test-animations-disabled
```

# Requirements
* Java 8+
* Node 8+
