interface Named {
  readonly name: string; // interface properties can only be declared, not initialized
  // ^ interface properties *can* be set as readonly... now any class that implements this interface CANNOT modify this property
  nickname?: string; // the "?" tells TypeScript that this property is optional to have (but if it exists, it must be a string)
}

interface Greetable extends Named { // NOTICE: Interfaces can ALSO use inheritance!!
  greet(phrase: string): void; // interface methods: same thing, can only be declared, not initialized
}

class Person implements Greetable { // I can implement multiple interfaces by using comma... so "implements Greetable, Askable"
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(phrase: string):void {
    console.log(phrase, this.name);
  }

  changeName(newName: string): void {
    this.name = newName; // this SHOULD fail because of readonly in the interface, but it doesn't????
  }
}

let user1 = new Person('Han', 32);
user1.greet('Hi, I am');
user1.changeName('Yan');
user1.greet('Hi, I am now')