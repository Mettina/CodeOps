using AddisEats.Api.Models.Dtos;

namespace AddisEats.Api.Models;

public static class OrderMapping
{
    public static OrderDto ToDto(this Order o)
        => new OrderDto(o.Id, o.RestaurantId, o.Area, o.Qty, o.Status);
}