import { redirect } from "next/navigation";
import CheckoutForm from "@/components/CheckoutForm";
import NoJsCheckoutForm from "@/components/NoJsCheckoutForm";
import { getDishes } from "@/lib/data";
import { getSession } from "@/lib/session";

export default async function CheckoutPage({ searchParams }) {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=%2Fcheckout");
  }

  const [{ placed }, dishes] = await Promise.all([searchParams, getDishes()]);

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>
      {placed === "1" && (
        <p className="status checkout-status" role="status">
          Your order was placed successfully.
        </p>
      )}
      <CheckoutForm fallback={<NoJsCheckoutForm dishes={dishes} />} />
    </section>
  );
}