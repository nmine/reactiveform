import { SimulationDTO } from './simulation.dto';
import { Simulation } from './domain/value-objects/simulation';
import { Age } from './domain/value-objects/age';
import { Branch } from './domain/value-objects/branch';
import { InvestmentAmount } from './domain/value-objects/investment-amount';

export class SimulationMapper {
  static fromDTO(dto: SimulationDTO): Simulation {
    return new Simulation(
      new Age(dto.age),
      new InvestmentAmount(dto.investmentAmount),
      new Branch(dto.branch),
      dto.specialRegime
    );
  }
}
