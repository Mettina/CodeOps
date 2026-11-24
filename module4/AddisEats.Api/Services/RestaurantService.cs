using AddisEats.Api.Data;
using AddisEats.Api.Models;

namespace AddisEats.Api.Services;

public sealed class RestaurantService : IRestaurantService
{
    private readonly InMemoryDb _db;

    public RestaurantService(InMemoryDb db) => _db = db;

    public IReadOnlyList<Restaurant> Search(string? area, int page, int limit)
        => Filter(area)
            .OrderBy(r => r.Name, StringComparer.OrdinalIgnoreCase)   // ALWAYS order before paging
            .Skip((page - 1) * limit)
            .Take(limit)
            .ToList();

    public Restaurant? GetById(int id)
        => _db.Restaurants.FirstOrDefault(r => r.Id == id && r.IsActive);

    public int CountAll(string? area) => Filter(area).Count();

    private IEnumerable<Restaurant> Filter(string? area)
        => _db.Restaurants
              .Where(r => r.IsActive)
              .Where(r => string.IsNullOrWhiteSpace(area)
                          || r.Area.Equals(area, StringComparison.OrdinalIgnoreCase));
}