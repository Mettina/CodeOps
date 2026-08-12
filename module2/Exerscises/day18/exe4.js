
/*Take a customer object and produce an updated copy with spread that changes the city and
adds a phone field — without mutating the original. */
const customer = {
  name: "Metages",
  city: "Addis Ababa",
  balance: 5000
};

const updatedCustomer = {
  ...customer,
  city: "Bahir Dar",
  phone: "0912345678"
};

console.log(customer);
console.log(updatedCustomer);

