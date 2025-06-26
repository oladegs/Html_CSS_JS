import {
  Product,
  Clothing,
  Appliance,
  loadProductsFetch,
} from "../../data/products.js";

describe("test suite: Product Class", () => {
  let product;

  // We only need to load the product once for all of our test
  beforeAll(async () => {
    await loadProductsFetch();
  });

  beforeEach(() => {
    product = new Product({
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    });
  });

  it("has the correct properties", () => {
    // Note: you don't have to test all the properties.
    // You can just pick a few to test.
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.image).toEqual(
      "images/products/athletic-cotton-socks-6-pairs.jpg"
    );
    expect(product.name).toEqual(
      "Black and Gray Athletic Cotton Socks - 6 Pairs"
    );
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 87,
    });
    expect(product.priceCents).toEqual(1090);
  });

  it("gets the stars url", () => {
    expect(product.getStarsUrl()).toEqual("images/ratings/rating-45.png");
  });

  it("gets the price", () => {
    expect(product.getPrice()).toEqual("$10.90");
  });

  it("does not display any extra info", () => {
    expect(product.extraInfoHTML()).toEqual("");
  });
});

describe("test suite: Clothing Class", () => {
  let clothing;

  beforeEach(() => {
    clothing = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56,
      },
      priceCents: 799,
      keywords: ["tshirts", "apparel", "mens"],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });

  it("has the correct properties", () => {
    // Note: you don't have to test all the properties.
    // You can just pick a few to test.
    expect(clothing.id).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(clothing.image).toEqual(
      "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"
    );
    expect(clothing.name).toEqual("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(clothing.rating).toEqual({
      stars: 4.5,
      count: 56,
    });
    expect(clothing.priceCents).toEqual(799);
  });

  it("gets the stars url", () => {
    expect(clothing.getStarsUrl()).toEqual("images/ratings/rating-45.png");
  });

  it("gets the price", () => {
    expect(clothing.getPrice()).toEqual("$7.99");
  });

  it("does displays an extra info", () => {
    expect(clothing.extraInfoHTML()).toEqual(
      '<a href="images/clothing-size-chart.png" target="_blank">Size chart</a>'
    );
  });
});

describe("test suite: Appliance Class", () => {
  let appliance;

  beforeEach(() => {
    appliance = new Appliance({
      id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
      image: "images/products/electric-glass-and-steel-hot-water-kettle.webp",
      name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
      rating: {
        stars: 5,
        count: 846,
      },
      priceCents: 3074,
      keywords: ["water boiler", "appliances", "kitchen"],
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
    });
  });

  it("has the correct properties", () => {
    // Note: you don't have to test all the properties.
    // You can just pick a few to test.
    expect(appliance.id).toEqual("c2a82c5e-aff4-435f-9975-517cfaba2ece");
    expect(appliance.image).toEqual(
      "images/products/electric-glass-and-steel-hot-water-kettle.webp"
    );
    expect(appliance.name).toEqual(
      "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter"
    );
    expect(appliance.rating).toEqual({
      stars: 5,
      count: 846,
    });
    expect(appliance.priceCents).toEqual(3074);
  });

  it("gets the stars url", () => {
    expect(appliance.getStarsUrl()).toEqual("images/ratings/rating-50.png");
  });

  it("gets the price", () => {
    expect(appliance.getPrice()).toEqual("$30.74");
  });

  it("does displays an extra info", () => {
    '<a href="images/appliance-instructions.png" target="_blank">Instructions</a>';
    '<a href="images/appliance-warranty.png" target="_blank">Warranty</a>';
  });
});
