const Product = require("./model/product");

class FakeDb {
  constructor() {
    this.products = [
      {
        coverImage: "./assets/img/phone-cover.jpg",
        name: "Phone XL",
        price: 799,
        description: "A large phone with one of the best screens",
        heading1: "heading1",
        heading2: "heading2",
        heading3: "heading3",
        headingtext1: "heading_text1",
        headingtext2: "heading_text2",
        headingtext3: "heading_text3",
      },
      {
        coverImage: "./assets/img/phone-cover.jpg",
        name: "Phone Mini",
        price: 699,
        description: "A great phone with one of the best cameras",
        heading1: "heading1",
        heading2: "heading2",
        heading3: "heading3",
        headingtext1: "heading_text1",
        headingtext2: "heading_text2",
        headingtext3: "heading_text3",
      },
      {
        coverImage: "./assets/img/phone-cover.jpg",
        name: "Phone Standard",
        price: 299,
        description: "",
        heading1: "heading1",
        heading2: "heading2",
        heading3: "heading3",
        headingtext1: "heading_text1",
        headingtext2: "heading_text2",
        headingtext3: "heading_text3",
      },
      {
        coverImage: "./assets/img/phone-cover.jpg",
        name: "Phone Special",
        price: 999,
        description: "Special",
        heading1: "heading1",
        heading2: "heading2",
        heading3: "heading3",
        headingtext1: "heading_text1",
        headingtext2: "heading_text2",
        headingtext3: "heading_text3",
      },
    ];
  }

  async initDb() {
    await this.cleanDb();
    this.pushProductsToDb();
  }

  async cleanDb() {
    await Product.deleteMany({});
  }

  pushProductsToDb() {
    this.products.forEach((product) => {
      const newProduct = new Product(product);
      newProduct.save();
    });
  }

  seeDb() {
    this.pushProductsToDb();
  }
}

module.exports = FakeDb;
