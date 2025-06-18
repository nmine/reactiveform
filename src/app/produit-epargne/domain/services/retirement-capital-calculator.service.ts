import { Simulation } from '../value-objects/simulation';
import { RetirementCapital as CapitalFinal } from '../value-objects/retirement-capital';

export class CapitalFinalCalculatorService {
  static calculate(simulation: Simulation): CapitalFinal {
    const primeMensuelle = simulation.primeMensuelle.amount; // P
    const duree = simulation.age.dureeAvant60; // N1 (en mois)
    const rendementAnnuelGarantiAssureur = 0.00;
    const participationBeneficiaireAssureur = 0.00;
    const rendementBrut = rendementAnnuelGarantiAssureur + participationBeneficiaireAssureur;
    const rendementNetMensuel = rendementAnnuelGarantiAssureur + (rendementAnnuelGarantiAssureur + rendementBrut)/12; // R
    const N2 = 84; // 7 ans * 12 mois

    // 1. C_net_60 = P × (((1+R)^N1 - 1) / R) × (1+R)
    const C_net_60 = primeMensuelle * (((Math.pow(1 + rendementNetMensuel, duree) - 1) / rendementNetMensuel) * (1 + rendementNetMensuel));

    // 2. C_apres_taxe = C_net_60 × (1 - 0.08)
    const C_apres_taxe = C_net_60 * (1 - 0.08);

    // 3. C_net_67 = C_apres_taxe × (1 + R)^N2
    const C_net_67 = C_apres_taxe * Math.pow(1 + rendementNetMensuel, N2);

    return new CapitalFinal(C_net_67);
  }
} 