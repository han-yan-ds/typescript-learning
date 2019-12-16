function print(n1: number): void {
  return; // +n1 + n2;
}

let combineValues: Function;
combineValues = print;

function hasCb(arg1: number, cb: (x: number) => number): number {
  return cb(arg1);
}

hasCb(3, print); // won't work because cb returns number, and print returns void