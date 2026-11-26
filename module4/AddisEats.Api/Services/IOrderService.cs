using AddisEats.Api.Models;
using AddisEats.Api.Models.Dtos;

namespace AddisEats.Api.Services;

public interface IOrderService
{
    Order Place(CreateOrderRequest request);
    Order? GetById(int id);
}