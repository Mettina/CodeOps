using AddisEats.Api.Data;
using AddisEats.Api.Models;

namespace AddisEats.Api.Services;

public sealed class RestaurantService : IRestaurantService
{
    private readonly InMemoryDb _db;

    public RestaurantService(InMemoryDb db) => _db = db;

    public IReadOnlyList<Restaurant> Search(RestaurantQuery q)
        => Filter(q)
            .OrderBy(r => r.Name, StringComparer.OrdinalIgnoreCase)   // ALWAYS order before paging
            .Skip((q.Page - 1) * q.Limit)
            .Take(q.Limit)
            .ToList();

    public Restaurant? GetById(int id)
        => _db.Restaurants.FirstOrDefault(r => r.Id == id && r.IsActive);

    public int CountAll(RestaurantQuery q) => Filter(q).Count();

    private IEnumerable<Restaurant> Filter(RestaurantQuery q)
    {
        List<string> areas = q.Areas.Where(a => !string.IsNullOrWhiteSpace(a)).ToList();

        return _db.Restaurants
            .Where(r => r.IsActive)
            .Where(r => string.IsNullOrWhiteSpace(q.Area)
                        || r.Area.Equals(q.Area, StringComparison.OrdinalIgnoreCase))
            .Where(r => areas.Count == 0
                        || areas.Contains(r.Area, StringComparer.OrdinalIgnoreCase))
            .Where(r => q.MaxFeeEtb == null || r.DeliveryFeeEtb <= q.MaxFeeEtb);
    }
}