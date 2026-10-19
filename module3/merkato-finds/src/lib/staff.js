export function isStaff(session) {
  if (!session) return false;
  const staffEmails = (process.env.STAFF_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return staffEmails.includes(session.email.toLowerCase());
}
