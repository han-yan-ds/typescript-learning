/*
  1)Generic Types are types that are connected to another type(s)...
    Eg:  Arrays are Generic types, because they're connected to types of their members

    Eg2: Promises are Generic types, subtypes being the type of the resolve value
*/
const names: Array<string> = ['Max', 'Manuel']; // Array<string> is equivalent to string[]

const promise: Promise<string> = new Promise((res, rej) => { // the subtype is the type of the resolve!
  res('Resolved Value is a String');
});

/* 
  2)How to build our own Generic Type?
*/
function merge<T extends object, U extends object>(objA: T, objB: U) { // this is the magic syntax!  Hover over and see that TS returns type "T & U" (intersection)... TS adjusts expected types dynamically
  /*
    Notice few things:
      1) I'm creating new 2 new types with syntax "<T, U>""
      2) TS infers the return type based on what I'm returning (for Object.assign, it returns "T & U", but if I'm returning objA, it returns "T")
      3) I'm adding constraints to my custom types by using "extends".  Here, I'm saying T and U must be instances of object.
  */
  return Object.assign(objA, objB);
}

const mergedObj = merge( {name: 'Max'}, {age: 32} ); // should be single object with name and age
// console.log(mergedObj.age);

/*
  3)Great way to use interfaces
*/
interface HasLength {
  // if I don't have this interface, TS will complain in countAndDescribe that "element.length" is invalid
  length: number;
}

function countAndDescribe<T extends HasLength>(element: T): [T, string] { // common pattern: my generic type often matches the parameter type
  let descriptionText = (element.length > 0) ? `Got ${element.length} elements.` : 'Got no value.';
  return [element, descriptionText];
}
console.log(countAndDescribe([2, 3]));

/* 
  4)Constraining a type to be an existing key of an object
*/
// function extractAndConvert(obj: object, key: string) { // <- problem here is TS can't make sure that obj has "key"
function extractAndConvert<T extends object, K extends keyof T>(obj: T, key: K) { // <- look at "<K extends keyof T>", and key param is of type K
  return obj[key];
} 