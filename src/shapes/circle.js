require("dotenv").config();
const ShapeBase = require("./shapeBase");
const shapes = require("../constants/shapes");
const pi = process.env.pi;

/**
 * Class that represents a circle shape.
 */
module.exports = class Circle extends ShapeBase {
  /**
   * Constructor
   * @param {number} id id
   * @param {number} radius circle radious
   * @param {number} x x position
   * @param {number} y y position
   * @param {string} color circle color
   * @throws {Error} when parameters are undefined
   */
  constructor(id, radius, x, y, color) {
    super(id, shapes.circle, x, y, color);

    if (radius === undefined) {
      throw Error("Radius cannot be undefined");
    }

    this.radius = radius;
  }

  /**
   * Calculate the area of the circle.
   * @returns {number} area
   */
  getArea() {
    const area = this.radius * this.radius * pi;
    return area;
  }

  /**
   * Calculate the circumference of the circle.
   * @returns {number} circumference
   */
  getCircumference() {
    const circumference = pi * this.radius * 2;
    return circumference;
  }
};
