/* Build a customer object with name, city and balance, then log every key and value using
Object.entries in a for...of loop.*/

const customer = {
  name: "Metages",
  city: "Addis Ababa",
  balance: 5000
};

for (const [key, value] of Object.entries(customer)) {
  console.log(key, value);
}