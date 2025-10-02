const Product = require('../src/models/Product');

describe('Product Model', () => {
  test('should create a new product', () => {
    const product = new Product('Test Product', 'Description', 99.99, 'creator-1');
    
    expect(product.title).toBe('Test Product');
    expect(product.description).toBe('Description');
    expect(product.price).toBe(99.99);
    expect(product.creatorId).toBe('creator-1');
    expect(product.views).toBe(0);
    expect(product.sales).toBe(0);
    expect(product.rating).toBe(0);
  });

  test('should increment views', () => {
    const product = new Product('Test Product', 'Description', 99.99, 'creator-1');
    product.incrementViews();
    product.incrementViews();
    
    expect(product.views).toBe(2);
  });

  test('should increment sales', () => {
    const product = new Product('Test Product', 'Description', 99.99, 'creator-1');
    product.incrementSales();
    
    expect(product.sales).toBe(1);
  });

  test('should add review and update rating', () => {
    const product = new Product('Test Product', 'Description', 99.99, 'creator-1');
    product.addReview(5, 'Great product!', 'user-1');
    
    expect(product.reviews.length).toBe(1);
    expect(product.rating).toBe(5);
  });

  test('should calculate average rating from multiple reviews', () => {
    const product = new Product('Test Product', 'Description', 99.99, 'creator-1');
    product.addReview(5, 'Great!', 'user-1');
    product.addReview(4, 'Good!', 'user-2');
    product.addReview(3, 'OK', 'user-3');
    
    expect(product.reviews.length).toBe(3);
    expect(product.rating).toBe(4); // (5+4+3)/3 = 4
  });
});
