"use client";

import { useActionState } from "react";
import { cancelOrder } from "@/app/actions/cancelOrder";

export default function CancelButton({ id, status }) {
  const [state, formAction, isPending] = useActionState(cancelOrder, {
    ok: false,
    message: "",
  });

  return (
    <div>
      {status === "placed" ? (
        <form action={formAction}>
          <input type="hidden" name="id" value={id} />
          <button type="submit" className="button" disabled={isPending}>
            {isPending ? "Cancelling..." : "Cancel order"}
          </button>
        </form>
      ) : (
        <p className="status">Cancelled</p>
      )}
      {state.message && <p role={state.ok ? "status" : "alert"}>{state.message}</p>}
    </div>
  );
}
