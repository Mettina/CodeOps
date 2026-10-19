import { signIn } from "@/app/actions/auth";
import { getSafeNextPath } from "@/lib/redirects";

// [EXERCISE 2] Private route: own title + description, kept out of search results.
export const metadata = {
  title: "Sign in",
  description: "Sign in to place and track your Addis Eats orders.",
  robots: { index: false, follow: false },
};

export default async function SignInPage({ searchParams }) {
  const { next, error } = await searchParams;
  const returnTo = getSafeNextPath(next);

  return (
    <section>
      <h1>Sign in</h1>
      <form className="order-form" action={signIn}>
        <input type="hidden" name="next" value={returnTo} />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          maxLength={100}
          required
        />
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          maxLength={254}
          required
        />
        {error === "invalid-input" && (
          <p className="status" role="alert">Enter your name and a valid email address.</p>
        )}
        <button type="submit" className="button">Sign in</button>
      </form>
    </section>
  );
}
