const express = require('express');

function createCreatorRoutes(creatorService, productService, transactionService) {
  const router = express.Router();

  router.post('/', (req, res) => {
    try {
      const { name, email, bio } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }

      const creator = creatorService.createCreator(name, email, bio);
      res.status(201).json(creator);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/', (req, res) => {
    try {
      const creators = creatorService.getAllCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id', (req, res) => {
    try {
      const creator = creatorService.getCreator(req.params.id);
      
      if (!creator) {
        return res.status(404).json({ error: 'Creator not found' });
      }

      res.json(creator);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/:id', (req, res) => {
    try {
      const creator = creatorService.updateCreator(req.params.id, req.body);
      
      if (!creator) {
        return res.status(404).json({ error: 'Creator not found' });
      }

      res.json(creator);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', (req, res) => {
    try {
      const deleted = creatorService.deleteCreator(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Creator not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id/products', (req, res) => {
    try {
      const products = productService.getProductsByCreator(req.params.id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id/impact', (req, res) => {
    try {
      const products = productService.getAllProducts();
      const transactions = transactionService.getAllTransactions();
      const impactScore = creatorService.calculateImpactScore(
        req.params.id, 
        products, 
        transactions
      );
      
      res.json({ 
        creatorId: req.params.id, 
        impactScore 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = createCreatorRoutes;
