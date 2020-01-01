// A Decorator is a function that takes a class as an argument, THEN executes when the class is DEFINED
function Logger(target: Function) {
  console.log('Logging...');
  console.log(target);
}

// Let's create a decorator FACTORY now:
function LoggerFactory(logText: string) {
  return (target: Function) => {
    console.log(logText);
    console.log(target);
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