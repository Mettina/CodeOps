// [DAY 46+] Sign-in identity: a name (shown to the person) and an email (the
// unique key that owns orders). Pure functions, no secrets, safe anywhere.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cleanIdentity(nameInput, emailInput) {
  const name = String(nameInput ?? "").trim().replace(/\s+/g, " ");
  const email = String(emailInput ?? "").trim().toLowerCase();
  if (name.length < 1 || name.length > 60) return null;
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) return null;
  return { name, email };
}

// The signed cookie carries this payload (base64url JSON). Anything that is not
// exactly {n: string, e: valid email} is treated as "not signed in".
export function encodeIdentity({ name, email }) {
  return Buffer.from(JSON.stringify({ n: name, e: email })).toString("base64url");
}

export function decodeIdentity(payload) {
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return cleanIdentity(data?.n, data?.e);
  } catch {
    return null;
  }
}
