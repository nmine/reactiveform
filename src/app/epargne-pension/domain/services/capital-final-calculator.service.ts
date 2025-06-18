import {EpargnePensionParametreFiscal} from '../value-objects/EpargnePensionParametreFiscal';

export class CapitalFinalCalculatorService {
  static calculate(
    primeMensuelle: number,
    duree: number,
    parametreFiscal: EpargnePensionParametreFiscal
  ): number {
    const P = primeMensuelle;
    const R = parametreFiscal.getRendementNetMensuel();
    const N = duree;
    const T = parametreFiscal.getTaxeEtatSurPrime();

    const N2 = 84; // 7 ans * 12 mois

    // 1. C_net_60 = P × (((1+R)^N1 - 1) / R) × (1+R)
    const C_net_60 = P * (((Math.pow(1 + R, N) - 1) / R) * (1 + R));

    // 2. C_apres_taxe = C_net_60 × (1 - 0.08)
    const C_apres_taxe = C_net_60 * (1 - T);

    // 3. C_net_67 = C_apres_taxe × (1 + R)^N2
    const C_net_67 = C_apres_taxe * Math.pow(1 + R, N2);

    return C_net_67;
  }
}

