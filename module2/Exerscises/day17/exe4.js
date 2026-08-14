function applyToAll(list, fn) {
    return list.map(fn);
}

const prices = [100, 200, 300, 400];

const addVAT = price => price * 1.15;

const pricesWithVAT = applyToAll(prices, addVAT);

console.log(pricesWithVAT);