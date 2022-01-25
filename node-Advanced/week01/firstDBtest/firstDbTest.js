"use strict";

const mariadb = require("mariadb");

async function testA() {
  const connection = await mariadb.createConnection({
    host: "localhost",
    port: 3306,
    user: "zeke",
    password: "secret",
    database: "employeedb",
    allowPublicKeyRetrieval: true, //mysql users add this
  });
  console.log("####### Test 1 ########");
  let result = await connection.query("select * from employee");
  console.log(result);
  console.log("******** meta deleted *********");
  delete result.meta;
  console.log(result);

  for (let person of result) {
    console.log(`${person.firstname}: ${person.salary} €`);
  }

  console.log("######### test 2 ########");
  result = await connection.query(
    "select firstname,lastname from employee where employeeId=?",
    [1]
    // "select firstname,lastname from employee where employeeId in(?,?)",
    // [1,2]
  );
  delete result.meta;
  console.log(result);

  console.log("############ test 3 insert ###########");
  result = await connection.query("insert into employee values(?,?,?,?,?)", [
    5,
    "Bill",
    "Bond",
    "secret",
    9999,
  ]);
  console.log(result);

  // console.log("####### test 4 delete #######");
  // result = await connection.query("delete from employee where employeeID=?", [
  //   5,
  // ]);
  // console.log(result);

  console.log("####### test 4 update #######");
  result = await connection.query(
    "update employee set department=?, salary=? where employeeId=?",
    ["admin", 7000, 2]
  );
  // to db engine:update employee set department='admin', salary=7000 where employeeId=2
  console.log(result);

  connection.end();
}

testA();
