import { getOrder, getOrderForStaff } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { isStaff } from "@/lib/staff";
import { trackingFor } from "@/lib/tracking";

export const dynamic = "force-dynamic";
// Serverless functions have a time limit. The stream ends itself just before it, and the
// browser's EventSource reconnects on its own, so tracking keeps updating.
export const maxDuration = 60;
const STREAM_SECONDS = 50;

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Please sign in to track this order." }, { status: 401 });

  const { id } = await params;
  const staff = isStaff(session);
  const load = () => (staff ? getOrderForStaff(id) : getOrder(id, session.user));
  const order = await load();
  if (!order) return Response.json({ error: "Order not found." }, { status: 404 });

  const encoder = new TextEncoder();
  let timer;
  let stopTimer;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const close = () => {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        clearTimeout(stopTimer);
        try { controller.close(); } catch {}
      };
      const send = async () => {
        if (closed) return;
        let fresh = order;
        try { fresh = (await load()) ?? order; } catch {}
        if (closed) return;
        const snapshot = { id: order.id, ...trackingFor(fresh), at: new Date().toISOString() };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(snapshot)}\n\n`));
        if (snapshot.status === "delivered" || snapshot.status === "cancelled") close();
      };

      timer = setInterval(send, 2000);
      stopTimer = setTimeout(close, STREAM_SECONDS * 1000);
      send();
      request.signal.addEventListener("abort", close, { once: true });
    },
    cancel() {
      closed = true;
      clearInterval(timer);
      clearTimeout(stopTimer);
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
