import {TaxBenefit} from './domain/value-objects/tax-benefit';
import {RetirementCapital} from './domain/value-objects/retirement-capital';

export class SimulationResultDTO {
  constructor(
    public readonly taxBenefit: TaxBenefit,
    public readonly retirementCapital: RetirementCapital
  ) {}
}
