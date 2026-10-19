// Five rows shaped like the orders table, so the page does not jump when data lands.
export default function Loading() {
  return (
    <section aria-busy="true" aria-label="Loading orders">
      <h1>Orders</h1>
      <div aria-hidden="true">
        <div className="skeleton skeleton-heading" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton skeleton-row" />
        ))}
      </div>
    </section>
  );
}
