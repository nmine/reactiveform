import {SimulatePensionSavingsUseCase} from '../simulate-pension-savings.usecase';
import {SimulationDTO} from '../../../simulation.dto';

describe('SimulatePensionSavingsUseCase', () => {
  it('should calculate the correct tax benefit and retirement capital', () => {
    const useCase = new SimulatePensionSavingsUseCase();

    const dto: SimulationDTO = {
      age: 40,
      investmentAmount: 1000,
      branch: '21',
      specialRegime: false
    };

    const result = useCase.execute(dto);

    expect(result.taxBenefit.amount).toBeCloseTo(1000 * 12 * 0.3 * 25);
    expect(result.taxBenefit.rate).toBe(0.3);
    expect(result.retirementCapital.amount).toBeCloseTo(1000 * Math.pow(1.04, 25));
  })
});
