import { redirect } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
import { getSession } from "@/lib/session";

export default async function CheckoutPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=%2Fcheckout");
  }

  return (
    <section>
      <h1>Checkout</h1>
      <CheckoutForm />
    </section>
  );
}