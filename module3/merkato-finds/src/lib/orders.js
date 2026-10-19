import { products } from "@/data/products";

// Everything the browser sends is untrusted. Prices, names and totals are looked up here
// from the catalog; the browser only says WHICH product ids and HOW MANY.
export const DELIVERY_FEE = 180;
export const CITIES = ["Addis Ababa", "Adama", "Bahir Dar", "Hawassa", "Dire Dawa", "Mekelle", "Other"];
const PHONE = /^(?:\+251|0)[79][0-9]{8}$/;

export function readOrderInput(formData) {
  let items = [];
  try {
    items = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    items = [];
  }
  const text = (name) => String(formData.get(name) ?? "").trim();
  return {
    items,
    name: text("name"),
    phone: text("phone").replace(/\s+/g, ""),
    city: text("city"),
    area: text("area"),
    address: text("address"),
    notes: text("notes"),
  };
}

export function createOrder(input) {
  const fieldErrors = {};

  if (input.name.length < 1 || input.name.length > 80) fieldErrors.name = "Enter your full name.";
  if (!PHONE.test(input.phone)) fieldErrors.phone = "Use an Ethiopian mobile number, e.g. 0912345678.";
  if (!CITIES.includes(input.city)) fieldErrors.city = "Choose a city from the list.";
  if (input.area.length < 1 || input.area.length > 60) fieldErrors.area = "Enter your area or neighborhood.";
  if (input.address.length < 1 || input.address.length > 160) fieldErrors.address = "Enter a delivery address.";
  if (input.notes.length > 300) fieldErrors.notes = "Keep notes under 300 characters.";

  // Merge duplicate lines, then price every line from the catalog.
  const wanted = new Map();
  if (Array.isArray(input.items) && input.items.length <= 30) {
    for (const line of input.items) {
      const quantity = Number(line?.quantity);
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) continue;
      wanted.set(String(line?.id), (wanted.get(String(line?.id)) ?? 0) + quantity);
    }
  }
  const lines = [];
  for (const [id, quantity] of wanted) {
    const product = products.find((p) => p.id === id);
    if (product) {
      lines.push({ id: product.id, name: product.name, seller: product.seller, price: product.price, quantity: Math.min(quantity, 20) });
    }
  }
  if (lines.length === 0) fieldErrors.items = "Your bag is empty or has items we could not find.";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, message: "Please fix the highlighted fields." };
  }

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  return {
    ok: true,
    order: {
      items: lines,
      subtotal,
      delivery: DELIVERY_FEE,
      total: subtotal + DELIVERY_FEE,
      customer: {
        name: input.name, phone: input.phone, city: input.city,
        area: input.area, address: input.address, notes: input.notes,
      },
    },
  };
}
