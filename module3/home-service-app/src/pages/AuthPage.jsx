import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emailPattern, phonePattern } from "../utils/validate";

function AuthPage({ mode = "signup" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = mode === "signup";
  const redirectTo = location.state?.redirectTo || "/";
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailPattern.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!phonePattern.test(form.phone)) {
      setError("Enter a valid phone number: 09XXXXXXXX, 07XXXXXXXX, or +2519XXXXXXXX.");
      return;
    }

    localStorage.setItem(
      "betengaUser",
      JSON.stringify({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
      })
    );
    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-label">BETENGA ACCOUNT</p>
        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p className="auth-intro">
          {isSignup
            ? "Create an account before booking a home service."
            : "Enter your details to continue booking your service."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </label>
          )}

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
            Phone Number
            <input
              type="tel"
              name="phone"
              placeholder="09XXXXXXXX or +2519XXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>

          {error && <span className="field-error">{error}</span>}

          <button type="submit" className="book-btn-large">
            {isSignup ? "Create Account" : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to Betenga?"}{" "}
          <Link
            to={isSignup ? "/login" : "/signup"}
            state={{ redirectTo }}
          >
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>
      </section>
    </main>
  );
}

export function SignupPage() {
  return <AuthPage mode="signup" />;
}

export function LoginPage() {
  return <AuthPage mode="login" />;
}