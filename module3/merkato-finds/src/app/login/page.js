import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "@/app/actions/auth";
import { getSafeNextPath } from "@/lib/redirects";
import { getSession } from "@/lib/session";
export const metadata = { title: "Sign In | Merkato Finds", robots: { index: false, follow: true } };

export default async function Page({ searchParams }) {
  if (await getSession()) redirect("/");
  const sp = await searchParams;
  const next = getSafeNextPath(sp?.next);
  return (
    <section className="auth-page page-shell">
      <div className="auth-art"><span className="eyebrow">WELCOME BACK</span><h2>Good to see<br/><em>you again.</em></h2><p>Your next favorite find might be just around the corner.</p></div>
      <div className="auth-form-wrap">
        <span className="eyebrow">YOUR MERKATO ACCOUNT</span>
        <h1>Sign in</h1>
        <p className="muted">Continue your discovery.</p>
        {sp?.error && <p className="field-error form-error" role="alert">Enter your name and a valid email address.</p>}
        <form className="auth-form" action={signIn}>
          <input type="hidden" name="next" value={next} />
          <label>Your name<input name="name" autoComplete="name" placeholder="Your name" required maxLength="60"/></label>
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required/></label>
          <button type="submit" className="button button-dark full-button">Sign in</button>
        </form>
        <p className="auth-switch">New here? <Link href="/signup">Create an account</Link></p>
        <p className="demo-note">Learning exercise: there is no password and the email is not verified, so this is not production authentication.</p>
      </div>
    </section>
  );
}
