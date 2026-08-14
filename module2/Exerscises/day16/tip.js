const bill = Number(400);
const partySize = 4;
const paymentMethod = "TeleBirr";

let tipRate;

const tip = bill > 300 ? bill * 0.10 : bill * 0.05;


const subtotal = bill + tip;

let serviceFee; 

switch (paymentMethod) {
    case "TeleBirr":
        serviceFee = 5;
        break;

    case "CBE Birr":
        serviceFee = 3;
        break;

    default:
        serviceFee = 0;
}

const total = subtotal + serviceFee;
const perPerson = total / partySize;

console.log(`Bill: ${bill} ETB`);
console.log(`Tip: ${tip} ETB`);
console.log(`Service fee: ${serviceFee} ETB`);
console.log(`Total: ${total} ETB`);
console.log(`Amount per person: ${perPerson} ETB`);