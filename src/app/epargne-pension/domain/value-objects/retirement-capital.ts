export class RetirementCapital {
  constructor(private readonly _amount: number) {
    if (_amount < 0) {
      throw new Error("Retirement capital cannot be negative.");
    }
  }

  get amount(): number {
    return this._amount;
  }

  equals(other: RetirementCapital): boolean {
    return this._amount === other.amount;
  }
}
