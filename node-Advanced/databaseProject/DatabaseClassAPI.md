# Database class

This database class is a general purpose class for using Mariabd/Mysql queries.
The constractor takes all necessary information needed to open a database connection as a parameter object. This layer is used between the database engin and our application.

The constractor takes one parameter. Exemple

```js
const options = {
  host: "localhost",
  port: 3306,
  user: "zeke",
  password: "secret",
  database: "employeedb",
  allowPublicKeyRetrieval: true, //mysql users add this
};
```

## Usage

```js
const db = new Database(options);
```

## **doQuery(sql,parameters)**

This method has two parameters:

- `sql`: is a sql statement as a string
- `parameters`: an array of query parameters to be used in place of the question marks `?` in the sql statement. Parameters may also be omitted if the sql statement has no placeholder `?` in it.

### Usage

#### No parameters needed

```js
const result = await db.doQuery("select * from employee");
```

#### Query with criterion is employeeId=1

```js
const result = await db.doQuery("select * from employee where employeeId=?", [
  1,
]);
```

Return value of select with employeeId:1:
for exemple

```js
{
  queryResult: [
    {
      employeeId: 1,
      firstname: "Matt",
      lastname: "River",
      department: "ict",
      salary: 5000,
    },
  ];
  resultSet: true;
}
```

#### insert, update, delete etc

##### Insert

```js
const result = await db.doQuery("insert into employee values(?,?,?,?,?)", [
  6,
  "Petra",
  "Bond",
  "admin",
  9000,
]);
```

Returns a Promise. Return value is an object:

```js
{
    queryResult:{rowsChanged:1, insertId:0,status:0},
    resultSet:false

}
```
