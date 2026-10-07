import { signIn } from "@/app/actions/auth";

export default async function SignInPage({ searchParams }) {
  const { next } = await searchParams;
  const returnTo = next === "/checkout" ? "/checkout" : "/my-orders";

  return (
    <section>
      <h1>Sign in</h1>
      <form className="order-form" action={signIn}>
        <input type="hidden" name="next" value={returnTo} />
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
        <button type="submit" className="button">Sign in</button>
      </form>
    </section>
  );
}
