const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const CreatorService = require('./services/CreatorService');
const ProductService = require('./services/ProductService');
const TransactionService = require('./services/TransactionService');
const PaymentService = require('./services/PaymentService');

const createCreatorRoutes = require('./api/creators');
const createProductRoutes = require('./api/products');
const createTransactionRoutes = require('./api/transactions');
const createPaymentRoutes = require('./api/payments');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Initialize services
const creatorService = new CreatorService();
const productService = new ProductService();
const transactionService = new TransactionService();
const paymentService = new PaymentService(creatorService, transactionService);

// API Routes
app.use('/api/creators', createCreatorRoutes(creatorService, productService, transactionService));
app.use('/api/products', createProductRoutes(productService, creatorService));
app.use('/api/transactions', createTransactionRoutes(transactionService, productService, creatorService));
app.use('/api/payments', createPaymentRoutes(paymentService));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Revelio API is running',
    timestamp: new Date().toISOString()
  });
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  const creators = creatorService.getAllCreators();
  const products = productService.getAllProducts();
  const transactions = transactionService.getAllTransactions();

  res.json({
    totalCreators: creators.length,
    totalProducts: products.length,
    totalTransactions: transactions.length,
    totalRevenue: transactionService.getTotalRevenue(),
    platformFees: transactionService.getTotalPlatformFees()
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Revelio is running!`);
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log(`📊 API: http://localhost:${PORT}/api`);
    console.log(`💰 Creator-powered marketplace where every creator gets paid for impact\n`);
  });
}

module.exports = app;
