import { SimulationMapper } from '../../simulation.mapper';
import { TaxBenefitCalculatorService } from '../../domain/services/tax-benefit-calculator.service';
import { RetirementCapitalCalculatorService } from '../../domain/services/retirement-capital-calculator.service';
import { SimulationDTO } from '../../simulation.dto';
import { SimulationResultDTO } from '../../simulation-result.dto';

export class SimulatePensionSavingsUseCase {
  execute(dto: SimulationDTO): SimulationResultDTO {
    const simulation = SimulationMapper.fromDTO(dto);

    const taxBenefit = TaxBenefitCalculatorService.calculate(simulation);
    const retirementCapital = RetirementCapitalCalculatorService.calculate(simulation);

    return new SimulationResultDTO(taxBenefit, retirementCapital);
  }
}
