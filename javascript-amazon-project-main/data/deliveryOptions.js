import isWeekend from "../../../JavaScript-Course/Exercises/Exercise15/isWeekend.js";
import isSatSun from "../../../JavaScript-Course/Exercises/Exercise15/isWeekend.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

// Array because we want a list
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  /*
  - Update deliveryOptionId in the cart
  - Update the page
  */
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOption[0];
}

export function calculateDeliveryDate(deliveryOption) {
  // const today = dayjs();
  // const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  // const dateString = deliveryDate.format("dddd, MMMM D");
  // return dateString;

  // Start with the number of delivery days provided
  let remainingDays = deliveryOption.deliveryDays;

  // Get today’s date using the dayjs library
  let deliveryDate = dayjs();

  // Keep looping until we’ve counted all the delivery days
  while (remainingDays > 0) {
    // Move one day forward
    deliveryDate = deliveryDate.add(1, "day");

    // Only count this day if it's not a weekend (Saturday or Sunday)
    if (!isWeekend(deliveryDate)) {
      // Reduce the number of remaining delivery days by one
      remainingDays--;
    }
  }

  // Format the final delivery date into something like "Wednesday, May 14"
  const dateString = deliveryDate.format("dddd, MMMM D");

  // Return the final delivery date as a nice-looking string
  return dateString;
}
