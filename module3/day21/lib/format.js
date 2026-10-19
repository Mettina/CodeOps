// Shared by server tables and client charts, so the axis, the tooltip and the
// table all print money the same way: "ETB 14,200".
const money = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const etb = (value) => money.format(value);

const dateTime = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export const formatDateTime = (iso) => dateTime.format(new Date(iso));
