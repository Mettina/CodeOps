"use client";

import { useEffect, useMemo, useRef } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function FitRoute({ points }) {
  const map = useMap();
  const fitted = useRef(false);

  useEffect(() => {
    if (fitted.current) return;
    fitted.current = true;
    if (points.length > 1) {
      map.fitBounds(points, { padding: [32, 32], maxZoom: 15 });
    } else {
      map.setView(points[0], 14);
    }
  }, [map, points]);

  return null;
}

export default function DeliveryMap({ courier, dropoff, courierLabel, dropoffLabel }) {
  const points = useMemo(() => (courier ? [courier, dropoff] : [dropoff]), [courier, dropoff]);
  const center = courier || dropoff;

  return (
    <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="delivery-map" aria-label="Approximate simulated delivery route">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {courier && (
        <>
          <Polyline positions={[courier, dropoff]} pathOptions={{ color: "#c86b45", weight: 4, dashArray: "8 8" }} />
          <CircleMarker center={courier} radius={9} pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#183f35", fillOpacity: 1 }}>
            <Popup>{courierLabel}</Popup>
          </CircleMarker>
        </>
      )}
      <CircleMarker center={dropoff} radius={9} pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#c86b45", fillOpacity: 1 }}>
        <Popup>{dropoffLabel}</Popup>
      </CircleMarker>
      <FitRoute points={points} />
    </MapContainer>
  );
}
