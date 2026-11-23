namespace AddisEats.Catalog;

public class Restaurant
{
    public int Id { get; init; }
    public string Name { get; set; } = string.Empty;
    public string Area { get; set; } = string.Empty;
    public string DisplayName => $"{Name} ({Area})";
}
