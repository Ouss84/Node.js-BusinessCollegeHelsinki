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
function printWorkers(employees) {
  for (let person of employees) {
    console.log(
      `${person.employeeId}:${person.firstname} ${person.lastname}` +
        ` Dept: ${person.department}, ${person.salary} €`
    );
  }
}

async function getAll() {
  try {
    const result = await db.doQuery("select * from employee");
    if (result.resultSet) {
      printWorkers(result.queryResult);
    }
  } catch (err) {
    console.log(err);
  }
}

async function get(id) {
  try {
    const result = await db.doQuery(
      "select * from employee where employeeId=?",
      [id]
    );
    printWorkers(result.queryResult);
  } catch (err) {
    console.log(err);
  }
}

async function add(person) {
  try {
    const parameters = [
      person.employeeId,
      person.firstname,
      person.lastname,
      person.department,
      person.salary,
    ];

    // const parameters = Object.values(person);
    const sql = "insert into employee values(?,?,?,?,?)";
    const status = await db.doQuery(sql, parameters);
    console.log("status", status);
  } catch (err) {
    console.log(err);
  }
}
async function add2(person) {
  try {
    const parameters = [
      person.lastname,
      person.firstname,
      person.department,
      person.salary,
      person.employeeId,
    ];

    const sql =
      "insert into employee (lastname,firstname,department,salary,employeeId) " +
      "values(?,?,?,?,?)";
    const status = await db.doQuery(sql, parameters);
    console.log("status", status);
  } catch (err) {
    console.log(err);
  }
}

async function remove(id) {
  try {
    const sql = "delete from employee where employeeId=?";
    const status = await db.doQuery(sql, [id]);
    console.log("removal status", status);
  } catch (err) {
    console.log(err);
  }
}

async function update(person) {
  try {
    const sql =
      "update employee set firstname=?, lastname=?, department=?, salary=? " +
      "where employeeId=?";
    const parameters = [
      person.firstname,
      person.lastname,
      person.department,
      person.salary,
      person.employeeId,
    ];

    const status = await db.doQuery(sql, parameters);
    console.log("update status:", status.queryResult.rowsChanged);
  } catch (err) {
    console.log(err);
  }
}
async function update2(person) {
  try {
    const sql =
      "update employee set firstname=?, lastname=?, department=?, salary=? " +
      "where employeeId=?";
    const parameters = [
      person.firstname,
      person.lastname,
      person.department,
      person.salary,
      person.employeeId,
    ];
    const result = await db.doQuery(
      "select employeeId from employee where employeeId=?",
      [person.employeeId]
    );
    if (result.queryResult.length === 0) {
      console.log("nothing to update");
    } else {
      const status = await db.doQuery(sql, parameters);
      console.log("update status:", status.queryResult.rowsChanged);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getAll, get, add, add2, remove, update, update2 };
