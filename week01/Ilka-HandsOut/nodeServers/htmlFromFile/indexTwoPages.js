'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs').promises;

const {port, host} = require('./config.json');

const homePath= path.join(__dirname,'home.html');
const pagebPath = path.join(__dirname, 'pageb.html');

const server = http.createServer((req,res)=>{
    const {pathname} = new URL(`http://${host}:${port}${req.url}`);
    const route=decodeURIComponent(pathname);
    if(route==='/'){
        sendFile(res, homePath);
    }
    else if(route==='/pageb'){
        sendFile(res,pagebPath);
    }
    else if(route.startsWith('/styles/')){
        sendFile(res, path.join(__dirname,route),'text/css');
    }
    
});
server.listen(port,host,()=>console.log(`${host}:${port} running`));

async function sendFile(res, filePath, contentType='text/html'){
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': Buffer.byteLength(data, 'utf8')
        });
        res.end(data);
    }
    catch (err) {
        res.statusCode = 404;
        res.end(`Error: ${err.message}`);
    }
}