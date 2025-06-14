import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";
//import "../data/backend-practice.js";

// async : makes a fn return a promise and this feature allows us to use await
async function loadPage() {
  //Codes that could cause error are what we put in try block - the ones makng req to backend
  try {
    // manually creating errors
    //throw "error1";

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // if we await a promise , instead of going into .catch, is going to go into catch
      // throw "error2";
      // throw doesnt work in the future () => {}, we get another parameter , reject and is a fn
      loadCart(() => {
        //reject("error3");
        resolve("value3");
      });
    });
  } catch (error) {
    console.log("unexpected errorsz. Please try again later");
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
loadPage().then((value) => {
  console.log("next step");
  console.log(value);
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
  renderOrderSummary();
  renderPaymentSummary();
});

/*
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
  renderOrderSummary();
  renderPaymentSummary();
});

/*
// Promise is a class
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1"); // lets us share a value between two steps of a promise
  });
})
  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });
  })
  .then(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });


loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
