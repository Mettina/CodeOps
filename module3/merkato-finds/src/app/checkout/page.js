import { redirect } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
import { getSession } from "@/lib/session";

// Private: dynamic (reads the session cookie) and kept out of search results.
export const metadata = {
  title: "Checkout | Merkato Finds",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  // Layer 2 (layer 1 is middleware.js): the session is verified here, too.
  const session = await getSession();
  if (!session) redirect("/login?next=%2Fcheckout");
  return <CheckoutForm user={{ name: session.name }} />;
}
