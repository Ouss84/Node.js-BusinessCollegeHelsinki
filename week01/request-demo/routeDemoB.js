"use strict";

const http = require("http");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

const server = http.createServer((req, res) => {
  const { pathname, search, searchParams } = new URL(
    `http://${host}:${port}${req.url}`
  );
  console.log(pathname);
  const route = decodeURIComponent(pathname);
  console.log(route);
  res.writeHead(200, {
    "Content-Type": "text/html;charset=utf-8",
  });
  let message = "";
  if (route.startsWith("/abc")) {
    message = "abc";
  } else if (route === "/xyz") {
    message = "xyz";
  } else {
    message = "something else";
  }
  res.end(`<h1>${message}</h1>`);
});

server.listen(port, host, () =>
  console.log(`server ${host}:${port} is serving`)
);
