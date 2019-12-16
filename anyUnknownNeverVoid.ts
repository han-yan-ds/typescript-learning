/* 
  any and unknown 
*/

let unknownInput: unknown;
let anyInput: any;
let userName: string;

userName = anyInput; // notice any disables type-checking

userName = unknownInput; // unknown still enables type-checking, so I need an if statement
if (typeof unknownInput === 'string') userName = unknownInput;

/* 
  never 
*/

function generateError(message: string, code: number): never {
  throw {message, errorCode: code};
  return; // notice how we never reach return... this is when "never" is appropriate
}


function returnBlank(n1: number): undefined {
  return undefined; // return is reached, so we CANNOT use "never", but we CAN use void and undefined
}

function returnNothing(n1: number): void {
  console.log("blah");
  // throw {errorCode: n1}; // optional for void
  return; // optional for void
}