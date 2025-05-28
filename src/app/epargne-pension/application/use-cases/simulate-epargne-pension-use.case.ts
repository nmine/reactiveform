import {SimulateEpargnePensionQuery as SimulateEpargnePensionQuery} from './simulateEpargnePensionQuery';
import {CapitalFinalCalculatorService} from '../../domain/services/capital-final-calculator.service';
import {SimulationEpargnePension} from '../../domain/value-objects/simulation-epargne.pension';
import {EpargnePensionParametreFiscal} from '../../domain/value-objects/EpargnePensionParametreFiscal';

export class SimulateEpargnePensionUseCase {
  execute(query: SimulateEpargnePensionQuery): SimulationEpargnePension {

    //const avantageFiscal = AvantageFiscalCalculatorService.calculate(simulation);
    const parametreFiscal = new EpargnePensionParametreFiscal();
    const capitalFinal = CapitalFinalCalculatorService.calculate(query.primeMensuelle, query.age.dureeAvant65, parametreFiscal);

    return new SimulationEpargnePension(capitalFinal, 0);
  }
}
