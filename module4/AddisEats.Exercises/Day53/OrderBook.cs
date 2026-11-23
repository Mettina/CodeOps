namespace AddisEats.Catalog;

public class OrderBook
{
    private readonly List<Order> orders = new();
    public IReadOnlyList<Order> Orders => orders;

    public void Add(Order order)
    {
        if (order.Lines.Count == 0)
        {
            throw new ArgumentException("An order must contain at least one line.");
        }

        orders.Add(order);
    }

    public IEnumerable<Order> ForArea(string area)
        => orders.Where(order => order.Area.Equals(area, StringComparison.OrdinalIgnoreCase))
                 .OrderByDescending(order => order.Total);

    public decimal Revenue() => orders.Sum(order => order.Total);

    public string? BusiestCategory()
        => orders.SelectMany(order => order.Lines)
                 .GroupBy(line => line.Item.Category)
                 .OrderByDescending(group => group.Sum(line => line.Quantity))
                 .Select(group => group.Key)
                 .FirstOrDefault();

    public IEnumerable<Order> Page(int pageNumber, int pageSize = 5)
    {
        if (pageNumber < 1 || pageSize < 1)
        {
            throw new ArgumentException("Page number and page size must be positive.");
        }

        return orders.OrderByDescending(order => order.Total)
                     .Skip((pageNumber - 1) * pageSize)
                     .Take(pageSize);
    }
}
