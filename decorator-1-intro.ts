/* 
  A Decorator is a function that adds functionality to classes/properties/methods/parameters, 
  THEN executes when the class is DEFINED
*/
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

// Let's create a decorator FACTORY now:
function LoggerFactory(logText: string) {
  return function(constructor: Function) {
    console.log(logText);
    console.log(constructor);
  }
}

@LoggerFactory('Logging From Factory...')
class Person {
  name = 'Max';

  constructor () {
    console.log('Just created Person object');
  }
}

const person = new Person();