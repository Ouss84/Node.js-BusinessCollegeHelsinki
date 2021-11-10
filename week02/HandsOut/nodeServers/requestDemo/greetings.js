'use strict';

const http=require('http');

const {port,host}=require('./config.json');

const server = http.createServer((req,res)=>{
    const {searchParams}=new URL(`http://${host}:${port}${req.url}`);

    res.writeHead(200, {
        'Content-Type':'text/html;charset=utf-8'
    });
    if(searchParams.has('name')){
        const name=searchParams.get('name');
        res.end(`<h1>Hi ${name}!</h1>`);
    }
    else{
        res.end('<h1>Hi anonymous</h1>');
    }
});

server.listen(port,host, ()=>console.log(`${host}:${port} serving`));

//usage:

// http://localhost:3000/?name=Matt

// http://localhost:3000/?age=20&name=Vera