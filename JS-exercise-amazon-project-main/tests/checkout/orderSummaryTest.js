import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
//import { cart, loadFromStorage } from "../../data/cart.js";
import { cart } from "../../data/cart-class.js";

describe("test suite: renderOrderSummary", () => {
  // Before each test, this chunk of code runs first
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const three = "3";

  // We only need to load the product once for all of our test
  // beforeAll((done) => {
  //   loadProductsFetch().then(() => {
  //     done();
  //   });
  // });

  beforeEach(() => {
    spyOn(localStorage, "setItem");

    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
    <div class="js-checkout-header"></div>`;

    // spyOn(localStorage, "getItem").and.callFake(() => {
    //   return JSON.stringify([
    //     {
    //       productId: productId1,
    //       quantity: 2,
    //       deliveryOptionId: three,
    //     },
    //     {
    //       productId: productId2,
    //       quantity: 1,
    //       deliveryOptionId: "2",
    //     },
    //   ]);
    // });
    // loadFromStorage();
    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];

    renderOrderSummary();
  });

  // After each test, this chunk of code runs last
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });

  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual("$10.90");
  });

  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });

  it("updating the delivery option", () => {
    document
      .querySelector(`.js-product-delivery-${productId1}-${three}`)
      .click();

    expect(
      document.querySelector(
        `.js-product-delivery-input-${productId1}-${three}`
      ).checked
    ).toBe(true);

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual(three);

    expect(document.querySelector(".js-payment-shipping").innerText).toEqual(
      "$14.98"
    );

    expect(document.querySelector(".js-payment-total").innerText).toEqual(
      "$63.50"
    );
  });
});
