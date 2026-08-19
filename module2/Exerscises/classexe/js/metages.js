let name ="metages asebe";
 let mark=[67,78,89];
 let total=0;
 
for( let i=0;i<mark.length;i++){

    total += mark[i];

}
 let average = total/mark.length;
 let grade;
  if(average >= 90){
    grade ="A"
  }
  else if(average >= 80){
    grade ="B"
  }
  else if(average >= 70){
    grade ="C"
  }
  else if(average >= 60){
    grade ="D"
  }
  else{
    grade="F"
  }

 console.log(`Student name: ${name}
  Total marks: ${total}
  Average: ${average}
  Grade: ${grade}`);