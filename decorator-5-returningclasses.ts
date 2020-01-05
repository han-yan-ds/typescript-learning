/*
  Class Decorator that OVERWRITES/MODIFIES THE CLASS
    Notice that this Decorator will:
      1) override Greeter.hello
      2) add newProperty to Greeter object

  A class decorator *can* have a return value, but it must return a class
  More reference: https://netbasal.com/behind-the-scenes-how-typescript-decorators-operate-28f8dcacb224
*/

function overrideDecorator(constructor: any) {
  return class extends constructor {
    newProperty = "new property's value";
    hello = "override";
  }
}

@overrideDecorator
class Greeter {
  hello: string;
  constructor(greeting: string) {
    this.hello = greeting;
  }
}

const han = new Greeter('Hi I\'m Han!');
console.log(han.hello); // will print out "override"
console.log(han.newProperty); // will print out "new property's value", despite TS's error