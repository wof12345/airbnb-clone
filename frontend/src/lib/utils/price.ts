export function formatPrice(
  amount: number,
  currency = "USD",
  locale = "en-US"
) {
  if (typeof amount !== "number") return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
