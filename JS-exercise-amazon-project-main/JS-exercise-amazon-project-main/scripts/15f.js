import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import isSatSun from "../scripts/checkout/isWeekend.js";

const today = dayjs();
const datee = today.add(5, "days");
const datez = today.add(1, "month");
const dateSubtract = today.subtract(1, "month");

console.log(datee.format("MMMM D"));
console.log(datez.format("MMMM D"));
console.log(dateSubtract.format("MMMM D"));
console.log(dateSubtract.format("dddd"));
console.log("---------------------------");

// Test this function using a few different dates.
let date = dayjs();
console.log(date.format("dddd, MMMM D"));
console.log(isSatSun(date));

date = dayjs().add(2, "day");
console.log(date.format("dddd, MMMM D"));
console.log(isSatSun(date));

date = dayjs().add(4, "day");
console.log(date.format("dddd, MMMM D"));
console.log(isSatSun(date));

date = dayjs().add(6, "day");
console.log(date.format("dddd, MMMM D"));
console.log(isSatSun(date));
