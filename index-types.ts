interface DemoIndexType { // eg: { email: 'Not a valid email' }
  [property: number]:  string;
  /* ^Index Type: don't know property's name or count, 
  I just know that *every* property's name must be a number, 
  and their values must be strings */
}

const testObject: DemoIndexType = {
  string: 3, // error because key is supposed to be a number
  2: 'stringVal', // error because value is specified to be a number
  3: 4, // error because key is specified to be a string
}