module.exports = (year, month) => {
  const monthAndYear = `      ${month}月 ${year}`;
  const dayOfWeek = "日 月 火 水 木 金 土";
  const date = formatDate(year, month);

  return [monthAndYear, dayOfWeek, date].join("\n");
};

const formatDate = (year, month) => {
  const lastDay = new Date(year, month, 0);
  const lastDate = lastDay.getDate();
  const firstDay = new Date(year, month - 1, 1);
  let allDates = [];

  for (let i = 1; i <= lastDate; i++) {
    allDates.push(i.toString().padStart(2, " "));
  }

  // 月初めの曜日に合わせて空白を挿入
  for (let i = 0; i < firstDay.getDay(); i++) {
    allDates.unshift("  ");
  }

  let oneWeek = [];
  let formattedDates = [];

  for (let i = 0; i < allDates.length; i++) {
    oneWeek.push(allDates[i]);
    if (oneWeek.length === 7 || i === allDates.length - 1) {
      formattedDates.push(oneWeek.join(" ") + "\n");
      oneWeek.splice(0);
    }
  }
  return formattedDates.join("").replace(/\n$/, "");
};
