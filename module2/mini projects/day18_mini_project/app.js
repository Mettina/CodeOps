import { transactions } from "./transactions.js";
import { totalByType, receiptList } from "./report.js";

const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");

const updatedTransaction = {
  ...transactions[0],
  amount: 300
};

console.log("TeleBirr Transaction Report");
console.log("----------------------------");

console.log(`Credits: ${totalCredits} ETB`);
console.log(`Debits: ${totalDebits} ETB`);

console.log("\nReceipts:");

receiptList(transactions).forEach(receipt => {
  console.log(receipt);
});

console.log("\nOriginal transaction:");
console.log(transactions[0]);

console.log("\nUpdated transaction:");
console.log(updatedTransaction);