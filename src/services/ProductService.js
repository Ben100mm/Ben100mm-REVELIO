const Product = require('../models/Product');

class ProductService {
  constructor() {
    this.products = new Map();
  }

  createProduct(title, description, price, creatorId) {
    const product = new Product(title, description, price, creatorId);
    this.products.set(product.id, product);
    return product;
  }

  getProduct(id) {
    const product = this.products.get(id);
    if (product) {
      product.incrementViews();
    }
    return product;
  }

  getAllProducts() {
    return Array.from(this.products.values());
  }

  getProductsByCreator(creatorId) {
    return Array.from(this.products.values()).filter(
      product => product.creatorId === creatorId
    );
  }

  updateProduct(id, updates) {
    const product = this.products.get(id);
    if (!product) return null;

    if (updates.title) product.title = updates.title;
    if (updates.description !== undefined) product.description = updates.description;
    if (updates.price !== undefined) product.price = updates.price;

    return product;
  }

  deleteProduct(id) {
    return this.products.delete(id);
  }

  addReview(productId, rating, comment, userId) {
    const product = this.products.get(productId);
    if (!product) return null;

    product.addReview(rating, comment, userId);
    return product;
  }
}

module.exports = ProductService;
