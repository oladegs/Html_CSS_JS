import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";
//import "../data/backend-practice.js";

// ⚙️ async: Marks this function as asynchronous and makes it return a Promise.
// 💡 This also allows us to use `await` inside the function.
// async function loadPage() {
//   // 🛑 try block: Place any code here that might fail — usually network requests.
//   try {
//     // ⚠️ Manual error example (disabled):
//     // throw "error1";

//     // ⏳ Await the result of the product fetch request.
//     await loadProductsFetch();

//     // 🧪 Simulating a custom async operation using a manually created Promise.
//     const value = await new Promise((resolve, reject) => {
//       // ❌ If an error occurs *inside* this future function, it won’t trigger `catch` unless you call `reject()` , The throw happens after the promise constructor has returned — meaning it's no longer part of the try...catch or Promise context that you're expecting it to be in.
//       // throw "error2"; // ❌ This won't work properly inside future async logic.

//       // 🧵 In asynchronous code like this, use `reject("error")` to signal failure.
//       loadCart(() => {
//         // ❌ Simulate a cart load error:
//         // reject("error3");

//         // ✅ If successful, call resolve to continue.
//         resolve("value3");
//       });
//     });
//   } catch (error) {
//     // 🚨 If any awaited operation fails and `reject()` is called, it lands here.
//     console.log("❗Unexpected error. Please try again later.");
//   }

//   // 🧾 Render the final UI summaries after all data is ready
//   renderOrderSummary();
//   renderPaymentSummary();
// }

async function loadPage() {
  try {
    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      loadCart(() => {
        resolve("value3");
        reject("error-cart");
      });
    });
    console.log("✅ Value from loadCart:", value); //
  } catch (error) {
    console.log("❗Unexpected error. Please try again later.");
    console.log("Caught error:", error);
  }

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
