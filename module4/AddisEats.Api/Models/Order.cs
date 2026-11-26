namespace AddisEats.Api.Models;

public class Order
{
    public int Id { get; init; }
    public int RestaurantId { get; init; }
    public string Area { get; init; } = "";
    public int Qty { get; init; }
    public OrderStatus Status { get; set; } = OrderStatus.Placed;
}