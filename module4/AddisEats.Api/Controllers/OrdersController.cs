using AddisEats.Api.Models;
using AddisEats.Api.Models.Dtos;
using AddisEats.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/orders")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orders;

    public OrdersController(IOrderService orders) => _orders = orders;

    // GET /api/v1/orders/91
    [HttpGet("{id:int}")]
    public ActionResult<OrderDto> GetOne(int id)
    {
        Order? order = _orders.GetById(id);
        if (order is null) return NotFound();
        return order.ToDto();
    }

    // POST /api/v1/orders
    [HttpPost]
    public ActionResult<OrderDto> Create([FromBody] CreateOrderRequest req)
    {
        Order order = _orders.Place(req);
        return CreatedAtAction(nameof(GetOne), new { id = order.Id }, order.ToDto());
    }
}