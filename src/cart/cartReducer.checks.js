// Exercise 3: "call it directly with plain objects to check each case."
//
// No React, no CartProvider -- cartReducer is a plain function, so it's
// called here the same way you'd call any other pure function. Run with:
//
//   node src/cart/cartReducer.checks.js
//
// Every check either logs "ok" or throws, so a failing case is loud.

import { cartReducer, MAX_QUANTITY } from "./cartReducer.js";

const doro = { id: 1, name: "Doro Wat", price: 240 };
const kitfo = { id: 2, name: "Kitfo", price: 260 };

function check(label, actual, expected) {
  const pass =
    JSON.stringify(actual) === JSON.stringify(expected);

  console.log(`${pass ? "ok" : "FAIL"} - ${label}`);

  if (!pass) {
    throw new Error(
      `${label}\n  expected: ${JSON.stringify(expected)}\n  actual:   ${JSON.stringify(actual)}`
    );
  }
}

// --- ADD: new item -----------------------------------------------------
check(
  "ADD a new item starts it at quantity 1",
  cartReducer([], { type: "ADD", payload: doro }),
  [{ ...doro, quantity: 1 }]
);

// --- ADD: existing item increments ------------------------------------
check(
  "ADD an existing item increments its quantity",
  cartReducer(
    [{ ...doro, quantity: 1 }],
    { type: "ADD", payload: doro }
  ),
  [{ ...doro, quantity: 2 }]
);

// --- ADD: capped at MAX_QUANTITY ---------------------------------------
check(
  "ADD past MAX_QUANTITY is a no-op",
  cartReducer(
    [{ ...doro, quantity: MAX_QUANTITY }],
    { type: "ADD", payload: doro }
  ),
  [{ ...doro, quantity: MAX_QUANTITY }]
);

// --- REMOVE: decrements, leaves other items alone -----------------------
check(
  "REMOVE decrements quantity by one",
  cartReducer(
    [{ ...doro, quantity: 2 }, { ...kitfo, quantity: 1 }],
    { type: "REMOVE", payload: doro.id }
  ),
  [{ ...doro, quantity: 1 }, { ...kitfo, quantity: 1 }]
);

// --- REMOVE: drops the item once quantity hits 0 ------------------------
check(
  "REMOVE drops the item once quantity reaches 0",
  cartReducer(
    [{ ...doro, quantity: 1 }],
    { type: "REMOVE", payload: doro.id }
  ),
  []
);

// --- CLEAR: empties the cart regardless of contents ----------------------
check(
  "CLEAR empties the cart",
  cartReducer(
    [{ ...doro, quantity: 3 }, { ...kitfo, quantity: 5 }],
    { type: "CLEAR" }
  ),
  []
);

// --- unknown action: state passes through unchanged -----------------------
const untouchedState = [{ ...doro, quantity: 1 }];
check(
  "an unknown action type returns state unchanged",
  cartReducer(untouchedState, { type: "NOT_A_REAL_ACTION" }),
  untouchedState
);

console.log("\nAll cartReducer checks passed.");
