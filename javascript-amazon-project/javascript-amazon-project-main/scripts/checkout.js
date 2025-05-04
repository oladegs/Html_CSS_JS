import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// Instead of using the dom and updating the html one by one
// - Update the data
// - Regenerate all the HTML
renderOrderSummary();
renderPaymentSummary();
