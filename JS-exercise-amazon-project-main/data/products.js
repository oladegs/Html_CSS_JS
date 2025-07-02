import { formatCurrency } from "../scripts/utils/money.js";

export let products = [];

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  // Converting an object into a class and then copy over the properties to "this" class because classes have extra features like adding methods , and make properties / methods private
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return "";
  }
}

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
  }
}

export class Appliance extends Product {
  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    // super.extraInfoHTML();
    return `<a href="${this.instructionsLink}" target="_blank">Instructions</a>
    <a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
  }
}

export function loadProductsFetch() {
  const promise = fetch("https://supersimplebackend.dev/products")
    .then((response) => {
      return response.json();
    })
    .then((productsData) => {
      products = productsData.map((productDetails) => {
        //.map creates a new array and whatever we return from this inner fn is going to go inside that new array
        if (productDetails.type === "clothing") {
          return new Clothing(productDetails);
        } else if (productDetails.type === "appliance") {
          return new Appliance(productDetails);
        }
        return new Product(productDetails);
      });
      console.log("load products");
    })
    .catch((error) => {
      console.log("unexpected error. Please try again later");
    });
  return promise;
}

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  /* When you call loadProducts, it sets up a request to get product data from a    server.
     When the server responds, the JSON text is converted into real JavaScript objects.
     Depending on the product type, it makes either Product or Clothing objects.
     After everything is loaded and processed, it runs the function you gave it(Callback).
     We use a callback to wait for a response
  */
  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      //.map creates a new array and whatever we return from this inner fn is going to go inside that new array
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

    console.log("load products");
    fun();
  });

  xhr.addEventListener("error", (error) => {
    // error handling
    console.log("unexpected error. Please try again later");
  });

  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}
