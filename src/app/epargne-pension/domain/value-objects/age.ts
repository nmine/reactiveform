export class Age {
  constructor(private readonly value: number) {
    if (value < 18 || value > 65) {
      throw new Error("Age must be between 18 and 65.");
    }
  }

  get valueInYears(): number {
    return this.value;
  }

  get dureeAvant65(): number {
    return 65 - this.value;
  }
}
