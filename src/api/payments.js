const express = require('express');

function createPaymentRoutes(paymentService) {
  const router = express.Router();

  router.post('/distribute', (req, res) => {
    try {
      const distributions = paymentService.distributePayments();
      res.json({
        success: true,
        distributions,
        totalDistributed: distributions.reduce((sum, d) => sum + d.amount, 0)
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/creator/:id', (req, res) => {
    try {
      const earnings = paymentService.getCreatorEarnings(req.params.id);
      
      if (!earnings) {
        return res.status(404).json({ error: 'Creator not found' });
      }

      res.json(earnings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/impact-bonus', (req, res) => {
    try {
      const { revenuePool } = req.body;
      
      if (!revenuePool || revenuePool <= 0) {
        return res.status(400).json({ 
          error: 'Valid revenue pool amount is required' 
        });
      }

      const bonuses = paymentService.calculateImpactBasedBonus(revenuePool);
      res.json({
        success: true,
        bonuses,
        totalPool: revenuePool
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}

module.exports = createPaymentRoutes;
