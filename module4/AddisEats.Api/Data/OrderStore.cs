using AddisEats.Api.Models;

namespace AddisEats.Api.Data;

public sealed class OrderStore
{
    private readonly object _lock = new();
    private readonly List<Order> _orders = new();
    private int _nextId = 91;

    public Order Add(int restaurantId, string area, int qty)
    {
        lock (_lock)
        {
            var order = new Order { Id = _nextId++, RestaurantId = restaurantId, Area = area, Qty = qty };
            _orders.Add(order);
            return order;
        }
    }

    public Order? Find(int id)
    {
        lock (_lock)
        {
            return _orders.FirstOrDefault(o => o.Id == id);
        }
    }
}