const FilterFunction = require("../filters/filterFunction");
const operators = require("../constants/operators");

/**
 * Factory for creating filter functions from JSON
 */
module.exports = class FilterFactory {
  /**
   * Create a filter object from a operation json
   * @param {*} json operation
   * @returns {FilterFunction} filter
   * @returns {undefined} when unvalid operator is used
   */
  create(json) {
    const operator = json.operator;

    let fn = undefined;
    switch (operator) {
      case operators.lowerThan: {
        fn = (shapeValue, filterValue) => {
          return shapeValue < filterValue;
        };
        break;
      }

      case operators.greaterThan: {
        fn = (shapeValue, filterValue) => {
          return shapeValue > filterValue;
        };
        break;
      }

      case operators.equals: {
        fn = (shapeValue, filterValue) => {
          return shapeValue == filterValue;
        };
        break;
      }

      case operators.notEquals: {
        fn = (shapeValue, filterValue) => {
          return shapeValue != filterValue;
        };
        break;
      }

      case operators.in: {
        fn = (shapeValue, filterValue) => {
          return shapeValue > filterValue[0] && shapeValue < filterValue[1];
        };
        break;
      }

      default: {
        console.log(`Encountered invalid operator type: ${operator}`);
        return undefined;
      }
    }

    const property = json.property;
    const value = json.value;
    const filter = new FilterFunction(property, value, fn);

    return filter;
  }
};
