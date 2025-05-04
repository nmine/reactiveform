import { Simulation } from '../value-objects/simulation';
import { RetirementCapital } from '../value-objects/retirement-capital';

export class RetirementCapitalCalculatorService {
  static calculate(simulation: Simulation): RetirementCapital {
    const amount = simulation.investmentAmount.amount;
    const years = simulation.age.yearsUntilRetirement;
    const capital = amount * Math.pow(1.04, years);
    return new RetirementCapital(capital);
  }
}
