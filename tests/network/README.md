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
Once we're connected to the dev tools, we can now listen to specific events:

```
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
...
const client = await page.target().createCDPSession();
await client.send('Page.enable');
await client.send('Network.enable');
observe.forEach(method => {
  client.on(method, params => {
    events.push({ method, params });
  });
});
```

Once the test is done we'd have collect info on each event happening during our test that we can now export as .har file to view in Chrome. 

<img src="https://github.com/vrunoa/seleneer/blob/network-playground/docs/network-request.png?raw=true">