const { v4: uuidv4 } = require('uuid');

class Creator {
  constructor(name, email, bio = '') {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.joinedAt = new Date();
    this.impactScore = 0;
    this.totalEarnings = 0;
    this.products = [];
  }

  updateImpactScore(score) {
    this.impactScore = score;
  }

  addEarnings(amount) {
    this.totalEarnings += amount;
  }

  addProduct(productId) {
    if (!this.products.includes(productId)) {
      this.products.push(productId);
    }
  }
}

module.exports = Creator;
