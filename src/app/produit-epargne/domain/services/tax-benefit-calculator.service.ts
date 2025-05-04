import { Simulation } from '../value-objects/simulation';
import { TaxBenefit } from '../value-objects/tax-benefit';

export class TaxBenefitCalculatorService {
  static calculate(simulation: Simulation): TaxBenefit {
    const amount = simulation.investmentAmount.amount;
    const rate = simulation.investmentAmount.deductionRate;
    const years = simulation.age.yearsUntilRetirement;
    const total = amount * 12 * rate * years;
    return new TaxBenefit(total, rate);
  }
}
