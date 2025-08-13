export class Calculate {
  toll: number;
  hostings: number;
  foods: number;

  constructor(
    readonly distance: number,
    readonly consume: number,
    readonly price: number,
    toll: number = 0,
    hostings: number = 0,
    foods: number = 0
  ) {
    this.toll = toll;
    this.hostings = hostings;
    this.foods = foods;
  }

  getFuelCalcule(): number {
    const calcule = (this.distance / this.consume) * this.price;
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }

  getExpensesCalcule() {
    const calcule = this.toll + this.hostings + this.foods;
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }

  getTotalExpenses() {
    const calcule = this.getFuelCalcule() + this.getExpensesCalcule();
    if (!calcule) return 0;
    return Number.parseFloat(calcule.toFixed(2));
  }
}
