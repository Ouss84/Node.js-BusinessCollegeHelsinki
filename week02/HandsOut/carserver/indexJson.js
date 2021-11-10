'use strict';

const http = require('http');

const {port,host} = require('./config.json');

const { 
    getAllCars, 
    getWithLicence, 
    getWithModel } = require('./carstorage');

const server = http.createServer((req,res)=>{
    const {
        pathname, 
        searchParams}= new URL(`http://${host}:${port}${req.url}`);
    
    const route = decodeURIComponent(pathname);
    let result = [];

    if(route==='/cars'){
        result=getAllCars();
    }
    else if(route==='/search/bylicence' && searchParams.has('licence')){
        result=getWithLicence(searchParams.get('licence'));
    }
    else if(route==='/search/bymodel' && searchParams.has('model')){
        result=getWithModel(searchParams.get('model'));
    }
    else{
        result={message:'key not found'}
    }

    res.writeHead(200,{
        'Content-Type':'application/json'
    });
    res.end(JSON.stringify(result,null,4));
});

server.listen(port, host, ()=>console.log(`Listening ${host}:${port}`));