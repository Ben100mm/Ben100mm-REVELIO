const { v4: uuidv4 } = require('uuid');

class Transaction {
  constructor(productId, buyerId, amount, creatorId) {
    this.id = uuidv4();
    this.productId = productId;
    this.buyerId = buyerId;
    this.amount = amount;
    this.creatorId = creatorId;
    this.createdAt = new Date();
    this.status = 'completed';
    this.platformFee = amount * 0.05; // 5% platform fee
    this.creatorEarning = amount * 0.95; // 95% goes to creator
  }

  getNetAmount() {
    return this.creatorEarning;
  }

  getPlatformFee() {
    return this.platformFee;
  }
}

module.exports = Transaction;
