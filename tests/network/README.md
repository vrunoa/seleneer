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



