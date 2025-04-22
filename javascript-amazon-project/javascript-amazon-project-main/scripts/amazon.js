/* Try to make things Generic

Since we have a list of products , we are going to use a list
and since each list has group of related items , we are going to use an Object
*/
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";
products.forEach((product) => {
  productsHTML += ` <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
             ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(
            2
          )}</div>

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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">Add to Cart</button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

/*
// cart.push({
//   productName: 'Basketball',
//   quantity: 1
// })
Steps for DRY: 
1) Check if the product is already in the cart 
2) If it is in the cart, increase the quantity 
3) If it's not in the cart, add it to the cart

No two products should have this name , to fix this:
- give each product an id
- this id should be unique 

Steps for cartQuantity: 

Calc the quantity
put the quantity on the page 
*/

// Loop through all buttons with the class 'js-add-to-cart'
document.querySelectorAll(".js-add-to-cart").forEach((addButton) => {
  // Add a click event listener to each button
  addButton.addEventListener("click", () => {
    // Get the product name from the button's data attribute
    const productId = addButton.dataset.productId;

    // We'll use this variable to check if the item already exists in the cart
    let matchingItem;

    // Loop through the cart.push below to find if the product is already added
    cart.forEach((item) => {
      if (productId === item.productId) {
        // If we find a match, store it in matchingItem
        matchingItem = item;
      }
    });

    // If the item is already in the cart, increase its quantity by 1
    if (matchingItem) {
      matchingItem.quantity++;
    }
    // If the item is not in the cart, add it with quantity set to 1
    else {
      cart.push({ productId: productId, quantity: 1 });
    }

    // Calculate the total quantity of all items in the cart
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  });
});
