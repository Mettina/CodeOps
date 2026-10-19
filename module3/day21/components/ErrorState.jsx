"use client"; // Error boundaries must be Client Components

// Shared by dashboard/error.js and orders/error.js: what failed, and a way to retry.
// Next 16.3 passes `retry`; older 16.x passes `reset`.
export default function ErrorState({ what, retry, reset }) {
  const again = retry ?? reset;
  return (
    <div className="empty-state error-state" role="alert">
      <h2>Something went wrong</h2>
      <p>We could not load {what}. Nothing was changed. Try again in a moment.</p>
      <button type="button" className="button" onClick={() => again?.()}>Try again</button>
    </div>
  );
}
