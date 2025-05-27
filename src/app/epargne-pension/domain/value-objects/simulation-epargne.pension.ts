import {TaxBenefit} from './tax-benefit';
import {RetirementCapital} from './retirement-capital';

export class SimulationEpargnePension {
  constructor(
    public readonly capitalFinal: number,
    public readonly avantageFiscal: number
  ) {}
}
