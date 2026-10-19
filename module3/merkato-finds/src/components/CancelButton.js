"use client";

import { useFormState } from "react-dom";
import { cancelOrder } from "@/app/actions/cancelOrder";
import SubmitButton from "./SubmitButton";

export default function CancelButton({ id }) {
  const [state, formAction] = useFormState(cancelOrder, { ok: false, message: "" });
  return (
    <form action={formAction} className="cancel-form">
      <input type="hidden" name="id" value={id} />
      <SubmitButton className="button button-outline" pendingText="Cancelling...">Cancel order</SubmitButton>
      {state.message && (
        <small role="status" className={state.ok ? "form-ok" : "field-error"}>{state.message}</small>
      )}
    </form>
  );
}
