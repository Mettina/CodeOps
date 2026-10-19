"use client";

import { useFormStatus } from "react-dom";

// Disabled while the action is pending: the first defence against a double submit
// (the server-side idempotency key is the second).
export default function SubmitButton({ children, pendingText = "Working...", className = "button button-dark" }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? pendingText : children}
    </button>
  );
}
