class Employee {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const formElement = document.querySelector("form");
formElement.addEventListener("submit", event => {
  event.preventDefault();
  const form = event.target;
  const firstNameInput = form["firstName"];
  const lastNameInput = form["lastName"];
  const employeeObj = new Employee(firstNameInput.value, lastNameInput.value);
  console.log(employeeObj);
});
console.log(new Employee("Julian", "Markiewicz"));
