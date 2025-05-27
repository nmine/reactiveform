import { Simulation } from '../../value-objects/simulation.epargne-pension';
import { Age } from '../../value-objects/age';
import { InvestmentAmount } from '../../value-objects/investment-amount';
import { Branch } from '../../value-objects/branch';

describe('Simulation', () => {
  it('should create a valid Simulation instance', () => {
    const age = new Age(35);
    const investment = new InvestmentAmount(1200);
    const branch = new Branch('21');

    const simulation = new Simulation(age, investment, branch, true);

    expect(simulation.age.valueInYears).toBe(35);
    expect(simulation.primeMensuelle.amount).toBe(1200);
    expect(simulation.branch.code).toBe('21');
  });
});
