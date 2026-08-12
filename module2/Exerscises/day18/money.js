const VAT = 0.15;

function addVat(price) {
  return price * (1 + VAT);
}

export { VAT, addVat };