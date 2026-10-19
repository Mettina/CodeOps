"use client";

import { useEffect, useState } from "react";
import { etb, when } from "@/lib/format";
import DeliveryMapPanel from "./DeliveryMapPanel";

const CONNECTION_LABELS = {
  connecting: "Connecting to live demo updates…",
  live: "Live demo updates",
  reconnecting: "Reconnecting to demo updates…",
  closed: "Tracking complete",
  disconnected: "Updates disconnected. Refresh this page to reconnect.",
};

const STATUS_STEPS = ["received", "preparing", "on the way", "delivered"];

export default function TrackingLive({ order, initial }) {
  const [tracking, setTracking] = useState(initial);
  const [connection, setConnection] = useState(
    initial.status === "delivered" || initial.status === "cancelled" ? "closed" : "connecting"
  );

  useEffect(() => {
    if (initial.status === "delivered" || initial.status === "cancelled") return undefined;
    const events = new EventSource(`/api/orders/${order.id}/stream`);

    events.onopen = () => setConnection("live");
    events.onmessage = (event) => {
      const next = JSON.parse(event.data);
      setTracking(next);
      if (next.status === "delivered" || next.status === "cancelled") {
        setConnection("closed");
        events.close();
      }
    };
    events.onerror = () => {
      setConnection((current) =>
        current === "closed"
          ? current
          : events.readyState === EventSource.CLOSED
            ? "disconnected"
            : "reconnecting"
      );
    };

    return () => events.close();
  }, [order.id, initial.status]);

  return (
    <div className="tracking-layout">
      <section className="tracking-panel" aria-label="Simulated delivery map">
        <DeliveryMapPanel
          courier={tracking.courier}
          dropoff={tracking.dropoff}
          courierLabel={`Simulated courier · ${tracking.status}`}
          dropoffLabel={tracking.locationKnown
            ? `Approximate delivery area · ${order.area}, ${order.city}`
            : "Generic demo marker · delivery location is unknown"}
        />
        <p className="tracking-map-note">
          {tracking.locationKnown
            ? "Map pins and courier movement are simulated estimates, not GPS or a real shipment."
            : "This city has no map data; the map shows a generic marker, not your delivery location."}
        </p>
      </section>

      <section className="tracking-panel tracking-details">
        <p className={`tracking-connection tracking-${connection}`} role="status" aria-live="polite">
          <span aria-hidden="true" />{CONNECTION_LABELS[connection]}
        </p>
        <h2>Order {order.reference}</h2>
        <p className="tracking-recipient">Delivering to {order.customer.name} · {order.area}, {order.city}</p>

        {tracking.status === "cancelled" ? (
          <p className="tracking-cancelled">This order was cancelled. No delivery is in progress.</p>
        ) : (
          <ol className="tracking-timeline" aria-label="Delivery progress">
            {STATUS_STEPS.map((step, index) => {
              const reached = tracking.stepIndex >= index;
              const current = tracking.stepIndex === index;
              return (
                <li className={reached ? "is-reached" : ""} key={step}>
                  <span className="tracking-step-marker" aria-hidden="true">{reached ? "✓" : index + 1}</span>
                  <span>{step === "on the way" ? "On the way" : step[0].toUpperCase() + step.slice(1)}</span>
                  {current && <span className="tracking-current">Current</span>}
                </li>
              );
            })}
          </ol>
        )}

        <dl className="tracking-facts">
          <dt>Placed</dt><dd>{when(order.createdAt)}</dd>
          <dt>Estimated demo delivery</dt>
          <dd>{tracking.etaIso ? when(tracking.etaIso) : "Unavailable"}</dd>
          <dt>Order total</dt><dd>{etb(order.total)}</dd>
        </dl>
        <p className="tracking-demo-notice">This is a timed demonstration. It does not contact a seller, book a courier, or provide real-time delivery information.</p>
      </section>
    </div>
  );
}
