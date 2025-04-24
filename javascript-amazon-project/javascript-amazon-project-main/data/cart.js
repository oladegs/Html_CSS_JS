export let cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addToCart(productId) {
  // We'll use this variable to check if the item already exists in the cart
  let matchingItem;

  // Loop through the cart.push below to find if the product is already added
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      // If we find a match, store it in matchingItem
      matchingItem = cartItem;
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
  console.log(cart);
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
}
