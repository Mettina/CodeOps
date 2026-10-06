"use client"; // Error boundaries must be Client Components

// Next 16.3 passes `retry` (re-fetches and re-renders the segment).
export default function MenuError({ error, retry }) {
  return (
    <div className="status">
      <p>Something went wrong loading the menu.</p>
      <button type="button" className="button" onClick={() => retry()}>Try again</button>
    </div>
  );
}
