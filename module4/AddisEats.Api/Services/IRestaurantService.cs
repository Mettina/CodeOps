using AddisEats.Api.Models;

namespace AddisEats.Api.Services;

public interface IRestaurantService
{
    IReadOnlyList<Restaurant> Search(RestaurantQuery q);
    Restaurant? GetById(int id);
    int CountAll(RestaurantQuery q);
}