using AddisEats.Api.Models;
using AddisEats.Api.Models.Dtos;
using AddisEats.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/restaurants")]
public class RestaurantsController : ControllerBase
{
    private readonly IRestaurantService _restaurants;
    private readonly IRestaurantMenuService _menu;

    public RestaurantsController(IRestaurantService restaurants, IRestaurantMenuService menu)
    {
        _restaurants = restaurants;
        _menu = menu;
    }

    // GET /api/v1/restaurants?area=Bole&areas=Piassa&maxFeeEtb=80&page=1&limit=5
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult GetAll([FromQuery] RestaurantQuery q)
    {
        if (q.Page < 1 || q.Limit < 1)
        {
            return BadRequest(new { error = "page and limit must be at least 1." });
        }

        var results = _restaurants.Search(q).Select(r => r.ToDto()).ToList();
        return Ok(new { data = results, page = q.Page, pageSize = q.Limit, total = _restaurants.CountAll(q) });
    }

    // GET /api/v1/restaurants/3
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<RestaurantDto> GetOne(int id)
    {
        var found = _restaurants.GetById(id);
        if (found is null)
        {
            return NotFound(new { error = $"Restaurant {id} was not found." });
        }

        return found.ToDto();   // implicit 200
    }

    // GET /api/v1/restaurants/3/menu?category=Main
    [HttpGet("{id:int}/menu")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetMenu(int id, [FromQuery] string? category)
    {
        if (_restaurants.GetById(id) is null)
        {
            return NotFound(new { error = $"Restaurant {id} was not found." });
        }

        var items = _menu.ForRestaurant(id, category).Select(m => m.ToDto()).ToList();
        return Ok(items);  
    }
}