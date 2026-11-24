namespace AddisEats.Api.Models;

public class RestaurantMenuItem
{
    public int Id { get; init; }
    public int RestaurantId { get; init; }
    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public decimal PriceEtb { get; set; }
}