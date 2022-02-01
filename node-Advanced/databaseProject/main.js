"use strict";

const {
  getAll,
  get,
  add,
  add2,
  remove,
  update,
  update2,
} = require("./dataLayer");
async function run() {
  console.log("###### get All #######");
  await getAll();
  console.log("###### get 1 #######");
  await get(1);
  console.log("###### get 2 #######");
  await get(2);

  console.log("###### remove 77 #######");
  await remove(77);
  console.log("###### add #######");
  const newEmp = {
    employeeId: 33,
    firstname: "Max",
    lastname: "Ver",
    department: "Red",
    salary: 9999,
  };
  await add2(newEmp);
  console.log("###### removing 7,33,44 #######");
  await remove(7);
  await remove(33);
  await remove(44);
  await getAll();
  const updatedEmp = {
    employeeId: 5,
    firstname: "Maxi",
    lastname: "Ver",
    department: "Red",
    salary: 5990,
  };
  await update(updatedEmp);
  await getAll();
  update2({
    employeeId: 55,
    firstname: "Maxi",
    lastname: "Ver",
    department: "Red",
    salary: 5990,
  });
  await getAll();
}
run();
