import { getOrder, getOrderForStaff } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { isStaff } from "@/lib/staff";
import { trackingFor } from "@/lib/tracking";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Please sign in to track this order." }, { status: 401 });

  const { id } = await params;
  const staff = isStaff(session);
  const order = staff ? getOrderForStaff(id) : getOrder(id, session.user);
  if (!order) return Response.json({ error: "Order not found." }, { status: 404 });

  const encoder = new TextEncoder();
  let timer;
  let closed = false;

  const stream = new ReadableStream({
    start(controller) {
      const close = () => {
        if (closed) return;
        closed = true;
        clearInterval(timer);
        controller.close();
      };
      const send = () => {
        if (closed) return;
        const fresh = staff ? getOrderForStaff(id) : getOrder(id, session.user);
        const snapshot = { id: order.id, ...trackingFor(fresh ?? order), at: new Date().toISOString() };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(snapshot)}\n\n`));
        if (snapshot.status === "delivered" || snapshot.status === "cancelled") close();
      };

      timer = setInterval(send, 2000);
      send();
      request.signal.addEventListener("abort", close, { once: true });
    },
    cancel() {
      closed = true;
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
