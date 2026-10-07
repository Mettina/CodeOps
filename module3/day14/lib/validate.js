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

  return errors;
}