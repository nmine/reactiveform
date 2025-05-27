export class Branch {
  constructor(private readonly value: string) {
    if (value !== '21' && value !== '23') {
      throw new Error("Branch must be either '21' or '23'.");
    }
  }

  get code(): string {
    return this.value;
  }
}
