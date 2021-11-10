```js
// const {URL} = require('url'); //not needed. URL is now global object

//const url = require('url);
// new url.URL(...)
```


```js
const {pathname} = new URL(`http://${host}:${port}${req.url}`);
// const pathname = (new URL(`http://${host}:${port}${req.url}`)).pathname;
// const urlObj = new URL(`http://${host}:${port}${req.url}`);
// console.log(urlObj.pathname)
// console.log(pathname);
```

```js
const route=decodeURIComponent(pathname);


 // else if (route === '/%C3%A5%C3%A4%C3%B6') { Not decoded
    else if (route ==='/åäö'){
```
