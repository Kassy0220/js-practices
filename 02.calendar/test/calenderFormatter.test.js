const calenderFormatter = require("../modules/calenderFormatter.js");

test("月と年を与えると、カレンダーが表示される", () => {
  const formatter = new calenderFormatter(2023, 1);
  const exptected = `      1月 2023
日 月 火 水 木 金 土
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30 31`;
  expect(formatter.formatCalender()).toBe(exptected);
});

test("日付が6行になる場合でも、カレンダーが表示される", () => {
  const formatter = new calenderFormatter(2023, 4);
  const exptected = `      4月 2023
日 月 火 水 木 金 土
                   1
 2  3  4  5  6  7  8
 9 10 11 12 13 14 15
16 17 18 19 20 21 22
23 24 25 26 27 28 29
30`;
  expect(formatter.formatCalender()).toBe(exptected);
});

test("1970年のカレンダーでも、正しく表示される", () => {
  const formatter = new calenderFormatter(1970, 1);
  const exptected = `      1月 1970
日 月 火 水 木 金 土
             1  2  3
 4  5  6  7  8  9 10
11 12 13 14 15 16 17
18 19 20 21 22 23 24
25 26 27 28 29 30 31`;
  expect(formatter.formatCalender()).toBe(exptected);
});

test("2100年のカレンダーでも、正しく表示される", () => {
  const formatter = new calenderFormatter(2100, 12);
  const exptected = `      12月 2100
日 月 火 水 木 金 土
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31`;
  expect(formatter.formatCalender()).toBe(exptected);
});
