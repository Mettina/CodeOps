# Loyalty Points Module

This mini-project is a Loyalty Points Module for a TeleBirr shop.

It uses a **closure** to keep the customer's points balance private and a **higher-order function** to allow different earning rules.

## Features

- Earn points based on ETB spent.
- Redeem points without allowing the balance to go below zero.
- Check the current points balance.
- Use different earning rules.
- Holiday rule gives double points.
- Each loyalty card has its own independent balance.

## How the Closure Keeps Points Private

The points balance is stored inside the `createLoyalty()` function:
