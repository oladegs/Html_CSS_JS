import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const today = dayjs();

//15a
const fiveDate = today.add(5, "days");
const dateString = fiveDate.format("MMMM D");
console.log(dateString);

//15b
const oneMonth = today.add(1, "month");
const dateStringg = oneMonth.format("MMMM D");
console.log(dateStringg);

//15c
const subtractMonth = today.subtract(1, "Month");
const subtractString = subtractMonth.format("MMMM D");
console.log(subtractString);

//15d
const todayString = today.format("dddd, MMMM D");
console.log(todayString);

//15e
function isWeekend(date) {
  const dateObject = {
    dayOfWeek: today.format("dddd"),
    month: today.format("MMMM"),
    dayOfMonth: today.format("D"),
  };
  const { dayOfWeek } = dateObject;
  if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") {
    console.log(dayOfWeek);
  } else {
    console.log("Sorry not the weekend");
  }
}
console.log(isWeekend("Monday"));
console.log(isWeekend("Sunday"));
