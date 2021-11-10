"use strict";

const cars = require("./cars.json");

function getAllCars() {
  return cars;
}

function getWithLicence(licence) {
  for (let car of cars) {
    if (car.licence === licence) {
      return [car];
    }
  }
  return [];
}

function getWithModel(model) {
  const found = [];
  for (let car of cars) {
    if (car.model === model) {
      found.push(car);
    }
  }
  return found;
}

module.exports = { getAllCars, getWithLicence, getWithModel };
// console.log(getAllCars());
// console.log(getWithLicence("XYZ-123"));
// console.log(getWithModel("Hoppa"));
