const ShapeBase = require("./shapeBase");
const shapes = require("../constants/shapes");
/**
 * Class that represents a square shape
 */
module.exports = class Square extends ShapeBase {
  /**
   * Constructor
   * @param {number} id id
   * @param {number} width square width
   * @param {number} x x position
   * @param {number} y y position
   * @param {string} color square color
   * @throws {Error} when parameters are undefined.
   */
  constructor(id, width, x, y, color) {
    super(id, shapes.square, x, y, color);

    if (width === undefined) {
      throw Error("Width cannot be undefined");
    }

    this.width = width;
  }

  /**
   * Calculate the area of the square.
   * @returns {number} area
   */
  getArea() {
    const area = this.width * this.width;
    return area;
  }

  /**
   * Calculate the circumference of the rectangle.
   * @returns {number} circumference
   */
  getCircumference() {
    const circumference = this.width * 4;
    return circumference;
  }
};
