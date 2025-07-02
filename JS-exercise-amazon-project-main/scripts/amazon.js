// import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { cart } from "../data/cart-class.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = "";

  // products.forEach((product) => {
  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(search.toLowerCase())
        )
      );
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
         ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

        ${product.extraInfoHTML()}
        
      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    console.log(cart);
  }
  updateCartQuantity();

  // We're going to use an object to save the timeout ids.
  // The reason we use an object is because each product
  // will have its own timeoutId. So an object lets us
  // save multiple timeout ids for different products.
  // For example:
  // {
  //   'product-id1': 2,
  //   'product-id2': 5,
  //   ...
  // }
  // (2 and 5 are ids that are returned when we call setTimeout).
  const addedMessageTimeouts = {};

  // Add click listeners to all "Add to Cart" buttons
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;

      // Get selected quantity for the product
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector?.value || 1);

      cart.addToCart(productId, quantity); // Add item to cart
      updateCartQuantity(); // Update cart UI count

      // Show "Added to Cart" message
      const addedMessage = document.querySelector(
        `.js-added-to-cart-${productId}`
      );
      if (!addedMessage) return;

      addedMessage.classList.add("added-to-cart-visible");

      // Cancel previous timeout if it exists
      const previousTimeoutId = addedMessageTimeouts[productId];
      if (previousTimeoutId) clearTimeout(previousTimeoutId);

      // Hide the message after 2 seconds
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-visible");
      }, 2000);

      addedMessageTimeouts[productId] = timeoutId; // Store timeout
    });
  });

  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;
    window.location.href = `amazon.html?search=${search}`;
  });
}
