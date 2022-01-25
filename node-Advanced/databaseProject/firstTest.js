"use strict";

const MariaDb = require("./database");
const options = {
  host: "localhost",
  port: 3306,
  user: "zeke",
  password: "secret",
  database: "employeedb",
  allowPublicKeyRetrieval: true, //mysql users add this
};

const db = new MariaDb(options);

// db.doQuery("select * from employee").then(console.log).catch(console.log);

async function getAll() {
  try {
    const result = await db.doQuery("select * from employee");
    if (result.resultSet) {
      console.log(result.queryResult);
    }
  } catch (err) {
    console.log(err);
  }
}

getAll();
