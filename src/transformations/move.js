const TransformationBase = require("./transformationBase");

module.exports = class Move extends TransformationBase {
  /**
   * Constructor
   * @param {any} value values to assign during transformation.
   */
  constructor(value) {
    super(value);
  }

  /**
   * Transform the position values of a shape
   * @param {object} shape shape to transform
   * @returns {object} transformed shape
   */
  transform(shape) {
    if (!shape) {
      throw Error("Shape cannot be undefined");
    }

    const x = this.value.x;
    const y = this.value.y;

    shape.x += x;
    shape.y += y;

    return shape;
  }
};
