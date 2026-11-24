using AddisEats.Api.Models;

namespace AddisEats.Api.Services;

public interface IMenuService
{
    IReadOnlyList<MenuItem> GetAll(string? category, int page, int pageSize);
    MenuItem? GetById(int id);
    MenuItem Create(string name, string category, decimal priceEtb);
}