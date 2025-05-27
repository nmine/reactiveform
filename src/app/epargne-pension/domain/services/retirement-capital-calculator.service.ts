import {SimulationEpargnePension} from '../value-objects/simulation.epargne-pension';

export class CapitalFinalCalculatorService {
  static calculate(primeMensuelle: number, duree:number): number {
    const taxEtatSurPrime = 0.02;
    const rendementAnnuelGarantiAssureur = 0.00;
    const participationBeneficiaireAssureur = 0.00;
    const fraisGestionAnnuelAssureur = 0.001;
    const rendementBrut = rendementAnnuelGarantiAssureur + participationBeneficiaireAssureur;
    const rendementNetMensuel = (rendementBrut - fraisGestionAnnuelAssureur) / 12;

    const P = primeMensuelle;
    const R = rendementNetMensuel;
    const N = duree;
    const T = taxEtatSurPrime;

    const capitalFinal = P * (((Math.pow(1 + R, N) - 1) / R) * (1 + R) * (1 - T));

    return capitalFinal;
  }
}
