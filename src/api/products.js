const express = require('express');

function createProductRoutes(productService, creatorService) {
  const router = express.Router();

  router.post('/', (req, res) => {
    try {
      const { title, description, price, creatorId } = req.body;
      
      if (!title || !price || !creatorId) {
        return res.status(400).json({ 
          error: 'Title, price, and creatorId are required' 
        });
      }

      const creator = creatorService.getCreator(creatorId);
      if (!creator) {
        return res.status(404).json({ error: 'Creator not found' });
      }

      const product = productService.createProduct(title, description, price, creatorId);
      creator.addProduct(product.id);
      
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/', (req, res) => {
    try {
      const products = productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id', (req, res) => {
    try {
      const product = productService.getProduct(req.params.id);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/:id', (req, res) => {
    try {
      const product = productService.updateProduct(req.params.id, req.body);
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', (req, res) => {
    try {
      const deleted = productService.deleteProduct(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/:id/reviews', (req, res) => {
    try {
      const { rating, comment, userId } = req.body;
      
      if (!rating || !userId) {
        return res.status(400).json({ 
          error: 'Rating and userId are required' 
        });
      }

      const product = productService.addReview(
        req.params.id, 
        rating, 
        comment, 
        userId
      );
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = createProductRoutes;
