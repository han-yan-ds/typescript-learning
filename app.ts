// A Decorator is a function that takes a class as an argument, THEN executes when the class is DEFINED
function Logger() {
  console.log('Logger Decorator Factory called');
  return function(constructor: Function) {
    console.log('Logger Decorator called');
  }
}

// Let's create a decorator FACTORY now:
function ShowOnDom(visibleText: string, hookId: string) {
  console.log('Show On DOM Decorator Factory called');
  return function(constructor: any) {
    console.log('Show On DOM Decorator called');
    const hookElement = document.getElementById(hookId);
    const personObject = new constructor(); // created new Person
    if (hookElement) hookElement.innerHTML = `${visibleText}, ${personObject.name}`;
  }
}

@Logger()
@ShowOnDom('<b>SHOULD SEE THIS ON THE PAGE</b>', "app")
class Person {
  name = 'Max';

  constructor () {
    console.log('Just created Person object');
  }
}

