"use strict";

const http = require("http");
const path = require("path");

const port = 3000;
const host = "localhost";

const { read, send, sendJson, isIn } = require(path.join(
  __dirname
), "library", "handler.js");

const { getAllFlavors, hasFlavor, getIceCream } = require(path.join(
  __dirname
), "iceCreamStorage", "iceCreamFreezer.js");

const resourceRoutes = ["/favicon", "/styles", "/js/", "/images/"];

const homePath = path.join(__dirname, "home.html");

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(`http:// ${host}:${port}${req.url}`);
  const route = decodeURIComponent(pathname);
  try {
    if (route === "/") {
      send(res, await read(homePath));
    } else if (isIn(route, ...resourceRoutes)) {
      const result = await read(path.join(__dirname, route));
      send(res, result);
    } else {
      sendJson(res, { message: "Not Found" }, 404);
    }
  } catch (err) {
    sendJson(res, { message: "err.message" }, 404);
  }
});
