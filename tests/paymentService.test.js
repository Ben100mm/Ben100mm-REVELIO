const PaymentService = require('../src/services/PaymentService');
const CreatorService = require('../src/services/CreatorService');
const TransactionService = require('../src/services/TransactionService');

describe('PaymentService', () => {
  let paymentService;
  let creatorService;
  let transactionService;

  beforeEach(() => {
    creatorService = new CreatorService();
    transactionService = new TransactionService();
    paymentService = new PaymentService(creatorService, transactionService);
  });

  test('should distribute payments to creators', () => {
    const creator = creatorService.createCreator('John Doe', 'john@example.com');
    transactionService.createTransaction('product-1', 'buyer-1', 100, creator.id);
    
    const distributions = paymentService.distributePayments();
    
    expect(distributions.length).toBe(1);
    expect(distributions[0].creatorId).toBe(creator.id);
    expect(distributions[0].amount).toBe(95); // 95% of 100
  });

  test('should get creator earnings', () => {
    const creator = creatorService.createCreator('John Doe', 'john@example.com');
    transactionService.createTransaction('product-1', 'buyer-1', 100, creator.id);
    
    const earnings = paymentService.getCreatorEarnings(creator.id);
    
    expect(earnings.creatorId).toBe(creator.id);
    expect(earnings.pendingEarnings).toBe(95);
  });

  test('should calculate impact-based bonus', () => {
    const creator1 = creatorService.createCreator('Creator 1', 'c1@example.com');
    const creator2 = creatorService.createCreator('Creator 2', 'c2@example.com');
    
    creator1.updateImpactScore(100);
    creator2.updateImpactScore(50);
    
    const bonuses = paymentService.calculateImpactBasedBonus(150);
    
    expect(bonuses.length).toBe(2);
    expect(bonuses[0].bonusAmount).toBe(100); // 100/150 * 150
    expect(bonuses[1].bonusAmount).toBe(50);  // 50/150 * 150
  });

  test('should handle zero impact score', () => {
    creatorService.createCreator('Creator 1', 'c1@example.com');
    
    const bonuses = paymentService.calculateImpactBasedBonus(100);
    
    expect(bonuses.length).toBe(0);
  });
});
