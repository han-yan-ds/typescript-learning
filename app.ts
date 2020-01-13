
/* 
  Decorator Use Case:  Validation for HTML Inputs

  READ CAREFULLY THE NOTES, THIS CODE IS COMPLEX
*/

/*
  1)Controlling the structure of registeredValidators with an interface
    registeredValidators will store the validator decorators that are called on certain properties

    Eg, registeratedValidators should be of structure (arrays in nested objects):
      { Course: {title: ['notEmpty', 'under5chars'], price: ['positive', 'notEmpty']} }
*/
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[], // ['notEmpty', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

/* 
  2)Creating a decorator factory:
    This factory will create decorators:
    Each created decorator will register the propertyName (eg: title) and validatorName (eg: notEmpty) to the registeredValidators object

    a)Notice code that makes sure I create a new object if it doesn't yet exist, but I append to that object if it does exist:
      ...registeredValidators[courseClassName]

    b)Notice code that makes sure I create a new array if it doesn't yet exist, but I append to that array if it does exist:
      (registeredValidators[courseClassName]?.[propertyName]) ?
        [validatorName, ...registeredValidators[courseClassName][propertyName]]
        : [validatorName]
    
    c)Notice IN code for array-check^^: In the ternary operator's check, I check multiple levels of key-value pairs exist using optional-chaining (TS feature):
      (registeredValidators[courseClassName]?.[propertyName]) ?

    d)Notice: propertyName is in brackets because I want this KEY to be the string-value of propertyName, instead of 'propertyName'
      [propertyName]: .......
*/
function MakeValidatorDecorator(validatorName: string) {
  return (target: any, propertyName: string) => {
    const courseClassName = target.constructor.name; // Function.prototype.name is a property that's the name of the function... in this case, Course
    registeredValidators[courseClassName] = {
      ...registeredValidators[courseClassName],
      [propertyName]: (registeredValidators[courseClassName]?.[propertyName]) ?
        [validatorName, ...registeredValidators[courseClassName][propertyName]]
        : [validatorName],
    }
  }
}

/* 
  3)Decorators generated from decorator factory (see step 2)
*/
const NotEmpty = MakeValidatorDecorator('notEmpty');
const PositiveNumber = MakeValidatorDecorator('positive');
const MaxLength5 = MakeValidatorDecorator('under5chars');


/*
  4)Function to actually check the Course object against registeredValidators

    Recall: registeratedValidators[Course] is of structure:
      {title: ['notEmpty', 'under5chars'], price: ['positive', 'notEmpty']}

    Thus, I'm looping through the propertyNames, THEN looping through the validatorNames within each propertyName, and checking the property
      Eg: If I get to price -> positive...
        I check if the course[price] is positive
*/
function validateCourse(course: any) {
  const courseValidatorConfig = registeredValidators[course.constructor.name]; // I'm validating Course, thus I'm using registeredValidators[Course]
  let isValid = true;

  if (!courseValidatorConfig) return isValid;  // returning true as default if registeredValidators[Course] doesn't exist
  
  for (let propName in courseValidatorConfig) { // loop through propertyNames (title, price)
    for (let validatorName of courseValidatorConfig[propName]) { // loop through the string[], such as 'notEmpty' and 'positive'
    switch (validatorName) {
      case 'notEmpty':
        isValid = isValid && (course[propName] as boolean);
        break;
      case 'positive':
        isValid = isValid && course[propName] > 0;
        break;
      case 'under5chars':
        isValid = isValid && course[propName].length < 5;
        break;
      }
    }
  }
  return isValid; // returning true as default if registeredValidators[Course] exists but is empty object
}

/*
  5)Simply creating a Course class that'll generate a Course instance when a form (see below this) is submitted
*/
class Course {
  @NotEmpty @MaxLength5 title: string;
  @PositiveNumber @NotEmpty price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}
  
/*
  6)Form that'll generate a new Course instance
*/
const courseForm = document.querySelector('form')!; // ! means will not be null
courseForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleElement = document.getElementById('title') as HTMLInputElement;
  const priceElement = document.getElementById('price') as HTMLInputElement;

  const newCourse = new Course(titleElement.value, +priceElement.value);

  if (!validateCourse(newCourse)) { // where validateCourse is called!
    alert('Invalid input, please try again!');
    return;
  } else {
    console.log('newCourse:', newCourse);
    console.log('registeredValidators:', registeredValidators);
  }
})