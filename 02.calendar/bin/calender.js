const calenderFormatter = require("../modules/calenderFormatter.js");
const numericalValidator = require("../modules/numericalValidator.js");

const isYear = new numericalValidator(1970, 2100);
const isMonth = new numericalValidator(1, 12);
const argv = require("minimist")(process.argv.slice(2));

const executedDate = new Date();
const targetYear = isYear.validate(argv["y"])
  ? argv["y"]
  : executedDate.getFullYear();
const targetMonth = isMonth.validate(argv["m"])
  ? argv["m"]
  : executedDate.getMonth() + 1;

const formatter = new calenderFormatter(targetYear, targetMonth);
console.log(formatter.formatCalender());
