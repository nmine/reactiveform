export class TaxBenefit {
  constructor(
    private readonly _amount: number,
    private readonly _rate: number
  ) {
    if (_amount < 0) throw new Error("Tax benefit cannot be negative.");
    if (_rate !== 0.25 && _rate !== 0.30) throw new Error("Rate must be 25% or 30%.");
  }

  get amount(): number {
    return this._amount;
  }

  get rate(): number {
    return this._rate;
  }

  equals(other: TaxBenefit): boolean {
    return this.amount === other.amount && this.rate === other.rate;
  }
}

