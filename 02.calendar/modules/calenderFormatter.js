module.exports = CalenderFormatter;

function CalenderFormatter(year, month) {
  this.year = year;
  this.month = month;
}

CalenderFormatter.prototype.formatCalender = function () {
  return [
    `      ${this.month}月 ${this.year}`,
    "日 月 火 水 木 金 土",
    this.formatDate(),
  ].join("\n");
};

CalenderFormatter.prototype.formatDate = function () {
  const lastDay = new Date(this.year, this.month, 0);
  const lastDate = lastDay.getDate();
  const firstDay = new Date(this.year, this.month - 1, 1);
  const allDates = [];

  for (let i = 1; i <= lastDate; i++) {
    allDates.push(i.toString().padStart(2, " "));
  }

  // 月初めの曜日に合わせて空白を挿入
  for (let i = 0; i < firstDay.getDay(); i++) {
    allDates.unshift("  ");
  }

  const oneWeek = [];
  const formattedDates = [];

  for (let i = 0; i < allDates.length; i++) {
    oneWeek.push(allDates[i]);
    if (oneWeek.length === 7 || i === allDates.length - 1) {
      formattedDates.push(oneWeek.join(" ") + "\n");
      oneWeek.splice(0);
    }
  }
  return formattedDates.join("").replace(/\n$/, "");
};
