import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emailPattern, passwordPattern } from "../utils/validate";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let savedUser;

    try {
      savedUser = JSON.parse(
        localStorage.getItem("betengaAccount") ||
          localStorage.getItem("betengaUser") ||
          "null"
      );
    } catch {
      setError("Saved account data is invalid. Please sign up again.");
      return;
    }

    const email = form.email.trim().toLowerCase();

    if (!emailPattern.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!passwordPattern.test(form.password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number."
      );
      return;
    }

    if (!savedUser?.email || !savedUser?.password) {
      setError("No complete account is saved. Please sign up first.");
      return;
    }

    if (
      savedUser.email?.trim().toLowerCase() !== email ||
      savedUser.password !== form.password
    ) {
      setError("No account matches this email and password. Please check your details.");
      return;
    }

    const loggedInUser = {
      ...savedUser,
      email,
    };

    localStorage.setItem("betengaAccount", JSON.stringify(loggedInUser));
    localStorage.setItem("betengaSession", JSON.stringify(loggedInUser));
    window.dispatchEvent(new Event("betengaAuthChange"));
    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-label">BETENGA ACCOUNT</p>
        <h1>Welcome back</h1>
        <p className="auth-intro">Log in to continue booking your service.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </label>

          {error && <span className="field-error">{error}</span>}

          <button type="submit" className="book-btn-large">
            Log In
          </button>
        </form>

        <p className="auth-switch">
          New to Betenga? <Link to="/signup" state={{ redirectTo }}>Sign up</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;