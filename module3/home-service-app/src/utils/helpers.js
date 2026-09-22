export function getDisplayPrice(service) {
  if (service.subcategories && service.subcategories.length > 0) {
    return Math.min(...service.subcategories.map((s) => s.price));
  }
  return service.price;
}

export function getLowestPriceInCategory(category) {
  return Math.min(...category.services.map((s) => s.price));
}
