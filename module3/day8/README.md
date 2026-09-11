# The Addis Eats Checkout

A checkout form split across three files — `Checkout.jsx`, `Validate.js`,
and `Field.jsx` — that validates itself, never nags before it should, stays
usable with a keyboard or a screen reader, and survives a failed submit
without losing anything the customer typed.

## Files

- **`Checkout.jsx`** — the form itself: holds state, wires up handlers,
  lays out the four fields and the submit button.
- **`Validate.js`** — a single pure function, `validate(form)`, with no
  dependency on React or the component. Given a form object, it returns an
  errors object. Nothing else.
- **`Field.jsx`** — one reusable field: a label, an input (or any custom
  control passed as `children`, like the area `<select>`), and its error
  message, all wired together with the right `id`/`aria-*` attributes.

## Every rule, and why it exists

**All four fields live in one state object, updated by a single change handler.**
If each field had its own `useState`, every new field would mean writing a
new setter and a new handler. One object + one `handleChange` keyed off each
input's `name` attribute scales to any number of fields for free, and it's
also the shape `validate()` expects — one object in, one object of errors
out.

**`validate(form)` is a pure function, in its own file, called fresh on every render.**
Pure means: given the same form, it always returns the same errors, and it
never reaches outside itself to do it — no state, no DOM, no side effects.
That's what makes it trustworthy to call on *every* render without worrying
about stale results, and what makes it testable on its own, completely
separate from any component.

**Errors only appear after a field has been touched, then update live.**
Showing "Name is required" the instant the page loads, before the user has
typed anything, is punishing someone for a mistake they haven't made yet.
`touched` (set `onBlur`) plus the always-fresh `errors` from `validate()`
means: quiet until you leave a field, then honest and immediate the moment
you fix it — no lag, no waiting for a second blur.

**Every field has a real `<label>`, and invalid fields carry `aria-invalid`, `aria-describedby`, and `role="alert"`.**
A red message under a box tells a sighted user everything; it tells a
screen reader user nothing. `aria-invalid` announces that a field is
currently wrong. `aria-describedby` points at the exact error text so it's
read out when the field is focused. `role="alert"` means a screen reader
announces the message the moment it appears, not only if the user happens
to be on that field already.

**Errors don't rely on color alone.**
Red-vs-green text is invisible to anyone with red-green colorblindness, and
disappears completely in greyscale. Every error also gets a `⚠` symbol, a
heavier font weight, and a thicker input border — three signals that survive
losing color entirely, confirmed with Chrome's Achromatopsia emulation.

**A `submitting` flag disables the button and the button shows the ETB total.**
Two different problems, one flag. Disabling on `submitting` stops a fast
double-click from firing two orders (verified: only one `handleSubmit` call
ever fires, even on a rapid double-click). Putting the total directly in the
button's own label — `Place Order — 1500 ETB` — means the price is the very
last thing seen before committing, not something read separately above the
form and then forgotten.

**A failed submit keeps every value and moves focus to the field that needs attention.**
Losing a fully-typed form because a request failed is one of the more
needlessly punishing things a form can do. On failure, `clear()` and
`setSubmitted(true)` simply never run — only a genuine success reaches them.
Focus is then moved with a `ref`, so the next keypress lands exactly where
it's needed instead of leaving the user to go hunting for it.

**The form works with only a keyboard.**
Every control here is a native `<label>`, `<input>`, `<select>`, or
`<button>` — nothing custom that Tab, arrow keys, Enter, or Space don't
already know how to operate. Enter submits from any text field. Tabbing
in order reaches every field and the button, with no dead ends.

