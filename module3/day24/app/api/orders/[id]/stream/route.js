import { errorResponse } from "@/lib/errors";
import { getOrder } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { trackingFor } from "@/lib/tracking";

// [DAY 47 · EXERCISE 3] A route handler that does not end: server-sent events.
// Framing is strict: "data: " + payload + TWO newlines. One newline and the
// browser waits forever for a message that never completes.
export const dynamic = "force-dynamic";

const TICK_MS = 2000;

export async function GET(request, { params }) {
  // Same three layers as /api/orders/[id]: signed-in, then owner-only.
  const session = await getSession();
  if (!session) return errorResponse(401, "UNAUTHORIZED", "Please sign in to view orders.");

  const { id } = await params;
  const order = getOrder(id, session.user);
  if (!order) return errorResponse(404, "NOT_FOUND", `Order ${id} not found.`);

  const encoder = new TextEncoder();
  let timer;

  const stream = new ReadableStream({
    start(controller) {
      const send = () => {
        // Re-read each tick so a cancel from another tab shows up here too.
        const fresh = getOrder(id, session.user) ?? order;
        const snapshot = { id: fresh.id, ...trackingFor(fresh), at: new Date().toISOString() };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(snapshot)}\n\n`));
        // [EXERCISE 5] Close deliberately once there is nothing more to say.
        if (snapshot.status === "delivered" || snapshot.status === "cancelled") {
          clearInterval(timer);
          controller.close();
        }
      };
      send(); // first message immediately
      timer = setInterval(send, TICK_MS);
      // The browser went away (navigated, closed the tab): stop the timer.
      request.signal.addEventListener("abort", () => {
        clearInterval(timer);
        try { controller.close(); } catch {}
      });
    },
    cancel() {
      clearInterval(timer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
