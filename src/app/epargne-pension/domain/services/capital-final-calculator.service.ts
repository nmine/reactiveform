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

    const capitalFinal = P * (((Math.pow(1 + R, N) - 1) / R) * (1 + R) * (1 - T));

    return capitalFinal;
  }
}

