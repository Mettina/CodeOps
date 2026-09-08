import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth/AuthContext.jsx";

export default function SignIn() {
  const [name, setName] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim() === "") return;
    signIn(name.trim());
    navigate(from, { replace: true });
  }

  return (
    <section className="sign-in">
      <h2>Sign In</h2>
      <p>Sign in to continue to checkout.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signin-name">Name</label>
        <input
          id="signin-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}