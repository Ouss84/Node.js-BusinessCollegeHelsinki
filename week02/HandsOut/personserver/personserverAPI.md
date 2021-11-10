# Person API

## persons.json
```json
[
    {"firstname":"Matt", "lastname":"River", "age":30},
    {"firstname":"Vera", "lastname":"River", "age":10},
    {"firstname":"Mary", "lastname":"Smith", "age":50}
]
```

## Datalayer for person

## function **search(key,value)**

Function returns person objects in an array. Search criterion is passed to the function as parameters. If parameters are missing, all persons will be returned. If no person matches the criterion, an empty array is returned.

### Examples

```js
search();
search("firstname");
```

both returns 
```json
[
    {"firstname":"Matt", "lastname":"River", "age":30},
    {"firstname":"Vera", "lastname":"River", "age":10},
    {"firstname":"Mary", "lastname":"Smith", "age":50}
]
```

```js
search("firstname","Matt");
```

returns 
```json
[
    {"firstname":"Matt", "lastname":"River", "age":30}   
]
```

```js
search("lastname", "River");
```

returns 
```json
[
    {"firstname":"Matt", "lastname":"River", "age":30},
    {"firstname":"Vera", "lastname":"River", "age":10}
]
```

## Usage

###search all persons
```
http://localhost:3000/persons
```

###search by firstname
```
http://localhost:3000/persons/firstname?value=Matt
```

###search by lastname
```
http://localhost:3000/persons/lastname?value=River
```

###search by age
```
http://localhost:3000/persons/age?value=30
```
Server sends a web page to the browser, Use table alement to show the data.
