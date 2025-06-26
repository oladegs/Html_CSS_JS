import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProduct(productId);

  // Get additional details about the product like the estimated delivery time.
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details; // the whole array orders >> products []
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const trackingHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

           <div class="delivery-date">
      Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format(
        "dddd, MMMM D"
      )}
    </div>

        <div class="product-info">
         ${product.name}
        </div>

        <div class="product-info">
         Quantity: ${productDetails.quantity}
        </div>

        <img
          class="product-image"
           src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar js-progress-bar"></div>
        </div>`;

  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;

  const element = document.querySelector(".js-progress-bar");
  element.classList.remove("preparing", "shipped", "delivered");

  if (percentProgress > 0 && percentProgress < 50) {
    element.classList.add("preparing");
  } else if (percentProgress >= 50 && percentProgress < 100) {
    element.classList.add("shipped");
  } else if (percentProgress === 100) {
    element.classList.add("delivered");
  }
}

loadPage();
