import {SimulationEpargnePension} from '../value-objects/simulation.epargne-pension';

export class AvantageFiscalCalculatorService {
  static calculate(simulation: SimulationEpargnePension): number {
    const amount = simulation.primeMensuelle;
    const rate = simulation.primeMensuelle;
    const years = simulation.age.dureeAvant65;
    const total = amount * 12 * rate * years;
    return total;
  }
}
