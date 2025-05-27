import { Simulation } from '../../value-objects/simulation.epargne-pension';
import { Age } from '../../value-objects/age';
import { InvestmentAmount } from '../../value-objects/investment-amount';
import { Branch } from '../../value-objects/branch';
import { CapitalFinalCalculatorService } from '../../services/retirement-capital-calculator.service';

it('should estimate retirement capital with 4% annual growth', () => {
  const sim = new Simulation(new Age(40), new InvestmentAmount(1000), new Branch('21'));
  const result = CapitalFinalCalculatorService.calculate(sim);

  expect(result.amount).toBeCloseTo(1000 * Math.pow(1.04, 25));
});
