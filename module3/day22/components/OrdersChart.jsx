"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// data: [{ label: "18 Oct", orders: 7 }] — one row per day, zeros included.
export default function OrdersChart({ data }) {
  return (
    <div
      className="chart-box"
      role="img"
      aria-label="Line chart of orders per day. The same figures are in the table below."
    >
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 320 }}>
        <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} minTickGap={12} />
          <YAxis
            allowDecimals={false}
            domain={[0, "auto"]}
            width={48}
            tick={{ fontSize: 12 }}
            label={{ value: "Orders", angle: -90, position: "insideLeft", fontSize: 12 }}
          />
          <Tooltip formatter={(value) => [value, "Orders"]} />
          {/* Dots as well as a line: the points are readable without relying on hue. */}
          <Line type="monotone" dataKey="orders" stroke="#103d2c" strokeWidth={2} dot={{ r: 4 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
