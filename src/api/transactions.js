const express = require('express');

function createTransactionRoutes(transactionService, productService, creatorService) {
  const router = express.Router();

  router.post('/', (req, res) => {
    try {
      const { productId, buyerId } = req.body;
      
      if (!productId || !buyerId) {
        return res.status(400).json({ 
          error: 'ProductId and buyerId are required' 
        });
      }

      const product = productService.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const transaction = transactionService.createTransaction(
        productId,
        buyerId,
        product.price,
        product.creatorId
      );

      product.incrementSales();

      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/', (req, res) => {
    try {
      const transactions = transactionService.getAllTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id', (req, res) => {
    try {
      const transaction = transactionService.getTransaction(req.params.id);
      
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/buyer/:buyerId', (req, res) => {
    try {
      const transactions = transactionService.getTransactionsByBuyer(req.params.buyerId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/creator/:creatorId', (req, res) => {
    try {
      const transactions = transactionService.getTransactionsByCreator(req.params.creatorId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = createTransactionRoutes;
