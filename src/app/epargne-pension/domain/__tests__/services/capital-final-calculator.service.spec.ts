import {CapitalFinalCalculatorService} from '../../services/capital-final-calculator.service';
import {Age} from '../../value-objects/age';
import {EpargnePensionParametreFiscalBuilder} from '../../value-objects/EpargnePensionParametreFiscalBuilder';

it('should estimate retirement capital with 4% annual growth', () => {
  const params = new EpargnePensionParametreFiscalBuilder()
    .withTaxeEtatSurPrime(0.02)
    .withRendementAnnuelGaranti(0.0015)
    .withParticipationBeneficiaire(0.00)
    .withFraisGestionAnnuel(0.001)
    .build();

  const primeMensuelle = 100;
  const age = new Age(45); // duree 20 ans
  const result = CapitalFinalCalculatorService.calculate(primeMensuelle, age.dureeAvant65, params);

  expect(result).toBeCloseTo(21600,49);
});
