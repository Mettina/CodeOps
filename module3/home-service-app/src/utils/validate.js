export const phonePattern = /^(09|07)\d{8}$|^\+251(9|7)\d{8}$/;
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export function validatePhone(value) {
  return phonePattern.test(value);
}

export function validateEmail(value) {
  return emailPattern.test(value);
}

export function validatePassword(value) {
  return passwordPattern.test(value);
}
