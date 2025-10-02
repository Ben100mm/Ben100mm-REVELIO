const CreatorService = require('../src/services/CreatorService');

describe('CreatorService', () => {
  let service;

  beforeEach(() => {
    service = new CreatorService();
  });

  test('should create a creator', () => {
    const creator = service.createCreator('John Doe', 'john@example.com', 'Bio');
    
    expect(creator.name).toBe('John Doe');
    expect(creator.email).toBe('john@example.com');
    expect(service.getAllCreators().length).toBe(1);
  });

  test('should get creator by id', () => {
    const creator = service.createCreator('John Doe', 'john@example.com');
    const found = service.getCreator(creator.id);
    
    expect(found).toBe(creator);
  });

  test('should update creator', () => {
    const creator = service.createCreator('John Doe', 'john@example.com');
    const updated = service.updateCreator(creator.id, { name: 'Jane Doe' });
    
    expect(updated.name).toBe('Jane Doe');
  });

  test('should delete creator', () => {
    const creator = service.createCreator('John Doe', 'john@example.com');
    const deleted = service.deleteCreator(creator.id);
    
    expect(deleted).toBe(true);
    expect(service.getAllCreators().length).toBe(0);
  });

  test('should calculate impact score', () => {
    const creator = service.createCreator('John Doe', 'john@example.com');
    const products = [
      { creatorId: creator.id, views: 100, rating: 4.5 }
    ];
    const transactions = [
      { creatorId: creator.id, amount: 100 }
    ];
    
    const score = service.calculateImpactScore(creator.id, products, transactions);
    
    expect(score).toBeGreaterThan(0);
    expect(creator.impactScore).toBe(score);
  });
});
