import {Age} from './age';

export class SimulationEpargnePension {
  constructor(
    public readonly age: Age,
    public readonly primeMensuelle: number
  ) {
  }

  private _avantageFiscal?: number;
  private _capitalFinal?: number;

  setAvantageFiscal(val: number) {
    this._avantageFiscal = val;
  }

  setCapitalFinal(val: number) {
    this._capitalFinal = val;
  }

}

