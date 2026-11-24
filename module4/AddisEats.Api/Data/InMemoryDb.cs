using AddisEats.Api.Models;

namespace AddisEats.Api.Data;

public sealed class InMemoryDb
{
    public IReadOnlyList<Restaurant> Restaurants { get; }
    public IReadOnlyList<RestaurantMenuItem> MenuItems { get; }

    public InMemoryDb()
    {
        Restaurants = SeedData.Restaurants();
        MenuItems = SeedData.MenuItemsFor(Restaurants);
    }
}