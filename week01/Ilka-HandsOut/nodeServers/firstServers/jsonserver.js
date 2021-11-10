'use strict';

const http = require('http');

const person={
    firstname:'Matt',
    lastname:'River'
};

const port=3000;
const host='localhost';

const server = http.createServer((request,response)=>{
    const statuscode=200;
    response.writeHead(statuscode, {
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin':'*'
    });
    response.write(JSON.stringify(person));
    response.end();
    // response.end(JSON.stringify(person));
});

server.listen(port,host, 
    ()=>console.log(`Server ${host}:${port} is listening`));

