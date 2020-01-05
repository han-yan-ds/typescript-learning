/* 
  Class Decorators 
    (executed at time of class definition)
    (takes in a class's constructor as its only parameter)
  
  A class decorator *can* have a return value, but it must return a class
  More reference: https://netbasal.com/behind-the-scenes-how-typescript-decorators-operate-28f8dcacb224
*/
function Logger() { // first factory to execute
  console.log('Logger Decorator Factory called');
  return function(target: Function) {
    console.log('Logger Decorator called');
  }
}

function ShowOnDom(visibleText: string, hookId: string) { // last factory to execute
  console.log('Show On DOM Decorator Factory called');
  return function(target: any) {
    console.log('Show On DOM Decorator called');
    const hookElement = document.getElementById(hookId);
    const personObject = new target(); // created new Person
    if (hookElement) hookElement.innerHTML = `${visibleText}, ${personObject.name}`;
  }
}

@Logger() // last decorator to execute
@ShowOnDom('<b>SHOULD SEE THIS ON THE PAGE</b>', "app") // first decorator to execute
class Person {
  name = 'Max';

  constructor () {
    console.log('Just created Person object');
  }
}

