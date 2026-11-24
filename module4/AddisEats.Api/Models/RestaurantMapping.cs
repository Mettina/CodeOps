using AddisEats.Api.Models.Dtos;

namespace AddisEats.Api.Models;

public static class RestaurantMapping
{
    public static RestaurantDto ToDto(this Restaurant r)
        => new RestaurantDto(r.Id, r.Name, r.Area, r.DeliveryFeeEtb);
}