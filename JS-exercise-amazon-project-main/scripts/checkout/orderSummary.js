import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  calculateCartQuantity,
  updateQuantity,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
 <div class="cart-item-container js-cart-item-container js-cart-item-container-${
   matchingProduct.id
 }">

        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>

            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>

            <div class="product-quantity js-product-quantity-${
              matchingProduct.id
            }">

            <span>
              Quantity: <span class="quantity-label js-quantity-label-${
                matchingProduct.id
              }">${cartItem.quantity}</span>
            </span>

            <span class="update-quantity-link link-primary js-update-link"
              data-product-id="${matchingProduct.id}" tabindex="0">
              Update
            </span>

            <input class="quantity-input js-quantity-input-${
              matchingProduct.id
            }">

            <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>

            <span class="delete-quantity-link link-primary js-delete-link  js-delete-link-${
              matchingProduct.id
            }" data-product-id="${matchingProduct.id}">
              Delete
            </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // SF
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      // const today = dayjs();
      // const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      // const dateString = deliveryDate.format("dddd, MMMM D");
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option 
                js-delivery-option
               js-product-delivery-${matchingProduct.id}-${deliveryOption.id}"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          
          <input type="radio"
            ${isChecked ? "checked" : ""}
            class="delivery-option-input js-product-delivery-input-${
              matchingProduct.id
            }-${deliveryOption.id}"
            name="delivery-option-${matchingProduct.id}">
          
            <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  // SF
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    const returnLinkElement = document.querySelector(".js-return-to-home-link");
    if (returnLinkElement) {
      returnLinkElement.innerHTML = `${cartQuantity} items`;
    }
  }

  updateCartQuantity();

  // Delete Button
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      // const container = document.querySelector(
      //   `.js-cart-item-container-${productId}`
      // );
      // container.remove();

      updateCartQuantity();
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // JS- Delivery Option
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // Update Button
  document.querySelectorAll(".js-update-link").forEach((link) => {
    const enableEditing = () => {
      const productId = link.dataset.productId;
      console.log(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add("is-editing-quantity");
    };

    // Handle click
    link.addEventListener("click", enableEditing);

    // Handle Enter key press
    link.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        enableEditing();
      }
    });
  });

  // Save Button
  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove("is-editing-quantity");

      // Here's an example of a feature we can add: validation.
      // Note: we need to move the quantity-related code up
      // because if the new quantity is not valid, we should
      // return early and NOT run the rest of the code. This
      // technique is called an "early return".
      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000) {
        alert("Quantity must be at least 0 and less than 1000");
        return;
      }
      updateQuantity(productId, newQuantity);

      // We can delete the code below (from the original solution)
      // because instead of using the DOM to update the page directly
      // we can use MVC and re-render everything. This will make sure
      // the page always matches the data.
      // const quantityLabel = document.querySelector(
      //   `.js-quantity-label-${productId}`
      // );
      // quantityLabel.innerHTML = newQuantity;

      // updateCartQuantity();

      // 🔄 Re-render the entire checkoutHeader,order summary and payment
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
