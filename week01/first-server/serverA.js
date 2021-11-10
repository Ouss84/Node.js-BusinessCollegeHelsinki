"use strict";

const http = require("http");

const port = 3000;
const host = "localhost";

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    // "Content-Type": "text/plain ; charset=utf-8",
    "Content-Type": "text/html ; charset=utf-8",
  });
  //   res.write("<h1>Hello world!</h1>");
  res.end("<h1>Hello world!</h1>");
});

server.listen(port, host, () => {
  console.log(`Server ${host}:${port} is listening`);
});
