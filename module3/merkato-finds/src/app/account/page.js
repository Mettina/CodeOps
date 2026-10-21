import Link from "next/link";
import { redirect } from "next/navigation";
import { UserRound, Package, Heart, ShoppingBag, LayoutDashboard } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { listOrders } from "@/lib/orderStore";
import { getSession } from "@/lib/session";
import { isStaff } from "@/lib/staff";

export const metadata = {
  title: "My account | Merkato Finds",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=%2Faccount");
  const count = (await listOrders(session.user)).length;
  const staff = isStaff(session);

  return (
    <section className="page-shell account-page">
      <div className="page-intro"><span className="eyebrow">YOUR SPACE</span><h1>My account<span className="title-period">.</span></h1><p>Your finds, orders, and saved things in one place.</p></div>
      <div className="account-grid">
        <Link href="/orders" className="account-tile"><Package /><h3>My orders</h3><p>{count} demo {count === 1 ? "order" : "orders"}</p><span>View orders ↗</span></Link>
        <Link href="/wishlist" className="account-tile"><Heart /><h3>Wishlist</h3><p>Products you&apos;ve saved for later.</p><span>View wishlist ↗</span></Link>
        <Link href="/cart" className="account-tile"><ShoppingBag /><h3>Your bag</h3><p>Review the items you&apos;ve picked.</p><span>View bag ↗</span></Link>
        {staff && <Link href="/dashboard" className="account-tile"><LayoutDashboard /><h3>Staff dashboard</h3><p>Review marketplace orders and delivery progress.</p><span>Open dashboard ↗</span></Link>}
        <div className="account-tile account-profile">
          <UserRound /><h3>Signed in as {session.name}</h3><p>{session.email}</p>
          <form action={signOut}><button type="submit" className="button button-outline">Sign out</button></form>
        </div>
      </div>
    </section>
  );
}
