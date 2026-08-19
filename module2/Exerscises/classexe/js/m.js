let name="Metages Asebe";

let mark =[75,84,90];
let total=0;
 for(let i=0;i<mark;i++)
 {
    total +=
 }
for (let i = 0; i < marks.length; i++) {
    total += marks[i];
}


let average = total / marks.length;


let grade;

if (average >= 90) {
    grade = "A";
} else if (average >= 80) {
    grade = "B";
} else if (average >= 70) {
    grade = "C";
} else if (average >= 60) {
    grade = "D";
} else {
    grade = "F";
}


console.log(`Student name: ${name}Total marks: ${total}Average: ${average}Grade: ${grade}`
);