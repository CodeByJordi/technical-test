/**
 * Base class for shapes
 */
module.exports = class ShapeBase {
  /**
   * Constructor
   * @param {number} id id
   * @param {string} type shape type
   * @param {number} x x position
   * @param {number} y y position
   * @param {string} color shape color
   * @throws {Error} when parameters are undefined
   */
  constructor(id, type, x, y, color) {
    if (id === undefined) {
      throw Error("Id cannot be undefined");
    }

    if (!type) {
      throw Error("Type cannot be undefined or empty");
    }

    if (x === undefined) {
      throw Error("X cannot be undefined");
    }

    if (y === undefined) {
      throw Error("Y cannot be undefined");
    }

    if (!color) {
      throw Error("Color cannot be undefined");
    }

    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y;
    this.color = color;
  }
};
