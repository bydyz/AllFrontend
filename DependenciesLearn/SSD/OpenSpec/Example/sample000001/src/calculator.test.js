const { add, subtract, multiply, divide } = require("./calculator");

describe("计算器模块测试", () => {
  describe("加法运算", () => {
    test("正常加法运算", () => {
      expect(add(2, 3)).toBe(5);
    });

    test("负数加法运算", () => {
      expect(add(-1, 1)).toBe(0);
    });
  });

  describe("减法运算", () => {
    test("正常减法运算", () => {
      expect(subtract(5, 3)).toBe(2);
    });

    test("结果为负数的减法运算", () => {
      expect(subtract(3, 5)).toBe(-2);
    });
  });

  describe("乘法运算", () => {
    test("正常乘法运算", () => {
      expect(multiply(4, 5)).toBe(20);
    });

    test("乘以零的运算", () => {
      expect(multiply(10, 0)).toBe(0);
    });
  });

  describe("除法运算", () => {
    test("正常除法运算", () => {
      expect(divide(10, 2)).toBe(5);
    });

    test("除数为零时抛出错误", () => {
      expect(() => divide(10, 0)).toThrow("除数不能为零");
    });
  });
});
