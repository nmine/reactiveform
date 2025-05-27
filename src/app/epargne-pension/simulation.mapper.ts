import { SimulationInputDTO } from './application/use-cases/simulationInputDTO';
import { Age } from './domain/value-objects/age';
import { Branch } from './domain/value-objects/branch';
import { InvestmentAmount } from './domain/value-objects/investment-amount';
import {SimulationEpargnePension} from './domain/value-objects/simulation.epargne-pension';

export class SimulationMapper {
  static fromDTO(dto: SimulationInputDTO): SimulationEpargnePension {
    return new SimulationEpargnePension(
      new Age(dto.age),
      dto.primeMensuelle
    );
  }
}
