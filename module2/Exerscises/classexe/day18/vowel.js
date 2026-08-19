//  const vowel=["a","e","i","o","u"];

//  console.log(vowel[2]);
//  console.log(vowel.length);
//  console.log(vowel[vowel.length - 1]);
//  console.log(vowel.push("s"));
//  console.log(vowel.pop());
//  console.log(vowel.includes("l"));
//  console.log(vowel.indexOf("a"));


//  const newvowel = vowel.map( x => x + " is vowel");
//  console.log(newvowel);
// const bankaccount = {
//     owner: "abebe",
//     balance: 10000,
//     interst: 7,

//     deposit: function(amount) {
//         this.balance += amount;
//     },

//     withdraw(amount) {
//         this.balance -= amount;
//     }
// };

// bankaccount.deposit(5000);

// console.log(bankaccount.balance);
const numbers = [10, 17, 20, 23, 25, 28, 29, 32];

const result = numbers
    .filter(x => x % 2 === 0)
    .map(e => e * e)
    .reduce((a, c) => a + c, 0);

console.log(result);


const [firstnum,secondnum,thirdnum]=numbers;
console.log(firstnum);