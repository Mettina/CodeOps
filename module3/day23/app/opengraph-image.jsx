// [EXERCISE 4 - site-wide] Default share card for every page without its own.
// File convention: the name is the API. No import or config needed anywhere.
import { ImageResponse } from "next/og";

export const alt = "Addis Eats — Ethiopian food delivery";
export const size = { width: 1200, height: 630 }; // standard OG ratio
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#103d2c",
          color: "#faf8f2",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, color: "#e5b653" }}>THE TASTE OF ETHIOPIA</div>
        <div style={{ display: "flex", fontSize: 120, fontWeight: 700, marginTop: 24 }}>Addis Eats</div>
        <div style={{ display: "flex", fontSize: 44, marginTop: 24 }}>Fresh Ethiopian dishes, delivered.</div>
      </div>
    ),
    size
  );
}
