function makeCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = makeCounter();

console.log(counter()); 
console.log(counter()); 
console.log(counter()); 
console.log(counter()); 

// count stays private because it is inside makeCounter's scope.
