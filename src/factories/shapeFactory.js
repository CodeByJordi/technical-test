const Rectangle = require("../shapes/rectangle");
const Circle = require("../shapes/circle");
const Square = require("../shapes/square");
const ShapeBase = require("../shapes/shapeBase");
const shapes = require("../constants/shapes");

/**
 * Factory class for creating shapes from a json.
 */
module.exports = class ShapeFactory {
  /**
   * Creates a shape from the shapes json.
   * @param {object} json
   * @returns {object} shape object
   * @returns {undefined} when invalid shape type is used
   */
  create(json) {
    const id = json.id;
    const x = json.x;
    const y = json.y;
    const color = json.color;
    const type = json.type;

    switch (type) {
      case shapes.rectangle: {
        const width = json.width;
        const height = json.height;
        const rectangle = new Rectangle(id, width, height, x, y, color);
        return rectangle;
      }
      case shapes.circle: {
        const radius = json.radius;
        const circle = new Circle(id, radius, x, y, color);
        return circle;
      }
      case shapes.square: {
        const width = json.width;
        const square = new Square(id, width, x, y, color);
        return square;
      }
      default: {
        console.log(`Encountered invalid shape type ${type} in json ${json}`);
        return undefined;
      }
    }
  }
};
