// [EXERCISE 4 - per dish] One generated 1200x630 card per dish with ImageResponse.
// Same data source as the page, so the card can never disagree with it.
// Only flexbox + basic CSS is supported here (no grid); every div that holds
// more than text needs display:"flex". Failures are silent, so test the URL.
import { ImageResponse } from "next/og";
import { getDish } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";

export const alt = "Addis Eats dish preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  const title = dish ? dish.name : SITE_NAME;
  const detail = dish ? `${dish.price} ETB · ${dish.category}` : "Ethiopian food delivery";

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
        <div style={{ display: "flex", fontSize: 40, color: "#e5b653" }}>ADDIS EATS</div>
        <div style={{ display: "flex", fontSize: 120, fontWeight: 700, marginTop: 24 }}>{title}</div>
        <div style={{ display: "flex", fontSize: 56, color: "#e5b653", marginTop: 24 }}>{detail}</div>
      </div>
    ),
    size
  );
}
