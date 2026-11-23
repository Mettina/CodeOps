namespace AddisEats.Catalog;

public class Order
{
    public Order(string customer, string area)
    {
        Customer = customer;
        Area = area;
    }

    public string Customer { get; }
    public string Area { get; }
    public List<OrderLine> Lines { get; } = new();
    public decimal Total => Lines.Sum(line => line.LineTotal);

    public void AddLine(MenuItem item, int quantity)
        => Lines.Add(new OrderLine(item, quantity));
}
