namespace AddisEats.Catalog;

public record MenuItem
{
    public MenuItem(int id, string name, string category, decimal priceEtb)
    {
        if (priceEtb <= 0m)
        {
            throw new ArgumentException("Menu item price must be positive.", nameof(priceEtb));
        }

        Id = id;
        Name = name;
        Category = category;
        PriceEtb = priceEtb;
    }

    public int Id { get; init; }
    public string Name { get; init; }
    public string Category { get; init; }
    public decimal PriceEtb { get; init; }
}
