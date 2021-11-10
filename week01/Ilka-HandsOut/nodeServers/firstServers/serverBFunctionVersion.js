'use strict';

const http = require('http');

const {port,host} = require('./config.json');

const person = require('./person.json');

const server = http.createServer( (req, res)=>{
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8'
    });
    res.end(createHtml(person));
});

server.listen(port,host,
    ()=>console.log(`Server ${host}:${port} is listening`));


function createHtml(data){
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Person</title>
            <style>h1{color:green;}</style>
        </head>
        <body>
            <h1>Person data</h1>
            <h2>${data.firstname} ${data.lastname}</h2>
        </body>
    </html>`;
}