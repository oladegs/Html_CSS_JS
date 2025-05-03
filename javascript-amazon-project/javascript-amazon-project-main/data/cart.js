export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: "1",
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "2",
    },
  ];
}

// Whenever we update the cart, we need to save it to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // "If there is a matching item in the cart and the new quantity is a number between 1 and 999, then update the cart quantity to the new number."
  if (matchingItem && newQuantity >= 0 && newQuantity < 1000) {
    matchingItem.quantity = newQuantity;
  } else {
    window.alert(
      `Invalid quantity: ${newQuantity}. It must be between 1 and 999.`
    );
  }

  saveToStorage();
}

export function calculateCartQuantity() {
  // Calculate the total quantity of all items in the cart
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function addToCart(productId) {
  // We'll use this variable to check if the item already exists in the cart
  let matchingItem;

  // Loop through the cart.push below to find if the product is already added
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      // If we find a match, store it in matchingItem as an object
      matchingItem = cartItem;
    }
  });

  // If the item is already in the cart, increase its quantity by 1
  if (matchingItem) {
    matchingItem.quantity++;
  }
  // If the item is not in the cart, add it with quantity set to 1
  else {
    cart.push({ productId: productId, quantity: 1, deliveryOptionId: "1" });
  }
  saveToStorage();
}

/*
1. Create a new array 
2. Loop through the cart 
3. Add each product to the new array, except for this productId
*/
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
- Loop through the cart and find the product 
- Update the deliveryOptionId of the product 
*/
export function updateDeliveryOption(productId, deliveryOptionId) {
  // We'll use this variable to check if the item already exists in the cart
  let matchingItem;

  // Loop through the cart.push below to find if the product is already added
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      // If we find a match, store it in matchingItem as an object
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}
