//console.log("hello")
// function sum(a, b){
//     return a+b;
// }
//  console.log(sum(5,25));


//  function sum(a, b,c){
//     return a+b+c;
// }
 //console.log(sum(56,67,76));
 // default function and rest fun

 function summ(vat= 0.15,...fin){
    summ=0;
    for (const n of fin){
        
       summ = summ+n;
       
    
}
       return summ*vat;

 }
 console.log(vat(7,9,25));
   
 function vat(vat=0.15, ...vatNumbers) {
    let total = 0;
    for (let n of vatNumbers) {
        total += n;
    }
    return total * vat;
}
console.log(vat(100, 200, 300));

