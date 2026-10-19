"use client"; // Recharts measures the DOM, so only this leaf is client code.

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { etb } from "@/lib/format";

// data: [{ area, revenue }] already summarised on the server (one row per neighbourhood).
export default function RevenueChart({ data }) {
  return (
    // .chart-box has a real CSS height, so the percentage height inside it cannot collapse
    // and the space is reserved before the chart paints.
    <div
      className="chart-box"
      role="img"
      aria-label="Bar chart of revenue in ETB for each neighbourhood. The same figures are in the table below."
    >
      <ResponsiveContainer width="100%" height="100%" initialDimension={{ width: 640, height: 320 }}>
        <BarChart data={data} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="area" interval={0} tick={{ fontSize: 12 }} />
          {/* Bars always start at zero; width leaves room for "ETB 10,000". */}
          <YAxis tickFormatter={etb} width={90} domain={[0, "auto"]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [etb(value), "Revenue"]} />
          <Bar dataKey="revenue" fill="#08764f" isAnimationActive={false}>
            {/* Values printed on the bars: readable with no colour at all. */}
            <LabelList dataKey="revenue" position="top" formatter={etb} fontSize={11} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
