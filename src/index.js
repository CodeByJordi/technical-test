require("dotenv").config();
const ShapeFactory = require("./factories/shapeFactory");
const TransformationFactory = require("./factories/transformationFactory");
const FilterFactory = require("./factories/filterFactory");
const FilterFunction = require("./filters/filterFunction");
const Move = require("./transformations/move");
const Scale = require("./transformations/scale");

let filterQueue = [];
/**
 * @param {object[]} shapes - array of shapes to process
 * @param {object[]} operations - array of operations to apply
 * @returns {object[]} processed shapes
 */
function process(shapes, operations) {
  const shapeFactory = new ShapeFactory();
  const transformationFactory = new TransformationFactory();
  const filterFactory = new FilterFactory();

  const operationCollection = [];

  // Create transformations and filters

  operations.forEach(json => {
    const type = json.type;

    if (type == "filter") {
      const filter = filterFactory.create(json);
      operationCollection.push(filter);
    }

    if (type == "transform") {
      const transformation = transformationFactory.create(json);
      operationCollection.push(transformation);
    }
  });

  // process operations
  for (let i = shapes.length - 1; i >= 0; i--) {
    let shape = shapeFactory.create(shapes[i]);

    let isValid = true;
    for (const operation of operationCollection) {
      if (operation instanceof Move || operation instanceof Scale) {
        shape = operation.transform(shape);
      }

      if (operation instanceof FilterFunction) {
        isValid = operation.filter(shape);

        if (isValid === false) {
          break;
        }
      }

      for (filter of filterQueue) {
        isValid = filter(shape, operation);

        if (isValid === false) {
          break;
        }
      }
    }

    // Remove invalid shapes
    if (isValid === false) {
      shapes.splice(i, 1);
    } else {
      shapes[i] = shape;
    }
  }

  // Clear added filter queue...
  filterQueue = [];

  // JSON parse to change shape classes to object in JSON.
  const json = JSON.stringify(shapes);
  return JSON.parse(json);
}

/**
 * @param {string} property - name of the property that will be used for filter operation
 * @param {FilterFunction} fn - function that will execute filter agains passed shape and return true or false.
 */
function addFilter(property, fn) {
  filterQueue.push(fn);
}

/**
 * @typedef {function} FilterFunction
 * @param {object} shape - object with shape data (the same format as in shapes.json file)
 * @param {object} operation - object with operation data (the same format as in operations.json file)
 * @return {boolean} - true when shape matches the filter configuration, false when it doesn't match
 *
 * example filter that accepts only shapes with width of 10:
 * function exampleFilter(shape, operation) {
 *   return shape.width === 10;
 * }
 */

module.exports = {
  process,
  addFilter,
};
