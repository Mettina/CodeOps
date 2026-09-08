import { useReducer, useState } from "react";

// Exercise 4: "Convert a component with three related useState calls to

export function DeliveryFormWithUseState() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");

  function reset() {
    setName("");
    setPhone("");
    setArea("");
  }

  return (
    <form className="order-form" onSubmit={(e) => e.preventDefault()}>
      <label>
        Name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Phone
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>

      <label>
        Delivery area
        <input
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </label>

      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
}


const initialForm = {
  name: "",
  phone: "",
  area: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "RESET":
      return initialForm;

    default:
      return state;
  }
}

export function DeliveryFormWithReducer() {
  const [form, dispatch] = useReducer(formReducer, initialForm);

  function updateField(field, value) {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }

  return (
    <form className="order-form" onSubmit={(e) => e.preventDefault()}>
      <label>
        Name
        <input
          value={form.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
      </label>

      <label>
        Phone
        <input
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />
      </label>

      <label>
        Delivery area
        <input
          value={form.area}
          onChange={(e) => updateField("area", e.target.value)}
        />
      </label>

      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </form>
  );
}


