export class Calculate {
  toll: number;
  accomodation: number;
  food: number;

  constructor(
    readonly distance: number,
    readonly consumption: number,
    readonly price: number,
    toll: number = 0,
    accomodation: number = 0,
    food: number = 0
  ) {
    this.toll = toll;
    this.accomodation = accomodation;
    this.food = food;
  }

  getFuelCalcule(): number {
    const calcule = (this.distance / this.consumption) * this.price;
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }

  getExpensesCalcule() {
    const calcule = this.toll + this.accomodation + this.food;
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }

  getTotalExpenses() {
    const calcule = this.getFuelCalcule() + this.getExpensesCalcule();
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }
}
