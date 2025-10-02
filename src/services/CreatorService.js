const Creator = require('../models/Creator');

class CreatorService {
  constructor() {
    this.creators = new Map();
  }

  createCreator(name, email, bio) {
    const creator = new Creator(name, email, bio);
    this.creators.set(creator.id, creator);
    return creator;
  }

  getCreator(id) {
    return this.creators.get(id);
  }

  getAllCreators() {
    return Array.from(this.creators.values());
  }

  updateCreator(id, updates) {
    const creator = this.creators.get(id);
    if (!creator) return null;

    if (updates.name) creator.name = updates.name;
    if (updates.email) creator.email = updates.email;
    if (updates.bio !== undefined) creator.bio = updates.bio;

    return creator;
  }

  deleteCreator(id) {
    return this.creators.delete(id);
  }

  calculateImpactScore(creatorId, products, transactions) {
    const creator = this.creators.get(creatorId);
    if (!creator) return 0;

    const creatorProducts = products.filter(p => p.creatorId === creatorId);
    const creatorTransactions = transactions.filter(t => t.creatorId === creatorId);

    const totalSales = creatorTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalViews = creatorProducts.reduce((sum, p) => sum + p.views, 0);
    const avgRating = creatorProducts.length > 0 
      ? creatorProducts.reduce((sum, p) => sum + p.rating, 0) / creatorProducts.length 
      : 0;

    // Impact score calculation: weighted average of sales, views, and ratings
    const impactScore = (totalSales * 0.5) + (totalViews * 0.3) + (avgRating * 100 * 0.2);
    
    creator.updateImpactScore(impactScore);
    return impactScore;
  }
}

module.exports = CreatorService;
