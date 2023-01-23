const calenderFormatter = require("../modules/calenderFormatter.js");

const targetDate = new Date();
const targetYear = targetDate.getFullYear();
const targetMonth = targetDate.getMonth() + 1;

console.log(calenderFormatter(targetYear, targetMonth));
