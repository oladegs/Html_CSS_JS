import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { Car } from "../data/car.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
//import "../data/cart-class.js";
//import "../data/backend-practice.js";

async function loadPage() {
  try {
    await Promise.all([loadProductsFetch(), loadCartFetch()]);
    // const value = await new Promise((resolve, reject) => {
    //   loadCart(() => {
    //     resolve("value3");
    //     reject("error-cart");
    //   });
    // });
  } catch (error) {
    console.log("❗Unexpected error. Please try again later.");
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
async function loadPage() {
  console.log('load page');
  return 'value2';
}

loadPage().then((value) => {
  console.log("next step");
  console.log(value); //value2
});

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
   renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

Promise.all([
  // Promise is a class
  new Promise((resolve) => {
    loadProducts(() => {
      resolve("value1"); // lets us share a value between two steps of a promise
    });
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
   renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

// Promise is a class
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1"); // lets us share a value between two steps of a promise
  });
})
  .then((value) => {
    console.log(value); // we get value1
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
      renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
  });

loadProducts(() => {
  loadCart(() => {
     renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
  });
});
*/
