/*
  Generic Types are types that are connected to another type(s)...
    Eg:  Arrays are Generic types, because they're connected to types of their members

    Eg2: Promises are Generic types, subtypes being the type of the resolve value
*/

const names: Array<string> = ['Max', 'Manuel']; // Array<string> is equivalent to string[]

const promise: Promise<string> = new Promise((res, rej) => { // the subtype is the type of the resolve!
  res('Resolved Value is a String');
});

