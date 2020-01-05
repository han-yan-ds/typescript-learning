/* 
  Parameter Decorators 
    (executed at time of class definition)
*/
function Log4(target: any, methodName: string, paramPosition: number) {
  console.log('Parameter Decorator!');
  console.log('Target: ', target);
  console.log('Method\'s Name: ', methodName);
  console.log('Parameter\'s Position: ', paramPosition); // 0-indexed
}

class Product {
  title: string;
  private _price: number;

  set price(/*@Log4*/ val: number) { // Parameter Decorators don't work for Accessors... try it... it won't run
    if (val > 0) this._price = val;
  }

  get price() {
    return this._price;
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(@Log4 taxPct: number) { // Parameter Decorator called!
    return this._price * (1 + taxPct/100);
  }
}