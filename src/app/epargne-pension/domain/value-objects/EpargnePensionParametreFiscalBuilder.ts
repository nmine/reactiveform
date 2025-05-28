import {EpargnePensionParametreFiscal} from './EpargnePensionParametreFiscal';

export class EpargnePensionParametreFiscalBuilder {
  private taxeEtatSurPrime = 0.02;
  private rendementAnnuelGaranti = 0.00;
  private participationBeneficiaire = 0.00;
  private fraisGestionAnnuel = 0.001;

  withTaxeEtatSurPrime(taxe: number): this {
    this.taxeEtatSurPrime = taxe;
    return this;
  }

  withRendementAnnuelGaranti(rg: number): this {
    this.rendementAnnuelGaranti = rg;
    return this;
  }

  withParticipationBeneficiaire(pb: number): this {
    this.participationBeneficiaire = pb;
    return this;
  }

  withFraisGestionAnnuel(fg: number): this {
    this.fraisGestionAnnuel = fg;
    return this;
  }

  build(): EpargnePensionParametreFiscal {
    return new EpargnePensionParametreFiscal(
      this.taxeEtatSurPrime,
      this.rendementAnnuelGaranti,
      this.participationBeneficiaire,
      this.fraisGestionAnnuel
    );
  }
}
