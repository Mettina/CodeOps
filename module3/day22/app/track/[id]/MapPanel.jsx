"use client";
// [DAY 47 · EXERCISE 1] ssr:false is not an optimisation here, it is the only way
// Leaflet can load at all. The placeholder is exactly the map's height (320px),
// so the page does not jump when the map arrives (the CLS problem again).
import dynamic from "next/dynamic";

const DeliveryMap = dynamic(() => import("./DeliveryMap"), {
  ssr: false,
  loading: () => (
    <div className="map-box map-placeholder" role="status">
      Loading map...
    </div>
  ),
});

export default function MapPanel(props) {
  return (
    <div className="map-box">
      <DeliveryMap {...props} />
    </div>
  );
}
