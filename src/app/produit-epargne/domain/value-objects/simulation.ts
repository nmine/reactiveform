import {InvestmentAmount} from './investment-amount';
import {Age} from './age';
import {Branch} from './branch';

export class Simulation {
  constructor(
    public readonly age: Age,
    public readonly investmentAmount: InvestmentAmount,
    public readonly branch: Branch,
    public readonly specialRegime?: boolean
  ) {}

  equals(other: Simulation): boolean {
    return (
      this.age.valueInYears === other.age.valueInYears &&
      this.investmentAmount.amount === other.investmentAmount.amount &&
      this.branch.code === other.branch.code &&
      this.specialRegime === other.specialRegime
    );
  }
}
