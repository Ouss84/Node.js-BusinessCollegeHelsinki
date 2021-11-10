'use strict';

const http=require('http');
const fs = require('fs').promises;
const path = require('path');

const {port,host} = require('./config.json');
const {search} = require('./personDatalayer');

const homePath=path.join(__dirname,'home.html');
console.log(homePath);

const server = http.createServer((req,res)=>{
    const {
        pathname,
        searchParams
    }=new URL(`http://${host}:${port}${req.url}`);

    const route=decodeURIComponent(pathname);,
    console.log(route);

    if(route==='/'){
        sendFile(res,homePath);
    }
    else if(route.startsWith('/styles/')){
        sendFile(res,path.join(__dirname,route),'text/css');
    }
    else{
        let result = [];
        if (route === '/persons') {
            result = search();
        }
        else if (searchParams.has('value')) {
            const value = searchParams.get('value');
            if (route === '/persons/firstname') {
                result = search('firstname', value);
            }
            else if (route === '/persons/lastname') {
                result = search('lastname', value);
            }
            else if (route === '/persons/age') {
                result = search('age', value);
            }
            else {
                result = { message: 'resource not found' }
            }
        }
        else {
            result = { message: "Given key doesn't exist" };
        }
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(result));
    }   
}); //end of server

server.listen(port, host, ()=>console.log(`Listening ${host}:${port}`));

async function sendFile(res, filePath, contentType='text/html'){
    try{
        const data = await fs.readFile(filePath,'utf8');
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length':Buffer.byteLength(data,'utf8')
        });
        res.end(data, 'utf8');
    }
    catch(err){
        res.statusCode=404;
        res.end(`Error: ${err.message}`);
    }
}
