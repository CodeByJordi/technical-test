/**
 * Transformation that can be performed on a provided shape.
 */
module.exports = class TransformationBase {
  /**
   * Constructor
   * @param {string} action type of transformation.
   * @param {any} value values to assign during transformation.
   */
  constructor(value) {
    if (!value) {
      throw Error("Value cannot be undefined");
    }

    this.value = value;
  }
};
