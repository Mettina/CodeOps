# Addis Eats Checkout — `Checkout.jsx`

A complete, self-validating checkout form built step by step across Exercises 1–7,
then verified against the "Mini-Project: The Addis Eats Checkout" requirements.

## What it does

The checkout form collects a customer's **name**, **TeleBirr phone number**,
**delivery area**, and optional **notes**, validates everything client-side,
and simulates submitting the order to a server — including a realistic chance
of failure, so both the success and failure paths are actually reachable and
testable.

## Key implementation notes

- **Single source of truth for validity.** `canSubmit` is derived as
  `Object.keys(errors).length === 0 && items.length > 0` — it doesn't
  duplicate the individual field checks, since `validate(form)` already
  captures all of them.
- **Simulated network call.** `handleSubmit` uses `setTimeout(..., 1000)` to
  stand in for a real request, then randomly resolves success or failure
  (`Math.random() < 0.5`) so both outcomes are genuinely reachable during
  testing — not just one hardcoded path.
- **Accessibility is wired, not just styled.** Error text isn't only shown
  visually (red text) — screen readers are told a field is invalid
  (`aria-invalid`), where to find the explanation (`aria-describedby`), and
  that a new message just appeared and should be announced (`role="alert"`).



