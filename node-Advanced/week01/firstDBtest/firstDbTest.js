"use strict";

const mariadb = require("mariadb");

async function testA() {
  const connection = await mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "zeke",
    password: "secret",
    database: "employeedb",
    allowPublicKeyRetrieval: true,
  });
  console.log("######## Test 1 ########");
  let result = await connection.query("select * from employee");
  console.log(result);

  delete result.meta;
  console.log(result);
  for (let person of result) {
    console.log(`${person.firstname}:${person.salary}€`);
  }
  console.log("############ Test 2 ###########");
  result = await connection.query(
    "select firstname,lastname from employee where employeeId=?",
    [1]
  );

  delete result.meta;
  console.log(result);
  connection.end();
}

testA();
