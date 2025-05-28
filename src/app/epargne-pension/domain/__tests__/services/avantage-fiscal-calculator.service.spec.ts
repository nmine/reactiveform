it('should calculate 30% tax benefit for <= 1050 €', () => {
  // const sim = new Simulation(new Age(40), new InvestmentAmount(1000), new Branch('21'));
  // const taxBenefit = AvantageFiscalCalculatorService.calculate(sim);
  //
  // expect(taxBenefit.rate).toBe(0.3);
  // expect(taxBenefit.amount).toBeCloseTo(1000 * 12 * 0.3 * 25);
});

it('should calculate 25% tax benefit for > 1050 €', () => {
  // const sim = new Simulation(new Age(50), new InvestmentAmount(1200), new Branch('23'));
  // const taxBenefit = AvantageFiscalCalculatorService.calculate(sim);
  //
  // expect(taxBenefit.rate).toBe(0.25);
  // expect(taxBenefit.amount).toBeCloseTo(1200 * 12 * 0.25 * 15);
});
