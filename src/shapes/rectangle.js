const ShapeBase = require("./shapeBase");
const shapes = require("../constants/shapes");

/**
 * Class that represents a rectangle shape.
 */
module.exports = class Rectangle extends ShapeBase {
  /**
   * Constructor
   * @param {number} id id
   * @param {number} width rectangle width
   * @param {number} height rectangle height
   * @param {number} x x position
   * @param {number} y y position
   * @param {string} color rectangle color
   * @throws {Error} when parameters are undefined
   */
  constructor(id, width, height, x, y, color) {
    super(id, shapes.rectangle, x, y, color);

    if (width == undefined) {
      throw Error("Width cannot be undefined");
    }

    if (height == undefined) {
      throw Error("Height cannot be undefined");
    }

    this.width = width;
    this.height = height;
  }

  /**
   * Calculate the area of the rectangle.
   * @returns {number} area
   */
  getArea() {
    const area = this.width * this.height;
    return area;
  }

  /**
   * Calculate the circumference of the rectangle.
   * @returns {number} circumference
   */
  getCircumference() {
    const circumference = (this.width + this.height) * 2;
    return circumference;
  }
};
