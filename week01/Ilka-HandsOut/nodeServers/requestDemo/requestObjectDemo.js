'use strict';

const http = require('http');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const server = http.createServer((req,res)=>{
    const {
        pathname, 
        search, 
        searchParams} = new URL(`http://${host}:${port}${req.url}`);
    const route=decodeURIComponent(pathname);
    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8'
    });
    res.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>Request info</title>
        </head>
        <body>
            <h1>Request info</h1>
            <h2>headers:</h2>
            <pre>${JSON.stringify(req.headers,null,4)}</pre>
            <h2>host: ${req.headers.host}</h2>
            <h2>agent: ${req.headers['user-agent']}</h2>
            <h2>method: ${req.method}</h2>
            <h2>url; ${req.url}</h2>
            <h2>pathname: ${pathname}</h2>
            <h2>decoded pathname: ${route}</h2>
            <h2>searchParams: ${searchParams}</h2>
            <h2>search: ${search}</h2>
        </body>
        </html>
    `);
    res.end(); 
});

server.listen(port,host, 
    ()=>console.log(`${host}:${port} serving`));
