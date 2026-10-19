// Skeleton shaped like the real dashboard: two chart panels and a table.
// The chart boxes use the same fixed height as the real charts, so nothing jumps.
export default function Loading() {
  return (
    <section className="dashboard" aria-busy="true" aria-label="Loading dashboard">
      <h1>Dashboard</h1>
      {[0, 1].map((n) => (
        <div className="panel" aria-hidden="true" key={n}>
          <div className="skeleton skeleton-heading" />
          <div className="skeleton chart-box" />
        </div>
      ))}
      <div className="panel" aria-hidden="true">
        <div className="skeleton skeleton-heading" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton skeleton-row" />
        ))}
      </div>
    </section>
  );
}
