const Transaction = require('../models/Transaction');

class TransactionService {
  constructor() {
    this.transactions = new Map();
  }

  createTransaction(productId, buyerId, amount, creatorId) {
    const transaction = new Transaction(productId, buyerId, amount, creatorId);
    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  getTransaction(id) {
    return this.transactions.get(id);
  }

  getAllTransactions() {
    return Array.from(this.transactions.values());
  }

  getTransactionsByCreator(creatorId) {
    return Array.from(this.transactions.values()).filter(
      transaction => transaction.creatorId === creatorId
    );
  }

  getTransactionsByBuyer(buyerId) {
    return Array.from(this.transactions.values()).filter(
      transaction => transaction.buyerId === buyerId
    );
  }

  getTotalRevenue() {
    return Array.from(this.transactions.values()).reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
  }

  getTotalPlatformFees() {
    return Array.from(this.transactions.values()).reduce(
      (sum, transaction) => sum + transaction.getPlatformFee(),
      0
    );
  }
}

module.exports = TransactionService;
