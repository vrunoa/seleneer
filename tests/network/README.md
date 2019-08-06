# seleneer (dont judge me, naming is hard)
Experiments combining Selenium & Puppeter

# Why?
The idea for this project is just a POC on how to extend Selenium capabilities for Chrome injecting extra functionalities with Puppeteer Core. 

# How?
When launching Chrome with Selenium we're going to add an argument to expose dev tools extended debugging for our selenium session. This is simply achieved by adding the `chromeOptions` capability:
```
chromeOptions: {
  args: ['--remote-debugging-port=9222']
}
```
With this port exposed, we're going to connect to the dev tools using puppeteer-core and prepare the Chrome session before start sending selenium commands
```
let browser = await puppeteer.connect({browserURL:"http://127.0.0.1:9222"});
...
```
Let's take look at W3School example on CSS animations. By default Chrome will have all animations enabled, but this can lead to flakiness on functional or visual tests. 

Using this approach on puppeter using the existing Chrome session started by Seleniumtest we can change the animation behaviour in Chrome by changing it's playbackRate. 

**Animation enabled**

<img src="https://github.com/vrunoa/seleneer/blob/animations-playground/docs/animation-enabled.gif?raw=true" />

Now we can disable animations completely by setting the playbackRate to Zero;
```
await client.send('Animation.setPlaybackRate', {
  playbackRate: 0
});
```

**Animations disabled**

<img src="https://github.com/vrunoa/seleneer/blob/animations-playground/docs/animation-disabled.gif?raw=true" />

# Development
```
npm install
npm run start-selenium
npm run test-animations-disabled
```

# Requirements
* Java 8+
* Node 8+

# Useful documentation
* [https://chromedevtools.github.io/devtools-protocol/tot/Animation](https://chromedevtools.github.io/devtools-protocol/tot/Animation)