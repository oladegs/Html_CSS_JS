// Create a fn that saves objects so it is reusable
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    // Load from storage - loadFromStorage: function ()  {}
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
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
    },

    // Save to Storage - saveToStorage: function ()  {}
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    // Add To Cart - addToCart: function(productId) {}
    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
        });
      }

      this.saveToStorage();
    },

    // Remove From Cart - removeFromCart: function(productId) {}
    removeFromCart(productId) {
      const newCart = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;

      this.saveToStorage();
    },

    // Updating Delivery-Option - updateDeliveryOption: function(productId, deliveryOptionId)
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");

cart.loadFromStorage();

// addToCart was saved inside the cart Object
// cart.addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
