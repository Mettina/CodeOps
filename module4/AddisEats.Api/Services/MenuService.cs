using AddisEats.Api.Models;

namespace AddisEats.Api.Services;

public sealed class MenuService : IMenuService
{
    private readonly MenuStore _store;

    public MenuService(MenuStore store) => _store = store;

    public IReadOnlyList<MenuItem> GetAll(string? category, int page, int pageSize)
        => _store.Snapshot()
                 .Where(i => string.IsNullOrWhiteSpace(category)
                             || i.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                 .OrderBy(i => i.Id)
                 .Skip((page - 1) * pageSize)
                 .Take(pageSize)
                 .ToList();

    public MenuItem? GetById(int id)
        => _store.Snapshot().FirstOrDefault(i => i.Id == id);

    public MenuItem Create(string name, string category, decimal priceEtb)
    {
        if (priceEtb <= 0m)
        {
            throw new ArgumentException("Price must be greater than zero.", nameof(priceEtb));
        }

        return _store.Add(name, category, priceEtb);
    }
}