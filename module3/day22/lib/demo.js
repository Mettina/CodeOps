// [DAY 46] Makes the loading and error states demonstrable on demand:
//   ?demo=slow  waits 2.5 s so loading.js is visible
//   ?demo=error throws so error.js is shown
//   ?demo=empty pretends there are no orders
// Callers check the session first, so a signed-out visitor never reaches this.
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const DEMOS = ["slow", "error", "empty"];

export async function applyDemo(value) {
  const demo = DEMOS.includes(Array.isArray(value) ? value[0] : value)
    ? (Array.isArray(value) ? value[0] : value)
    : undefined;
  if (demo === "slow") await wait(2500);
  if (demo === "error") throw new Error("Demo error: this failure was forced on purpose.");
  return demo;
}
