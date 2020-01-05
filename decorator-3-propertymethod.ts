/* Property Decorators */
function Log(target: any, propertyName: string) {
  /* a Property Decorator always takes in 2 parameters:
    1) a target (the constructor)
    2) the property's variable name (this is a way to get a variable's name as a value!)   
  */
  console.log('Property Decorator!');
  console.log(target, propertyName);
}

/* Method Decorators */
function Log2(target: any, accessorName: string, methodDescriptor: PropertyDescriptor) {
  console.log('Method/Accessor Decorator!');
  console.log('Target: ', target);
  console.log('AccessorName: ', accessorName);
  console.log('MethodDescriptor: ', methodDescriptor);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2 // method decorators on accessors have special methodDescriptors, with get and set keys
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

  //@Log2 // method decorator on a regular method
  getPriceWithTax(taxPct: number) {
    return this._price * (1 + taxPct/100);
  }
}