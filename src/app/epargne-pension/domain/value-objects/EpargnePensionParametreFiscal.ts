export class EpargnePensionParametreFiscal {
  constructor(
    private readonly taxeEtatSurPrime: number = 0.08,
    private readonly rendementAnnuelGaranti: number = 0.00,
    private readonly participationBeneficiaire: number = 0.00,
    private readonly fraisGestionAnnuel: number = 0.001
  ) {
  }

  getTaxeEtatSurPrime(): number {
    return this.taxeEtatSurPrime;
  }

  getRendementBrut(): number {
    return this.rendementAnnuelGaranti + this.participationBeneficiaire;
  }

  getRendementNetMensuel(): number {
    return (this.getRendementBrut() - this.fraisGestionAnnuel) / 12;
  }
}


