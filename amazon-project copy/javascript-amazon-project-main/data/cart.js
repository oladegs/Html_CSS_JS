export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

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

// We're going to use an object to save the timeout ids.
// The reason we use an object is because each product
// will have its own timeoutId. So an object lets us
// save multiple timeout ids for different products.
// For example:
// {
//   'product-id1': 2,
//   'product-id2': 5,

timeoutIdMap tracks timeouts per product using the productId as the key.
This avoids conflicting timers when the same product is added rapidly.
Prevents errors if buttonElement is not found — no unnecessary clearTimeout.

const productId = "abc123";
timeoutIdMap[productId] = 42;
console.log(timeoutIdMap["abc123"]); // 42 ✅


function closureAddedMessage() {
  // 13m
  // This solution uses a feature of JavaScript called a
  // closure. Each time we run the loop, it will create
  // a new variable called addedMessageTimeoutId and do
  // button.addEventListener().
  //
  // Then, because of closure, the function we give to
  // button.addEventListener() will get a unique copy
  // of the addedMessageTimeoutId variable and it will
  // keep this copy of the variable forever.
  // (Reminder: closure = if a function has access to a
  // value/variable, it will always have access to that
  // value/variable).
  //
  // This allows us to create many unique copies of the
  // addedMessageTimeoutId variable (one for every time
  // we run the loop) so it lets us keep track of many
  // timeoutIds (one for each product).
  let addedMessageTimeoutId;

  addedMessage.classList.add("added-to-cart-visible");

  // Check if a previous timeoutId exists. If it does,
  // we will stop it.
  if (addedMessageTimeoutId) {
    clearTimeout(addedMessageTimeoutId);
  }

  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove("added-to-cart-visible");
  }, 2000);

  // Save the timeoutId so we can stop it later.
  addedMessageTimeoutId = timeoutId;
}

let timeoutIdMap = {};
addToCart();

function addedMessage(productId) {
  const buttonElement = document.querySelector(`.js-added-${productId}`);

  if (buttonElement) {
    buttonElement.classList.add("is-added");

    // Clear any previous timeout for this productId
    if (timeoutIdMap[productId]) {
      clearTimeout(timeoutIdMap[productId]);
    }

    // Set new timeout to remove the class after 2 seconds
    timeoutIdMap[productId] = setTimeout(() => {
      buttonElement.classList.remove("is-added");
    }, 2000);
  }
}

function addToCart() {
  document.querySelectorAll(".js-add-to-cart").forEach((addButton) => {
    // Add a click event listener to each button
    addButton.addEventListener("click", () => {
      // Get the product name from the button's data attribute
      const { productId } = addButton.dataset;

      // We'll use this variable to check if the item already exists in the cart
      let matchingItem;

      // Loop through the cart.push below to find if the product is already added
      cart.forEach((item) => {
        if (productId === item.productId) {
          // If we find a match, store it in matchingItem
          matchingItem = item;
        }
      });

      let cartSelectorValue = document.querySelector(
        `.js-quantity-selector-${productId}`
      ).value;
      let quantity = Number(cartSelectorValue);

      // If the item is already in the cart, increase its quantity by cartSelectorValue
      if (matchingItem) {
        matchingItem.quantity += quantity;
      }
      // If the item is not in the cart, add it with quantity set to 1
      else {
        // cart.push({ productId: productId, quantity: cartSelectorValue });
        cart.push({ productId, quantity });
      }

      // Calculate the total quantity of all items in the cart
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

      addedMessage(productId);
    });
  });
}
*/
