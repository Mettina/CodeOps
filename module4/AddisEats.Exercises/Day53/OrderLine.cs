namespace AddisEats.Catalog;

public record OrderLine
{
    public OrderLine(MenuItem item, int quantity)
    {
        if (quantity <= 0)
        {
            throw new ArgumentException("Order quantity must be positive.", nameof(quantity));
        }

        Item = item;
        Quantity = quantity;
    }

    public MenuItem Item { get; init; }
    public int Quantity { get; init; }
    public decimal LineTotal => Item.PriceEtb * Quantity;
}
