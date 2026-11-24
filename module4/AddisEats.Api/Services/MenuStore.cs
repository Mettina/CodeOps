using AddisEats.Api.Models;

namespace AddisEats.Api.Services;

public sealed class MenuStore
{
    private readonly object _lock = new();

    private readonly List<MenuItem> _items = new()
    {
        new MenuItem(1, "Doro Wat", "Main", 450m),
        new MenuItem(2, "Kitfo", "Main", 520m),
        new MenuItem(3, "Shiro", "Main", 180m),
        new MenuItem(4, "Tibs", "Main", 380m),
        new MenuItem(5, "Firfir", "Main", 220m),
        new MenuItem(6, "Buna", "Drinks", 40m),
        new MenuItem(7, "Tej", "Drinks", 120m),
        new MenuItem(8, "Fresh Juice", "Drinks", 80m)
    };

    private int _nextId;

    public MenuStore() => _nextId = _items.Max(i => i.Id) + 1;

    public IReadOnlyList<MenuItem> Snapshot()
    {
        lock (_lock)
        {
            return _items.ToList();
        }
    }

    public MenuItem Add(string name, string category, decimal priceEtb)
    {
        lock (_lock)
        {
            var item = new MenuItem(_nextId++, name, category, priceEtb);
            _items.Add(item);
            return item;
        }
    }
}