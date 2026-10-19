"use client";

import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => <div className="delivery-map-placeholder" role="status">Loading map...</div>,
});

export default function DeliveryMapPanel(props) {
  return (
    <div className="delivery-map-frame">
      <DeliveryMap {...props} />
    </div>
  );
}
