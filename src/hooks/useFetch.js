import { useEffect, useState } from "react";

// Exercise 2: custom useFetch hook, in its own file, used in two
// components (Menu.jsx drives it off the category filter; MenuStats.jsx
// uses it independently to fetch the same resource for a dish count).
//
// `fetcher` is `(signal) => Promise<data>` rather than a fixed URL, so
// whatever triggers a re-fetch (e.g. the selected category) can be
// expressed in `deps` -- that's what makes "category filter driving the
// fetch" (Week 1 project requirement) possible: passing a new `deps`
// value re-runs the effect, which calls `fetcher` again and issues a
// new request.
export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetcher(controller.signal);

        if (isCurrent) {
          setData(result);
        }
      } catch (err) {
        if (err.name !== "AbortError" && isCurrent) {
          setError(err.message);
        }
      } finally {
        if (isCurrent && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    run();

    // Cleanup that aborts the in-flight request -- prevents a slow
    // response from a previous category landing after a newer one.
    return () => {
      isCurrent = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return {
    data,
    loading,
    error,
  };
}