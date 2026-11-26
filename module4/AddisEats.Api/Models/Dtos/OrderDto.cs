namespace AddisEats.Api.Models.Dtos;

public record OrderDto(int Id, int RestaurantId, string Area, int Qty, OrderStatus Status);