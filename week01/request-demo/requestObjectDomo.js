/* update with Ilka handsout !!!!! */

"use strict";

const http = require("http");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const server = http.createServer((req, res) => {
  const { pathname, search, searchParams } = new URL(
    `http://${host}:${port}${req.url}`
  );

  const route = decodeURIComponent(pathname);
  console.log(route);
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8",
  });
  res.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset:"utf-8">
        <title>Request info</title>
    </head>
    <body>
        <h1>Request info</h1>
        <pre>headers:</h2>
        <h2>${req.pathname}</h2>
    </body>
    </html>  
`);
  res.end();
});

server.listen(port, host, () =>
  console.log(`server ${host}:${port} is serving`)
);
