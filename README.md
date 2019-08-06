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

Examples:
 * Enabling/Disabling Animations
 * Generate HAR file to view network request during a test

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
