class Cart {
  cartItems; //public property
  #localStorageKey; //private property

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  // Load from storage - loadFromStorage: function ()  {}
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

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
  }

  // Save to Storage - saveToStorage: function ()  {}
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

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
  }

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
  }

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
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");

//cart.#localStorageKey = "test";
console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
