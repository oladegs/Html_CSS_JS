export const cart = [];

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
