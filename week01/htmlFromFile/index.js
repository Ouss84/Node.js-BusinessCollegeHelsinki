"use strict";

const http = require("http");
const path = require("path");
const fs = require("fs").promises;

const { port, host } = require("./config.json");

const homePath = path.join(__dirname, "home.html");

// console.log(__dirname);
// console.log(homePath);
const server = http.createServer(async (req, res) => {
  try {
    const data = await fs.readFile(homePath, "utf-8");
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(data, "utf-8"),
    });
    res.end(data);
  } catch (error) {
    res.statusCode = 404;
    res.end(`Error:${error.message}`);
  }
});

server.listen(port, host, () => console.log(`${host}:${port} running`));
