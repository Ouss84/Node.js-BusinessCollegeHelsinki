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
        'Content-Type':'text/html;charset=utf-8'
    }); 
    res.end(createHtml(result));
});

server.listen(port, host, ()=>console.log(`Listening ${host}:${port}`));


function createHtml(resultArray){
    let htmlString = createPageHead('Cars')+'<h1>Search result</h1>';
    if(resultArray.message){
        htmlString+=addMessage(resultArray.message);
    }
    else if(resultArray.length===0){
        htmlString+=addMessage('No cars found');
    }
    else{
        htmlString+=createTable(resultArray);
    }
    return htmlString+`
            </body>
        </html>`;
}

function addMessage(message){
    return `<h2>${message}</h2>`;
}

function createTable(resultArray){
    let htmlString=`<table>
            <thead>
                <tr><th>Model</th><th>Licence</th></tr>
            </thead>
            <tbody>`;
    for (let car of resultArray) {
        htmlString += `<tr>
                    <td>${car.model}</td><td>${car.licence}</td>
                    </tr>`;
    }
    return htmlString + `</tbody>
            </table>`;
}

function createPageHead(title){
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
        </head>
        <body>`;
}