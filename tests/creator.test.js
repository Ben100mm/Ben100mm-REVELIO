const Creator = require('../src/models/Creator');

describe('Creator Model', () => {
  test('should create a new creator', () => {
    const creator = new Creator('John Doe', 'john@example.com', 'Test bio');
    
    expect(creator.name).toBe('John Doe');
    expect(creator.email).toBe('john@example.com');
    expect(creator.bio).toBe('Test bio');
    expect(creator.impactScore).toBe(0);
    expect(creator.totalEarnings).toBe(0);
    expect(creator.products).toEqual([]);
  });

  test('should update impact score', () => {
    const creator = new Creator('John Doe', 'john@example.com');
    creator.updateImpactScore(100);
    
    expect(creator.impactScore).toBe(100);
  });

  test('should add earnings', () => {
    const creator = new Creator('John Doe', 'john@example.com');
    creator.addEarnings(50);
    creator.addEarnings(30);
    
    expect(creator.totalEarnings).toBe(80);
  });

  test('should add products', () => {
    const creator = new Creator('John Doe', 'john@example.com');
    creator.addProduct('product-1');
    creator.addProduct('product-2');
    
    expect(creator.products).toEqual(['product-1', 'product-2']);
  });

  test('should not add duplicate products', () => {
    const creator = new Creator('John Doe', 'john@example.com');
    creator.addProduct('product-1');
    creator.addProduct('product-1');
    
    expect(creator.products).toEqual(['product-1']);
  });
});
