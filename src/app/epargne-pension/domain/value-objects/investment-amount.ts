export class InvestmentAmount {
  constructor(private readonly value: number) {
    if (value < 0 || value > 1350) {
      throw new Error("Investment must be between €0 and €1350.");
    }
  }

  get amount(): number {
    return this.value;
  }

  get deductionRate(): number {
    return this.value > 1050 ? 0.25 : 0.30;
  }
}
