type PersonType = {name: string; age: number}

let person: PersonType = {
  name: 'Han',
  age: 32,
};

// EnumTypes/Aliases
enum Role { ADMIN, READ_ONLY, AUTHOR };
//

// Union Types
let myNum: -1 | 0 | 1;
//

person.name = 1;
person.age = 3;

console.log(Role.ADMIN);

// Intersection Types:
//eg 1: intersecting union types
type Combinable = number | string;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // only number
//


// Discriminated Unions PATTERN (Type Guarding with a common property!!)
interface Bird {
  animalType: 'bird'; // this property is KEY to a discriminated union... it's common to all classes/interfaces that the union type has
  flyingSpeed: number;
}
interface Horse {
  animalType: 'horse'; // this property is KEY to a discriminated union... it's common to all classes/interfaces that the union type has
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed: number;
  switch (animal.animalType) {  // type guarding with the discriminated union (common) property
    case 'bird': 
      speed = animal.flyingSpeed; 
      break;
    case 'horse': 
      speed = animal.runningSpeed;
  }
  console.log('Moving with speed', speed)
}
//


// Type Casting (2 syntaxes)
let nine = '9';
let numericNine = (nine! as any)! as number;
numericNine = <number><any>nine;
console.log(numericNine);
//