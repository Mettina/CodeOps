
/*Destructure name and city from a customer in one line, then write a function greet({ name })
that uses parameter destructuring. */

const customer = {
  name: "Metages",
  city: "Addis Ababa",
  balance: 5000
};

const { name, city } = customer;

function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer);
