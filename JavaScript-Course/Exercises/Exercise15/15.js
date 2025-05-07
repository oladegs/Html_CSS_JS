import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import isSatSun from "./isWeekend.js";

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
const todayString = today.format("dddd");
console.log(todayString);

//15e-15g
console.log("--------------");
// Test this function using a few different dates.
let date = dayjs();
console.log(date.format("dddd, MMMM D"));
console.log(isSatSun(date));

date = dayjs().add(2, "day");
console.log(date.format("dddd, MMMM D"));
console.log(isSatSun(date));

date = dayjs().add(3, "day");
console.log(date.format("dddd, MMMM D"));
console.log(isSatSun(date));

date = dayjs().add(4, "day");
console.log(date.format("dddd, MMMM D"));
console.log(isSatSun(date));
