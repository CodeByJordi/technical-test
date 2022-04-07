// implement the tests here using Jest

const Circle = require("../shapes/circle");
const Rectangle = require("../shapes/rectangle");
const Square = require("../shapes/square");
const ShapeFactory = require("../factories/shapeFactory");
const Move = require("../transformations/move");
const Scale = require("../transformations/scale");
const FilterFunction = require("../filters/filterFunction");
const FilterFactory = require("../factories/filterFactory");
const TransformationFactory = require("../factories/transformationFactory");
const fs = require("fs");
const { process, addFilter } = require("..");
const shapes = require("../constants/shapes");
const operators = require("../constants/operators");
const properties = require("../constants/properties");
const transformations = require("../constants/transformations");

describe("process()", () => {
  test("should process shapes in shapes.json to output in output.json", async () => {
    // Arrange
    let shapes = await fs.promises.readFile("src/__tests__/shapes.json");
    shapes = JSON.parse(shapes);
    let operations = await fs.promises.readFile("src/__tests__/operations.json");
    operations = JSON.parse(operations);
    let expected = await fs.promises.readFile("src/__tests__/output.json");
    expected = JSON.parse(expected);
    const sut = process;

    // Act
    const actual = sut(shapes, operations);
    expected.sort();
    actual.sort();

    // Assert
    expect(actual).toEqual(expected);
  });
});

describe("addFilter()", () => {
  test("should perform extra filter if any are queued up", async () => {
    // Arrange
    let shapes = await fs.promises.readFile("src/__tests__/shapes.json");
    shapes = JSON.parse(shapes);
    let operations = await fs.promises.readFile("src/__tests__/operations.json");
    operations = JSON.parse(operations);
    let expected = await fs.promises.readFile("src/__tests__/filteredOutput.json");
    expected = JSON.parse(expected);

    const sut = addFilter;
    sut("?", (shape, operation) => {
      return shape.id !== 2;
    });

    // Act
    const actual = process(shapes, operations);
    expected.sort();
    actual.sort();

    // Assert
    expect(actual).toEqual(expected);
  });
});

// ### Exta Tests ###

