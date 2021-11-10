'use strict';

const http = require('http');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer((req,res)=>{
    const {pathname} = new URL(`http://${host}:${port}${req.url}`);
    const route=decodeURIComponent(pathname);
    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8'
    });
    let message='';
    if(route.startsWith('/abc')){
        message='starts with abc';
    }
    else if(route==='/xyz'){
        message='xyz';
    }
    else if (route ==='/åäö'){
        message='åäö';
    }
    else {
        message='something else';
    }
    res.end(`<h1>${message}</h1>`);
});

server.listen(port,host, 
    ()=>console.log(`${host}:${port} serving`));
