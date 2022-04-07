/**
 * Base class for filter operations
 */
module.exports = class FilterFunction {
  /**
   * Constructor
   * @param {*} property property to filter on
   * @param {*} operator operator to use during filter
   * @param {*} value value(s) to filter on
   */
  constructor(property, value, operator) {
    if (!property) {
      throw Error("Property cannot be undefined");
    }

    if (!operator) {
      throw Error("Operator cannot be undefined");
    }

    if (!value) {
      throw Error("Value cannot be undefined");
    }

    this.property = property;
    this.value = value;
    this.operator = operator;
  }

  /**
   * Check if shape has a property greater than set value.
   * @param {*} shape shape
   * @param {*} operations operations
   * @returns {boolean} bool
   */
  filter(shape, operations) {
    let shapeValue = undefined;
    if (this.property == "area") {
      shapeValue = shape.getArea();
    }

    if (this.property == "circumference") {
      shapeValue = shape.getCircumference();
    }

    return this.operator(shapeValue, this.value);
  }
};
