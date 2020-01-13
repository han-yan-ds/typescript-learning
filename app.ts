
/* 
  Decorator Use Case:  Validation for HTML Inputs
*/

/*
Property Decorators below:
*/
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[], // ['notEmpty', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function NotEmpty(target: any, propertyName: string) {
  const courseClassName = target.constructor.name; // Function.prototype.name is a property that's the name of the function... in this case, Course
  registeredValidators[courseClassName] = { // if registeredValidators[Course] already exists, append a key/value to it, instead of overwriting it
    ...registeredValidators[courseClassName],
    [propertyName]: ['notEmpty'], // propertyName is in brackets because I want this KEY to be the string-value of propertyName, instead of 'propertyName'
  }
}

function PositiveNumber(target: any, propertyName: string) {
  const courseClassName = target.constructor.name;
  registeredValidators[courseClassName] = {
    ...registeredValidators[courseClassName],
    [propertyName]: ['positive'],
  }
}

/* 
  So now, registeratedValidators should be of structure (arrays in nested objects):
  { Course: {title: ['notEmpty'], price: ['positive']} }
*/

function validateCourse(course: any) {
  const courseValidatorConfig = registeredValidators[course.constructor.name]; // should be an object of type { propertyName: string[] }
  let isValid = true;

  if (!courseValidatorConfig) return isValid;  // returning true as default if courseValidatorConfig doesn't exist
  
  for (let propName in courseValidatorConfig) { // loop through propertyNames
    for (let validatorString of courseValidatorConfig[propName]) { // loop through the string[], such as 'notEmpty' and 'positive'
    switch (validatorString) {
      case 'notEmpty':
        isValid = isValid && (course[propName] as boolean);
        break;
      case 'positive':
        isValid = isValid && course[propName] > 0;
        break;
      }
    }
  }
    
  return isValid; // returning true as default if courseValidatorConfig exists but is empty
}
  
class Course {
  @NotEmpty
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}
  
  
const courseForm = document.querySelector('form')!; // ! means will not be null
courseForm.addEventListener('submit', (e) => {
  /* 
    The reason to have a validator decorators is to make sure:
    1) Course Title isn't empty
    2) Course Price is positive
  */
  e.preventDefault();
  const titleElement = document.getElementById('title') as HTMLInputElement;
  const priceElement = document.getElementById('price') as HTMLInputElement;

  const title = titleElement.value;
  const price = +priceElement.value;

  const newCourse = new Course(title, price);

  if (!validateCourse(newCourse)) { // where validateCourse is called!
    alert('Invalid input, please try again!');
    return;
  } else {
    console.log(newCourse);
    console.log(registeredValidators);
  }
})