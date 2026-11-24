using AddisEats.Api.Models.Dtos;

namespace AddisEats.Api.Models;

public static class MenuItemMapping
{
    public static MenuItemDto ToDto(this RestaurantMenuItem m)
        => new MenuItemDto(m.Id, m.Name, m.Category, m.PriceEtb);
}