// import {
//   addToCart,
//   cart,
//   removeFromCart,
//   loadFromStorage,
//   updateDeliveryOption,
// } from "../../data/cart-class.js";

import { cart } from "../../data/cart-class.js";
import { loadProductsFetch } from "../../data/products.js";

describe("test suite: addToCart", () => {
  // We only need to load the product once for all of our test
  beforeAll(async () => {
    await loadProductsFetch();
  });

  // BeforeEach each test, this chunk of code runs first
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("adds an existing product to the cart", () => {
    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //       quantity: 1,
    //       deliveryOptionId: "1",
    //     },
    //   ]);
    // });
    // loadFromStorage();
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1); // ✅ pass quantity
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
  });

  it("adds a new product to the cart", () => {
    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([]);
    // });

    // loadFromStorage();
    cart.cartItems = [];

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1); // ✅ pass quantity
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });

  it("adds multiple quantity of a product to the cart", () => {
    // spyOn(localStorage, "getItem").and.callFake(() => JSON.stringify([]));

    // loadFromStorage();
    cart.cartItems = [];

    cart.addToCart("abc-123", 3);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].quantity).toEqual(3);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "abc-123",
          quantity: 3,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("test suite: removeCart", () => {
  // BeforeEach each test, this chunk of code runs first
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("remove a productId that's in the cart", () => {
    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //       quantity: 1,
    //       deliveryOptionId: "1",
    //     },
    //   ]);
    // });

    // loadFromStorage();

    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([])
    );
  });

  it("remove a productId that's not in the cart", () => {
    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //       quantity: 1,
    //       deliveryOptionId: "1",
    //     },
    //   ]);
    // });

    // loadFromStorage();

    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.removeFromCart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("test suite: updateDeliveryOption", () => {
  // BeforeEach each test, this chunk of code runs first
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const two = "2";

  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("updates delivery option", () => {
    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: productId1,
    //       quantity: 1,
    //       deliveryOptionId: "1",
    //     },
    //   ]);
    // });
    // loadFromStorage();

    cart.cartItems = [
      {
        productId: productId1,
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.updateDeliveryOption(productId1, two);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual(two);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: two,
        },
      ])
    );
  });

  it("does nothing if the product is not in the cart", () => {
    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //       quantity: 1,
    //       deliveryOptionId: "1",
    //     },
    //   ]);
    // });
    // loadFromStorage();
    cart.cartItems = [
      {
        productId: productId1,
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.updateDeliveryOption("does-not-exist", "3");
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it("does nothing if the delivery option does not exist", () => {
    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //       quantity: 1,
    //       deliveryOptionId: "1",
    //     },
    //   ]);
    // });
    // loadFromStorage();
    cart.cartItems = [
      {
        productId: productId1,
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.updateDeliveryOption(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "does-not-exist"
    );

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
