"use strict";
const http = require("http");
const path = require("path");

const { sendFile } = require("./handler");

const { port, host } = require("./config.json");
const formPath = path.join(__dirname, "jsonForm.html");

const server = http.createServer(async (req, res) => {
  const method = req.method.toLocaleUpperCase();
  if (method === "GET") {
    sendFile(res, formPath);
  } else if (method === "POST") {
    const formData = await handlePostData(req);
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify(formData));
  }
});

server.listen(port, host, () => console.log(`Serving ${host}:${port}`));
function handlePostData(req) {
  return new Promise((resolve, reject) => {
    if (req.headers["content-type"] !== "application/json") {
      reject("Wrong Content-Type");
    } else {
      const databuffer = [];
      req.on("data", (messageFragment) => databuffer.push(messageFragment));
      req.on("end", () => {
        const data = Buffer.concat(databuffer).toString();

        return resolve(JSON.parse(data));
      });
      req.on("error", () => reject("Error during the data transmission "));
    }
  });
}
