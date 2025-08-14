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

  getTotalFuelExpense(): number {
    const calcule = (this.distance / this.consumption) * this.price;
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }

  getTotalExpenses() {
    const calcule = this.toll + this.accomodation + this.food;
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }

  getTotal() {
    const calcule = this.getTotalFuelExpense() + this.getTotalExpenses();
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }
}
