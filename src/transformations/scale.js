const TransformationBase = require("./transformationBase");
const shapes = require("../constants/shapes");

module.exports = class Scale extends TransformationBase {
  /**
   * Constructor
   * @param {any} value values to assign during transformation.
   */
  constructor(value) {
    super(value);
  }

  /**
   * Scale a shape to the set value.
   * @param {object} shape shape
   * @returns {object} transformed shape
   */
  transform(shape) {
    const type = shape.type;

    switch (type) {
      case shapes.circle: {
        shape.radius = Math.round(shape.radius * this.value);
        break;
      }

      case shapes.rectangle: {
        shape.height = Math.round(shape.height * this.value);
        shape.width = Math.round(shape.width * this.value);
        break;
      }

      case shapes.square: {
        shape.width = Math.round(shape.width * this.value);
        break;
      }

      default: {
        return shape;
      }
    }

    return shape;
  }
};
