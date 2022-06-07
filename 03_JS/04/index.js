class Employee {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

class EmployeeComponent {
  constructor(dom) {
    this.currentEmployee = null;
    this.dom = dom;
  }

  onInit() {
    const formElement = this.dom.querySelector("form");
    formElement.addEventListener("submit", this.save.bind(this));
  }

  save(event) {
    event.preventDefault();
    const form = event.target;
    const firstNameInput = form["firstName"];
    const lastNameInput = form["lastName"];
    this.currentEmployee = new Employee(firstNameInput.value, lastNameInput.value);
    this.printCurrentEmployee();
  }

  printCurrentEmployee() {
    console.log(this.currentEmployee);
  }
}

const component = new EmployeeComponent(document);
component.onInit();
component.printCurrentEmployee();
