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
  5)Generic Classes (for functions, see generics-1-functions.ts)
*/
class DataStorage<T extends string | number | boolean> {
  private data: T[] = []; // if I want this data to be uniform type-wise... ie all numbers OR all strings

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) !== -1) this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

/* 
  5a) Demoing DataStorage with textStorage
*/
const textStorage = new DataStorage<string>();
// textStorage.addItem(10); // error because it's expecting strings
textStorage.addItem('10'); // this is fine

/* 
  5b) Demoing DataStorage with objectStorage
*/
const objectStorage = new DataStorage<object>();
objectStorage.addItem({name: 'Max'});
objectStorage.addItem({name: 'Han'});

objectStorage.removeItem({name: 'Max'}); 
/* ^^I should be left with 'Han', but I'm not, 
  because the 2 {name: 'Max'} objects are DIFFERENT, 
  therefore my indexOf inside my removeItem method doesn't work 
  
  THEREFORE, I should modify my class declaration (line 16) 
  to use generic types of <T extends string | number | boolean>
  INSTEAD of simply <T>
*/