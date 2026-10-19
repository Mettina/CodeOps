// [DAY 47 · EXERCISE 2] The map itself. Never imported directly: MapPanel loads
// it with ssr:false because Leaflet touches `window` the moment it is imported.
// Three things people forget: the stylesheet, an explicit height, the attribution.
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // without it the tiles render broken

// Leaflet's default pin images break under bundlers, so point them at the CDN files.
const pin = (url) =>
  L.icon({
    iconUrl: url,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
const DELIVERY_ICON = pin("https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png");
const COURIER_ICON = pin("https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png");

// [EXERCISE 2] "Fit the view to both": compute bounds, then fitBounds.
function FitBoth({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 1) map.fitBounds(points, { padding: [40, 40], maxZoom: 15 });
    else if (points.length === 1) map.setView(points[0], 14);
  }, [map, points]);
  return null;
}

export default function DeliveryMap({ courier, dropoff, courierLabel, dropoffLabel }) {
  const points = courier ? [courier, dropoff] : [dropoff];
  return (
    <MapContainer center={dropoff} zoom={14} style={{ height: "320px" }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors" // a licence condition, not decoration
      />
      <Marker position={dropoff} icon={DELIVERY_ICON}>
        <Popup>{dropoffLabel}</Popup>
      </Marker>
      {courier && (
        <Marker position={courier} icon={COURIER_ICON}>
          <Popup>{courierLabel}</Popup>
        </Marker>
      )}
      <FitBoth points={points} />
    </MapContainer>
  );
}
