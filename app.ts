/* Property Decorators */
function Log(target: any, propertyName: string) {
  console.log('Property Decorator!')
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  set price(val: number) {
    if (val > 0) this._price = val;
  }

  get price() {
    return this._price;
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(taxPct: number) {
    return this._price * (1 + taxPct/100);
  }
}