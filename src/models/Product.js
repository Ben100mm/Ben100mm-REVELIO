const { v4: uuidv4 } = require('uuid');

class Product {
  constructor(title, description, price, creatorId) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.price = price;
    this.creatorId = creatorId;
    this.createdAt = new Date();
    this.views = 0;
    this.sales = 0;
    this.rating = 0;
    this.reviews = [];
  }

  incrementViews() {
    this.views++;
  }

  incrementSales() {
    this.sales++;
  }

  addReview(rating, comment, userId) {
    this.reviews.push({
      id: uuidv4(),
      rating,
      comment,
      userId,
      createdAt: new Date()
    });
    this.updateRating();
  }

  updateRating() {
    if (this.reviews.length === 0) {
      this.rating = 0;
      return;
    }
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = sum / this.reviews.length;
  }
}

module.exports = Product;
