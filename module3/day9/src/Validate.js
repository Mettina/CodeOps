export const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;

export function validate(form) {
  const errors = {};

  if (form.name.trim() === "") {
    errors.name = "Name is required.";
  }

  if (!TELEBIRR_PATTERN.test(form.phone)) {
    errors.phone = "Please use 0912345678 or +251912345678 ";
  }

  if (form.area.trim() === "") {
    errors.area = "Please choose a delivery area.";
  }

  return errors;
}