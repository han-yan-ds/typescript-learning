/* 
TS CLASSES
*/

class Department {
  protected employees: string[] = [];  // notice, I can make properties AND methods as private (only accessible from inside a class)

  constructor(private readonly name: string) { // notice, in TS, the constructor's argument should have public/private modifiers (shorthand notation, see lecture 62 in Udemy TypeScript 2020)
    // readonly is another modifier, which is like const, that it doesn't allow value to be changed
    // this.name = name;  // this.var = var is automatically implied for every constructor argument with public/private
  }

  getName(this: Department): string { // notice that I set the class of this as Department (its own class)... I can set a type to this!!
    return this.name;
  }

  addEmployee(newEmployee: string): void {
    this.employees.push(newEmployee);
  }
}

let accounting = new Department("Accounting");
console.log(accounting.getName()); // Accounting

let accountingCopy = { 
  getName: accounting.getName, 
  name: "Accting", 
  employees: [],
  addEmployee: accounting.addEmployee 
};
// console.log(accountingCopy.getName()); // Accting, even though it took the getName() method from Accounting
      // ^ this only works if getName()'s this isn't limited to Department... because once I set name to private, it becomes a different structure than accountingCopy, whose name is public


/*
TS INHERITANCE
*/

class ITDepartment extends Department {
  private admins: string[] = []

  constructor() {
    super('IT'); // inside a constructor that extends a superclass, I must call super first (the constructor of the superclass);
      // only after calling super can I use "this"
  }

  addAdmin(name: string) {
    this.admins.push(name);
  }

  get myEmployees(): string[] {
    return this.employees; // this will only work if employees inside Department is public or protected... if it's private inside Department, subclasses won't be able to access it
  }

  static printClassName(): string { // this is a pointless method, but it shows how it's called (className.methodName(), instead of instanceName.methodName())... see below
    return "IT Department";
  }
}

let itDept = new ITDepartment();
itDept.addEmployee('Vlad');
console.log(itDept.getName()); // prints IT to console
console.log(itDept.myEmployees); // prints IT to console
console.log(ITDepartment.printClassName()); // demonstrates how a static method is called... Math.min() is an example