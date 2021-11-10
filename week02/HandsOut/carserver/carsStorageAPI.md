# Car storage

## cars.json
```json
[
    {"model":"WBM", "licence":"ABC-1"},
    {"model":"Hoppa", "licence":"XYZ-123"}
]
```

## API

All functions return an array of cars.

### **getAllCars()**
returns all cars from cars.json

### **getWithLicence(licence)**
returns the car object that has the same licence as given as a parameter. The object is returned in an array. If no match is found, an empty array is returned.

### **getWithModel(model)**
returns all cars that have the same model as given as a parameter. If none is found, returns an empty array.

## Server

### Usage

#### get all cars
```
http://localhost:3000/cars
```

#### get by licence

```
http://localhost:3000/search/bylicence?licence=ABC-1
```

#### get by model
```
http://localhost:3000/search/bymodel?model=Hoppa
```