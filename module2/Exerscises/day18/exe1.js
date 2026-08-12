/*Given an array of ETB prices, use map to add 15% VAT, filter to keep those under 1000, and
reduce to a grand total. */

const prices = [500, 800, 1200, 600, 1500];

const total = prices
  .map(price => price * 1.15)
  .filter(price => price < 1000)
  .reduce((sum, price) => sum + price, 0);

console.log(total);
