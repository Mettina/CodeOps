import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>404 — Page Not Found</h2>
      <p>Sorry, we couldn't find what you were looking for.</p>
      <Link to="/">Back to Home</Link>
    </div>
  );
}