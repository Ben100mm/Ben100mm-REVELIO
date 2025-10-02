class PaymentService {
  constructor(creatorService, transactionService) {
    this.creatorService = creatorService;
    this.transactionService = transactionService;
  }

  distributePayments() {
    const creators = this.creatorService.getAllCreators();
    const distributions = [];

    creators.forEach(creator => {
      const transactions = this.transactionService.getTransactionsByCreator(creator.id);
      const totalEarnings = transactions.reduce(
        (sum, transaction) => sum + transaction.getNetAmount(),
        0
      );

      creator.addEarnings(totalEarnings);

      distributions.push({
        creatorId: creator.id,
        creatorName: creator.name,
        amount: totalEarnings,
        transactionCount: transactions.length,
        impactScore: creator.impactScore,
        distributedAt: new Date()
      });
    });

    return distributions;
  }

  getCreatorEarnings(creatorId) {
    const creator = this.creatorService.getCreator(creatorId);
    if (!creator) return null;

    const transactions = this.transactionService.getTransactionsByCreator(creatorId);
    const totalEarnings = transactions.reduce(
      (sum, transaction) => sum + transaction.getNetAmount(),
      0
    );

    return {
      creatorId: creator.id,
      creatorName: creator.name,
      totalEarnings: creator.totalEarnings,
      pendingEarnings: totalEarnings,
      impactScore: creator.impactScore,
      transactionCount: transactions.length
    };
  }

  calculateImpactBasedBonus(revenuePool) {
    const creators = this.creatorService.getAllCreators();
    const totalImpact = creators.reduce((sum, c) => sum + c.impactScore, 0);

    if (totalImpact === 0) return [];

    return creators.map(creator => {
      const bonusAmount = (creator.impactScore / totalImpact) * revenuePool;
      return {
        creatorId: creator.id,
        creatorName: creator.name,
        bonusAmount,
        impactScore: creator.impactScore,
        impactPercentage: (creator.impactScore / totalImpact) * 100
      };
    });
  }
}

module.exports = PaymentService;
