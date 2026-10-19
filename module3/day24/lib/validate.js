export const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;

export function validate(form) {
  const errors = {};
  const name = typeof form?.name === "string" ? form.name : "";
  const phone = typeof form?.phone === "string" ? form.phone : "";
  const area = typeof form?.area === "string" ? form.area : "";

  if (name.trim() === "") {
    errors.name = "Name is required.";
  }

  if (!TELEBIRR_PATTERN.test(phone)) {
    errors.phone = "Please use 0912345678 or +251912345678";
  }

  if (area.trim() === "") {
    errors.area = "Please choose a delivery area.";
  }

  if (!Array.isArray(form?.items) || form.items.length === 0) {
    errors.items = "Add at least one dish to your order.";
  } else if (
    form.items.some(
      (item) =>
        !Number.isInteger(item?.dishId) ||
        item.dishId < 1 ||
        !Number.isInteger(item?.quantity) ||
        item.quantity < 1
    )
  ) {
    errors.items = "Each item must have a valid dish ID and quantity.";
  }

  return errors;
}