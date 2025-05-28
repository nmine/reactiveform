import {Age} from '../../domain/value-objects/age';

export interface SimulateEpargnePensionQuery {
  age: Age;
  primeMensuelle: number;
  branch: string;
  specialRegime?: boolean;
}
