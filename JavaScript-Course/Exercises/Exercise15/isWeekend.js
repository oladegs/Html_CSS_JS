export default function isWeekend(date) {
  const dayOfWeek = date.format("dddd");
  return dayOfWeek === "Saturday" || dayOfWeek === "Sunday";

  // if (dayOfWeek === "Saturday" || dayOfWeek === "Sunday") {
  //   return `${dayOfWeek} is a weekend.`;
  // } else {
  //   return `${dayOfWeek} is not a weekend.`;
  // }
}
