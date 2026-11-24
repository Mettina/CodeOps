using AddisEats.Api.Data;
using AddisEats.Api.Models;

namespace AddisEats.Api.Services;

public sealed class RestaurantMenuService : IRestaurantMenuService
{
    private readonly InMemoryDb _db;

    public RestaurantMenuService(InMemoryDb db) => _db = db;

    public IReadOnlyList<RestaurantMenuItem> ForRestaurant(int restaurantId, string? category)
        => _db.MenuItems
              .Where(m => m.RestaurantId == restaurantId)
              .Where(m => string.IsNullOrWhiteSpace(category)
                          || m.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
              .OrderBy(m => m.Id)
              .ToList();
}