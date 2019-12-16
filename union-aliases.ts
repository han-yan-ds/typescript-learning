type PersonType = {name: string; age: number}

let person: PersonType = {
  name: 'Han',
  age: 32,
};

enum Role { ADMIN, READ_ONLY, AUTHOR };

let myNum: -1 | 0 | 1;

person.name = 1;
person.age = 3;

console.log(Role.ADMIN);