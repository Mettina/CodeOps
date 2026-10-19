"use client";

export default function Error({ reset }) {
  return (
    <section className="page-shell empty-state" role="alert">
      <h1>Something went wrong.</h1>
      <p>Please try again. If it keeps happening, come back in a few minutes.</p>
      <button type="button" className="button button-dark" onClick={() => reset()}>Try again</button>
    </section>
  );
}
