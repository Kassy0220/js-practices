const numericalValidator = require("../modules/numericalValidator.js");
const isMonth = new numericalValidator(1, 12);

test("整数以外の値を渡すと、falseを返す", () => {
  expect(isMonth.validate(undefined)).toBe(false);
  expect(isMonth.validate(true)).toBe(false);
  expect(isMonth.validate(null)).toBe(false);
  expect(isMonth.validate("string")).toBe(false);
  expect(isMonth.validate(1.5)).toBe(false);
});

test("下限の整数よりも小さな整数を渡すと、falseを返す", () => {
  expect(isMonth.validate(0)).toBe(false);
});

test("上限の整数よりも大きな整数を渡すと、falseを返す", () => {
  expect(isMonth.validate(13)).toBe(false);
});

test("範囲内の整数を渡すと、trueを返す", () => {
  expect(isMonth.validate(1)).toBe(true);
  expect(isMonth.validate(12)).toBe(true);
});