describe("Circle", () => {
  describe("Constructor", () => {
    test("should throw error if radius is undefined", () => {
      // Assert
      expect(() => {
        return new Circle(1, undefined, 0, 0, "Green");
      }).toThrow("Radius cannot be undefined");
    });
  });
  describe("getArea()", () => {
    test("should return area of a circle", () => {
      // Arrange
      const expected = 12.56;
      const sut = new Circle(1, 2, 0, 0, "Green");

      // Act
      const actual = sut.getArea();

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe("getCircumference()", () => {
    test("should return circumference of the circle", () => {
      // Arrange
      const expected = 18.84;
      const sut = new Circle(1, 3, 0, 0, "Green");

      // Act
      const actual = sut.getCircumference();

      // Assert
      expect(actual).toBe(expected);
    });
  });
});

describe("Rectangle", () => {
  describe("Constructor", () => {
    test("should throw error if width is undefined", () => {
      // Assert
      expect(() => {
        return new Rectangle(1, undefined, 5, 0, 0, "Green");
      }).toThrow("Width cannot be undefined");
    });
    test("should throw error if heigth is undefined", () => {
      // Assert
      expect(() => {
        return new Rectangle(1, 5, undefined, 0, 0, "Green");
      }).toThrow("Height cannot be undefined");
    });
  });
  describe("GetArea()", () => {
    test("should return area of the rectangle", () => {
      // Arrange
      const expected = 10;
      const sut = new Rectangle(1, 5, 2, 0, 0, "Green");

      // Act
      const actual = sut.getArea();

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe("GetCircumference()", () => {
    test("should return circumference of the rectangle", () => {
      // Arrange
      const expected = 40;
      const sut = new Rectangle(1, 10, 10, 0, 0, "Green");

      // Act
      const actual = sut.getCircumference();

      // Assert
      expect(actual).toBe(expected);
    });
  });
});

describe("Square", () => {
  describe("Constructor", () => {
    test("should throw error if id is undefined", () => {
      // Assert
      expect(() => {
        return new Square(undefined, 5, 0, 0, "Green");
      }).toThrow("Id cannot be undefined");
    });
    test("should throw error if width is undefined", () => {
      // Assert
      expect(() => {
        return new Square(1, undefined, 0, 0, "Green");
      }).toThrow("Width cannot be undefined");
    });
    test("should throw error if x is undefined", () => {
      // Assert
      expect(() => {
        return new Square(1, 5, undefined, 0, "Green");
      }).toThrow("X cannot be undefined");
    });
    test("should throw error if y is undefined", () => {
      // Assert
      expect(() => {
        return new Square(1, 5, 0, undefined, "Green");
      }).toThrow("Y cannot be undefined");
    });
    test("should throw error if y is undefined", () => {
      // Assert
      expect(() => {
        return new Square(1, 5, 0, 0, "");
      }).toThrow("Color cannot be undefined");
    });
  });
  describe("GetArea()", () => {
    test("should return the area of the square", () => {
      // Arrange
      const expected = 25;
      const sut = new Square(1, 5, 0, 0, "Green");

      // Act
      const actual = sut.getArea();

      // Assert
      expect(actual).toBe(expected);
    });
  });

  describe("GetCircumference()", () => {
    test("should return the circumference of the square", () => {
      // Arrange
      const expected = 44;
      const sut = new Square(1, 11, 0, 0, "Green");

      // Act
      const actual = sut.getCircumference();

      // Assert
      expect(actual).toBe(expected);
    });
  });
});

describe("ShapeFactory", () => {
  describe("create()", () => {
    test("should return undefined if json contains invalid shape type", () => {
      // Arrange
      const json = { id: 0, type: "invalid", x: 0, y: 0, color: "Green" };
      const sut = new ShapeFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual).toBe(undefined);
    });

    test("should return Circle if json contains circle type", () => {
      // Arrange
      const json = { id: 0, type: shapes.circle, radius: 5, x: 0, y: 0, color: "Green" };
      const sut = new ShapeFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual instanceof Circle).toBe(true);
    });

    test("should return Rectangle if json contains rectangle type", () => {
      // Arrange
      const json = { id: 0, type: shapes.rectangle, width: 5, height: 5, x: 0, y: 0, color: "Green" };
      const sut = new ShapeFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual instanceof Rectangle).toBe(true);
    });

    test("should return Square if json contains square type", () => {
      // Arrange
      const json = { id: 0, type: shapes.square, width: 5, x: 0, y: 0, color: "Green" };
      const sut = new ShapeFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual instanceof Square).toBe(true);
    });
  });
});

describe("FilterFactory", () => {
  describe("create()", () => {
    test("should create lower than filter when create() is called with lt", () => {
      // Arrange
      const expected = true;
      const json = {
        type: "filter",
        property: properties.area,
        operator: operators.lowerThan,
        value: 1,
      };
      const sut = new FilterFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual.operator(1, 5)).toBe(expected);
    });
    test("should create greater than filter when create() is called with gt", () => {
      // Arrange
      const expected = true;
      const json = {
        type: "filter",
        property: properties.area,
        operator: operators.greaterThan,
        value: 1,
      };
      const sut = new FilterFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual.operator(5, 1)).toBe(expected);
    });
    test("should create equals than filter when create() is called with eq", () => {
      // Arrange
      const expected = true;
      const json = {
        type: "filter",
        property: properties.area,
        operator: operators.equals,
        value: 1,
      };
      const sut = new FilterFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual.operator(5, 5)).toBe(expected);
    });
    test("should create not equals than filter when create() is called with neq", () => {
      // Arrange
      const expected = true;
      const json = {
        type: "filter",
        property: properties.area,
        operator: operators.notEquals,
        value: 1,
      };
      const sut = new FilterFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual.operator(5, 4)).toBe(expected);
    });
    test("should create in filter when create() is called with in", () => {
      // Arrange
      const expected = true;
      const json = {
        type: "filter",
        property: properties.area,
        operator: operators.in,
        value: [1, 10],
      };
      const sut = new FilterFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual.operator(7, [1, 10])).toBe(expected);
    });

    test("should return undefined when create() is called with invalid operator", () => {
      // Arrange
      const expected = undefined;
      const json = {
        type: "filter",
        property: properties.area,
        operator: "invalid",
        value: [1, 10],
      };
      const sut = new FilterFactory();

      // Act
      const actual = sut.create(json);

      // Assert
      expect(actual).toBe(expected);
    });
  });
});

describe("Transformation Factory", () => {
  describe("create()", () => {
    test("should create Move transformation when action is set as move", () => {
      // Arrange
      const expected = true;
      const json = {
        type: "transform",
        action: transformations.move,
        x: -30,
        y: 30,
      };
      const sut = new TransformationFactory();

      // Act
      const move = sut.create(json);

      // Assert
      expect(move instanceof Move).toBe(expected);
    });
    test("should create Move transformation when action is set as move", () => {
      // Arrange
      const expected = true;
      const json = {
        type: "transform",
        action: transformations.scale,
        factor: 0.3,
      };
      const sut = new TransformationFactory();

      // Act
      const move = sut.create(json);

      // Assert
      expect(move instanceof Scale).toBe(expected);
    });

    test("should return undefined when create() is called with an invalid transformation", () => {
      // Arrange
      const expected = undefined;
      const json = {
        type: "transform",
        action: "invalid",
        factor: 0.3,
      };
      const sut = new TransformationFactory();

      // Act
      const move = sut.create(json);

      // Assert
      expect(move).toBe(expected);
    });
  });
});

