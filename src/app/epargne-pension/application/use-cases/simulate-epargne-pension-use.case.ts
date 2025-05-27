import {SimulationInputDTO as SimulateEpargnePensionQuery} from './simulationInputDTO';
import {CapitalFinalCalculatorService} from '../../domain/services/retirement-capital-calculator.service';
import {SimulationEpargnePension} from '../../domain/value-objects/simulation-epargne.pension';

export class SimulateEpargnePensionUseCase {
  execute(query: SimulateEpargnePensionQuery): SimulationEpargnePension {

    //const avantageFiscal = AvantageFiscalCalculatorService.calculate(simulation);
    const capitalFinal = CapitalFinalCalculatorService.calculate(query.primeMensuelle, query.age);

    return new SimulationEpargnePension(capitalFinal, 0);
  }
}
