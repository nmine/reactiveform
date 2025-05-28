import {SimulateEpargnePensionUseCase} from '../simulate-epargne-pension-use.case';
import {SimulateEpargnePensionQuery} from '../simulateEpargnePensionQuery';
import {Age} from '../../../domain/value-objects/age';

describe('SimulatePensionSavingsUseCase', () => {
  it('should calculate the correct avantage fiscal and capital final', () => {
    const useCase = new SimulateEpargnePensionUseCase();

    const dto: SimulateEpargnePensionQuery = {
      age: new Age(40),
      primeMensuelle: 100,
      branch: '21',
      specialRegime: false
    };

    const result = useCase.execute(dto);

    expect(result.avantageFiscal).toBeCloseTo(1000 * 12 * 0.3 * 25);
    expect(result.capitalFinal).toBe(0.3);
  })
});