describe("Move", () => {
  describe("transform()", () => {
    test("should throw error when Move is created without value", () => {
      // Assert
      expect(() => {
        new Move(undefined);
      }).toThrow("Value cannot be undefined");
    });
    test("should throw error when transform() is called without shape", () => {
      // Arrange
      const sut = new Move(11);

      // Assert
      expect(() => {
        sut.transform(undefined);
      }).toThrow("Shape cannot be undefined");
    });
    test("should change x to defined values when transform() is called", () => {
      // Arrange
      const expected = 15;
      const shape = new Square(1, 5, 5, 5, "Green");
      const sut = new Move({ x: 10, y: 5 });

      // Act
      const actual = sut.transform(shape);

      // Assert
      expect(actual.x).toBe(expected);
    });

    test("should change y to defined values when transform() is called", () => {
      // Arrange
      const expected = 2;
      const shape = new Square(1, 5, 5, 5, "Green");
      const sut = new Move({ x: 5, y: -3 });

      // Act
      const actual = sut.transform(shape);

      // Assert
      expect(actual.y).toBe(expected);
    });
  });
});

describe("Scale", () => {
  describe("transform()", () => {
    test("should scale width to defined values when transform() is called on Square", () => {
      // Arrange
      const expected = 10;
      const shape = new Square(1, 5, 5, 5, "Green");
      const sut = new Scale(2);

      // Act
      const actual = sut.transform(shape);

      // Assert
      expect(actual.width).toBe(expected);
    });

    test("should scale width to defined values when transform() is called on Circle", () => {
      // Arrange
      const expected = 10;
      const shape = new Circle(1, 5, 0, 0, "Green");
      const sut = new Scale(2);

      // Act
      const actual = sut.transform(shape);

      // Assert
      expect(actual.radius).toBe(expected);
    });

    test("should scale width to defined values when transform() is called on Rectangle", () => {
      // Arrange
      const expected = 10;
      const shape = new Rectangle(1, 5, 5, 0, 0, "Green");
      const sut = new Scale(2);

      // Act
      const actual = sut.transform(shape);

      // Assert
      expect(actual.width).toBe(expected);
    });

    test("should scale height to defined values when transform() is called on Rectangle", () => {
      // Arrange
      const expected = 10;
      const shape = new Rectangle(1, 5, 5, 0, 0, "Green");
      const sut = new Scale(2);

      // Act
      const actual = sut.transform(shape);

      // Assert
      expect(actual.height).toBe(expected);
    });

    test("should return unmodified object if shape type is not supported()", () => {
      // Arrange
      const type = "invalid";
      const shape = new Square(1, 2, 0, 0, "Green");
      shape.type = type;
      const sut = new Scale(2);

      // Act
      const actual = sut.transform(shape);

      // Assert
      expect(actual).toBe(shape);
    });
  });
});

describe("FilterFunction", () => {
  describe("Constructor", () => {
    test("should throw error when filterfunction is created with undefined property", () => {
      // Arrange
      const emptyFunction = () => {
        return "Hello World";
      };
      // Assert
      expect(() => {
        new FilterFunction(undefined, 1, emptyFunction);
      }).toThrow("Property cannot be undefined");
    });
    test("should throw error when filterfunction is created with undefined value", () => {
      // Arrange
      const emptyFunction = () => {
        return "Hello World";
      };
      // Assert
      expect(() => {
        new FilterFunction(properties.area, undefined, emptyFunction);
      }).toThrow("Value cannot be undefined");
    });
    test("should throw error when filterfunction is created with undefined operator", () => {
      // Assert
      expect(() => {
        new FilterFunction(properties.area, 1, undefined);
      }).toThrow("Operator cannot be undefined");
    });
  });
  describe("Filter", () => {
    test("should preform area assertion when filter() is called", () => {
      // Arrange
      const fn = (shapeValue, filterValue) => {
        return shapeValue == filterValue;
      };
      const sut = new FilterFunction(properties.area, 100, fn);
      const shape = new Square(1, 10, 0, 0, "Green");

      // Act
      const actual = sut.filter(shape);

      // Assert
      expect(actual).toBe(true);
    });

    test("should preform circumference assertion when filter() is called", () => {
      // Arrange
      const fn = (shapeValue, filterValue) => {
        return shapeValue > filterValue;
      };
      const sut = new FilterFunction(properties.circumference, 10, fn);
      const shape = new Circle(1, 5, 0, 0, "Green");

      // Act
      const actual = sut.filter(shape);

      // Assert
      expect(actual).toBe(true);
    });
  });
});
