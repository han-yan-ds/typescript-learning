// A Decorator is a function that takes a class as an argument, THEN executes when the class is DEFINED
function Logger(target: Function) {
  console.log('Logging...');
  console.log(target);
}

// Let's create a decorator FACTORY now:
function WithTemplate(template: string, hookId: string) {
  return function(_target: Function) { // underscore tells TS this variable is not used, but still don't fade it
    const hookElement = document.getElementById(hookId);
    if (hookElement) hookElement.innerHTML = template;
  }
}

@WithTemplate('<b>SHOULD SEE THIS ON THE PAGE</b>', "app")
class Person {
  name = 'Max';

  constructor () {
    console.log('Just created Person object');
  }
}

const person = new Person();