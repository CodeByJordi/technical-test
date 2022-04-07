const Move = require("../transformations/move");
const Scale = require("../transformations/scale");
const transformations = require("../constants/transformations");

/**
 * Factory class for creating transformations from a json.
 */
module.exports = class TransformationFactory {
  /**
   * Create a transformation object from a json object.
   * @param {object} json
   * @returns {object} transformation
   * @returns {undefined} when invalid action is used.
   */
  create(json) {
    const action = json.action;

    switch (action) {
      case transformations.move: {
        const x = json.x;
        const y = json.y;

        const move = new Move({ x, y });

        return move;
      }

      case transformations.scale: {
        const factor = json.factor;

        const scale = new Scale(factor);
        return scale;
      }

      default: {
        console.log(`Encountered invalid transformation type ${action}`);
        return undefined;
      }
    }
  }
};
