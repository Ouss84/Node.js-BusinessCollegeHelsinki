'use strict';

const http=require('http');

const {port,host} = require('./config.json');
const {search} = require('./personDatalayer');

const server = http.createServer((req,res)=>{
    const {
        pathname,
        searchParams
    }=new URL(`http://${host}:${port}${req.url}`);

    const route=decodeURIComponent(pathname);

    let result=[];
    if(route==='/persons'){
        result=search();
    }
    else if(searchParams.has('value')){
        const value=searchParams.get('value');
        if(route==='/persons/firstname'){
            result=search('firstname',value);
        }
        else if(route==='/persons/lastname'){
            result=search('lastname', value);
        }
        else if(route==='/persons/age'){
            result=search('age',value);
        }
        else{
            result={message:'resource not found'}
        }
    }
    else{
        result={message:"Given key doesn't exist"};
    }
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
    });
    res.end(createHtml(result));
});

server.listen(port, host, ()=>console.log(`Listening ${host}:${port}`));


function createHtml(resultArray) {
    let htmlString = createPageHead('Persons') + '<h1>Search result</h1>';
    if (resultArray.message) {
        htmlString += addMessage(resultArray.message);
    }
    else if (resultArray.length === 0) {
        htmlString += addMessage('No persons found');
    }
    else {
        htmlString += createTable(resultArray);
    }
    return htmlString + `
            </body>
        </html>`;
}

function addMessage(message) {
    return `<h2>${message}</h2>`;
}

function createTable(resultArray) {
    let htmlString = `<table>
            <thead>
                <tr><th>Firstname</th><th>Lastname</th><th>Age</th></tr>
            </thead>
            <tbody>`;
    for (let person of resultArray) {
        htmlString += `<tr>
                    <td>${person.firstname}</td><td>${person.lastname}</td>
                    <td>${person.age}</td>
                    </tr>`;
    }
    return htmlString + `</tbody>
            </table>`;
}

function createPageHead(title) {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>${title}</title>
        </head>
        <body>`;
}
