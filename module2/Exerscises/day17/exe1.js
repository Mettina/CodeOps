function vat(amount,rate=0.15) {

    return amount*rate;

}
 const vatArrow =(amount,rate=0.15)  => amount*rate;

 console.log(vat(100));
  console.log(vatArrow(160));

 