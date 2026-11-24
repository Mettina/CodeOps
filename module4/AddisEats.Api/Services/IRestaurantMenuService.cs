using AddisEats.Api.Models;

namespace AddisEats.Api.Services;

public interface IRestaurantMenuService
{
    IReadOnlyList<RestaurantMenuItem> ForRestaurant(int restaurantId, string? category);
}