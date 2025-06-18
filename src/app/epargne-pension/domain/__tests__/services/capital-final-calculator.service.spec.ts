import {CapitalFinalCalculatorService} from '../../services/capital-final-calculator.service';
import {Age} from '../../value-objects/age';
import {EpargnePensionParametreFiscalBuilder} from '../../value-objects/EpargnePensionParametreFiscalBuilder';

describe('CapitalFinalCalculatorService', () => {
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

    expect(result).toBeCloseTo(23721.36, 2);
  });

  it('should estimate capital with higher participation', () => {
    const params = new EpargnePensionParametreFiscalBuilder()
      .withTaxeEtatSurPrime(0.02)
      .withRendementAnnuelGaranti(0.0015)
      .withParticipationBeneficiaire(0.002)
      .withFraisGestionAnnuel(0.001)
      .build();

    const primeMensuelle = 100;
    const age = new Age(45);
    const result = CapitalFinalCalculatorService.calculate(primeMensuelle, age.dureeAvant65, params);

    expect(result).toBeGreaterThan(23721.36);
  });

  it('should estimate capital with higher management fees', () => {
    const params = new EpargnePensionParametreFiscalBuilder()
      .withTaxeEtatSurPrime(0.02)
      .withRendementAnnuelGaranti(0.0015)
      .withParticipationBeneficiaire(0.00)
      .withFraisGestionAnnuel(0.003)
      .build();

    const primeMensuelle = 100;
    const age = new Age(45);
    const result = CapitalFinalCalculatorService.calculate(primeMensuelle, age.dureeAvant65, params);

    expect(result).toBeLessThan(23721.36);
  });

  it('should estimate capital with higher tax', () => {
    const params = new EpargnePensionParametreFiscalBuilder()
      .withTaxeEtatSurPrime(0.10)
      .withRendementAnnuelGaranti(0.0015)
      .withParticipationBeneficiaire(0.00)
      .withFraisGestionAnnuel(0.001)
      .build();

    const primeMensuelle = 100;
    const age = new Age(45);
    const result = CapitalFinalCalculatorService.calculate(primeMensuelle, age.dureeAvant65, params);

    expect(result).toBeLessThan(23721.36);
  });

  it('should estimate capital with higher guaranteed yield', () => {
    const params = new EpargnePensionParametreFiscalBuilder()
      .withTaxeEtatSurPrime(0.02)
      .withRendementAnnuelGaranti(0.005)
      .withParticipationBeneficiaire(0.00)
      .withFraisGestionAnnuel(0.001)
      .build();

    const primeMensuelle = 100;
    const age = new Age(45);
    const result = CapitalFinalCalculatorService.calculate(primeMensuelle, age.dureeAvant65, params);

    expect(result).toBeGreaterThan(23721.36);
  });
});
