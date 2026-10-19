"use client";
// [DAY 47 · EXERCISES 3-5] Live tracking. The server render supplies `initial`, so
// nobody watches a spinner for a value we already had; the stream only updates it.
import { useEffect, useState } from "react";
import { clockTime, etb, relative, when } from "@/lib/format";
import MapPanel from "./MapPanel";

const STATE_LABEL = {
  connecting: "Connecting...",
  live: "Live",
  reconnecting: "Reconnecting...",
  closed: "Finished",
  disconnected: "Disconnected. Refresh the page to try again.",
};

export default function TrackingLive({ id, order, initial }) {
  const [track, setTrack] = useState(initial);
  // [EXERCISE 5] A screen that quietly stops updating looks identical to one where
  // nothing happened, so always show the connection state.
  const [conn, setConn] = useState(
    initial.status === "delivered" || initial.status === "cancelled" ? "closed" : "connecting"
  );
  // relative() needs "now"; ticking it keeps "in 2 minutes" honest. Starts as the
  // server's instant so server and browser render the same text first.
  const [now, setNow] = useState(() => new Date(initial.at).getTime());

  useEffect(() => {
    if (conn === "closed") return;
    const es = new EventSource(`/api/orders/${id}/stream`);
    es.onopen = () => setConn("live");
    es.onmessage = (event) => {
      const next = JSON.parse(event.data);
      setTrack(next);
      setNow(new Date(next.at).getTime());
      // Close deliberately on delivery: the server also ends the stream, and
      // without this EventSource would "reconnect" to a finished stream forever.
      if (next.status === "delivered" || next.status === "cancelled") {
        setConn("closed");
        es.close();
      }
    };
    // EventSource retries by itself; we only show it.
    // readyState CLOSED means the browser gave up (e.g. the server answered 401/404),
    // so say "Disconnected" instead of a "Reconnecting..." that will never end.
    es.onerror = () =>
      setConn((c) => (c === "closed" ? c : es.readyState === EventSource.CLOSED ? "disconnected" : "reconnecting"));
    return () => es.close(); // Day 29, still essential: no leaked connections
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const finished = track.status === "delivered" || track.status === "cancelled";

  return (
    <div className="track-grid">
      <MapPanel
        courier={track.courier}
        dropoff={track.dropoff}
        courierLabel={`Courier · ${track.status}`}
        dropoffLabel={`Delivery to ${order.area}`}
      />

      {/* [REQUIREMENT] The same information in words, for anyone who cannot see the map. */}
      <div className="dish-card track-text">
        <p className={`conn conn-${conn}`} role="status" aria-live="polite">
          <span className="conn-dot" aria-hidden="true" /> {STATE_LABEL[conn]}
        </p>
        <h2>Order #{order.id}: {track.status}</h2>
        <dl className="track-facts">
          <dt>Delivering to</dt>
          <dd>{order.name}, {order.area}</dd>
          <dt>Courier</dt>
          <dd>
            {track.status === "cancelled"
              ? "Order cancelled, no courier assigned."
              : track.status === "delivered"
              ? "Delivered."
              : track.status === "on the way"
              ? "On the way to your area."
              : "Still at the Addis Eats kitchen."}
          </dd>
          {track.etaIso && !finished && (
            <>
              <dt>Estimated arrival</dt>
              <dd>{clockTime(track.etaIso)} EAT ({relative(track.etaIso, now)})</dd>
            </>
          )}
          <dt>Placed</dt>
          <dd>{when(order.createdAt)} ({relative(order.createdAt, now)})</dd>
          <dt>Total</dt>
          <dd>{etb(order.total)}</dd>
        </dl>
      </div>
    </div>
  );
}
