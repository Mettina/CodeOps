console.log("JavaScript is working!");
let num1 = 10;
let num2 = 5;

console.log(num1 + num2); 
console.log(num1 - num2); 
console.log(num1 * num2); 
console.log(num1 / num2); 
console.log(num1 % num2); // Modulus (remainder)
console.log(num1 ** num2); // Exponentiation



console.log(num1 > num2);   // true
console.log(num1 < num2);   // false
console.log(num1 >= num2);  // true
console.log(num1 <= num2);  // false
console.log(num1 == num2);  // false
console.log(num1 === num2); // false
console.log(num1 != num2);  // true
console.log(num1 !== num2); // true

let height = 54;

if (height < 20) {
    console.log("You are a short person");
    console.log("Hi Mr. Short");
}
else if (height >= 20 && height <= 30) {
    console.log("You are a medium person");
    console.log("Hi Mr. Medium");
}
else {
    console.log("You are a tall person");
    console.log("Hi Mr. Tall");
}

let day = 3;

switch (day) {
    case 1:
        console.log("Today is Monday");
        break;

    case 2:
        console.log("Today is Tuesday");
        break;

    case 3:
        console.log("Today is Wednesday");
        break;

    case 4:
        console.log("Today is Thursday");
        break;

    case 5:
        console.log("Today is Friday");
        break;

    case 6:
        console.log("Today is Saturday");
        break;

    case 7:
        console.log("Today is Sunday");
        break;
}