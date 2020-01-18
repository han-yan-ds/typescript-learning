function print(n1: number): void {
  return; // +n1 + n2;
}

let combineValues: (x: number) => void; // I COULD write combineValues: Function, but that doesn't let me control the parameters or the return value
combineValues = print;

function hasCb(arg1: number, cb: (x: number) => number): number {
  return cb(arg1);
}

hasCb(3, print); // won't work because cb returns number, and print returns void

/*
  
*/
function every<T>(boolFunc: (x: T)=>boolean) {
  /* 
    FANTASTIC CASE STUDY on using generic types in TypeScript!
    - only true if boolFunc(each item in the array) is true...
    - the generics come into play because the array MUST be of a uniform type, and the boolFunc MUST take only that type!
  */
  return function(arr: T[]) {
    return arr.reduce((endBool: boolean, item: T) => {
      return endBool && boolFunc(item);
    }, true);
  }
}