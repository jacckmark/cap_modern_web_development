// 1. Create class Order having id (Number), and businessKey (String) as properties
// 2. Create class OrderService which stores a list of Orders; it can be initialized in the constructor
// 3. Create CRUD (create read update delete) methods in the OrderService:
// OrderService.add(order: Order) => void
// OrderService.update(order: Order) => void
// OrderService.delete(orderId: number) => void
// OrderService.getAll() => Order[]
// OrderService.findById(orderId: number) => Order | null

class Order {
  constructor(id, businessKey) {
    this.id = id;
    this.businessKey = businessKey;
  }
}

class OrderService {
  constructor(list) {
    this.list = list;
  }

  findById(orderId) {
    const order = this.list?.find(order => order.id === orderId);
    if (!order) return console.log("no data with given id");
    return order;
  }

  getAll() {
    return this.list;
  }

  add(orderObj) {
    const order = new Order(orderObj.id, orderObj.businessKey);
    this.list.push(order);
    return this.list;
  }

  update(orderObj) {
    const index = this.list.findIndex(order => order.id === orderObj.id);
    if (index === -1) return this.list;
    this.list[index] = new Order(orderObj.id, orderObj.businessKey);
    return this.list;
  }

  delete(orderId) {
    this.list = this.list.filter(order => order.id !== orderId);
    return this.list;
  }
}

// TESTS
const order1 = new Order(123, "1213sasasa");
const order2 = new Order(124, "5364fasfss");
const order3 = new Order(125, "9090424das");
const order4 = new Order(126, "64439sasgf");
const order5 = new Order(127, "9053gdsgds");
const order6 = new Order(128, "904253gglk");

const orderService = new OrderService([order1, order2, order3, order4, order5, order6]);

console.log("getAll method");
console.log(orderService.getAll());
console.log("findById method");
console.log(orderService.findById(126));
console.log("add method");
console.log(orderService.add({ id: 129, businessKey: "78799hklk" }));
console.log("update method with existing id");
console.log(orderService.update({ id: 126, businessKey: "33799hklk" }));
console.log("update method with non existing id");
console.log(orderService.update({ id: 133, businessKey: "33799hklk" }));
console.log("delete method");
console.log(orderService.delete(126));
console.log("findById method");
console.log(orderService.findById(126));
