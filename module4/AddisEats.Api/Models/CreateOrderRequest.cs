namespace AddisEats.Api.Models.Dtos;

public record CreateOrderRequest(int RestaurantId, string Area, int Qty);