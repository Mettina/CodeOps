import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>We couldn't find the page you're looking for.</p>
      <Link
        to="/"
        className="book-btn-large"
        style={{ display: "inline-block", width: "auto", padding: "0 30px" }}
      >
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;