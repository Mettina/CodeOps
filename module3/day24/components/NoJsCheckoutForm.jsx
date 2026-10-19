import { placeOrder } from "@/app/actions/placeOrder";
import { etb } from "@/lib/format";

export default function NoJsCheckoutForm({ dishes }) {
  return (
    <section className="no-js-checkout">
      <h2>Place an order without JavaScript</h2>
      <p>Select dishes and enter your delivery details. The server validates the order.</p>
      <form className="order-form checkout-form" action={placeOrder}>
        <div className="order-field">
          <label htmlFor="no-js-order-name">Name</label>
          <input id="no-js-order-name" name="name" type="text" required />
        </div>
        <div className="order-field">
          <label htmlFor="no-js-order-phone">Phone</label>
          <input id="no-js-order-phone" name="phone" type="tel" required />
        </div>
        <div className="order-field">
          <label htmlFor="no-js-order-area">Delivery area</label>
          <input id="no-js-order-area" name="area" type="text" required />
        </div>
        <fieldset className="no-js-dishes">
          <legend>Choose dishes</legend>
          {dishes.map((dish) => (
            <div className="no-js-dish" key={dish.id}>
              <label>
                <input type="checkbox" name="dishId" value={dish.id} />
                {dish.name} — {etb(dish.price)}
              </label>
              <label>
                Quantity
                <input
                  type="number"
                  name={`quantity-${dish.id}`}
                  min="1"
                  step="1"
                  defaultValue="1"
                />
              </label>
            </div>
          ))}
        </fieldset>
        <button type="submit" className="button">Place order</button>
      </form>
    </section>
  );
}
