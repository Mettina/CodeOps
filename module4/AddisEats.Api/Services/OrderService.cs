using AddisEats.Api.Data;
using AddisEats.Api.Models;
using AddisEats.Api.Models.Dtos;

namespace AddisEats.Api.Services;

public sealed class OrderService : IOrderService
{
    private readonly OrderStore _store;

    public OrderService(OrderStore store) => _store = store;

    public Order Place(CreateOrderRequest request)
        => _store.Add(request.RestaurantId, request.Area, request.Qty);

    public Order? GetById(int id) => _store.Find(id);
}