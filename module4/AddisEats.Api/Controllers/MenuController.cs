using AddisEats.Api.Models;
using AddisEats.Api.Options;
using AddisEats.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/menu")]
public class MenuController : ControllerBase
{
    private readonly IMenuService _menuService;
    private readonly MenuOptions _menuOptions;

    public MenuController(IMenuService menuService, IOptions<MenuOptions> menuOptions)
    {
        _menuService = menuService;
        _menuOptions = menuOptions.Value;
    }

    [HttpGet]
    public ActionResult<IReadOnlyList<MenuItem>> GetAll(
        [FromQuery] string? category,
        [FromQuery] int page = 1)
    {
        if (page < 1)
        {
            return BadRequest("Page must be greater than zero.");
        }

        return Ok(_menuService.GetAll(category, page, _menuOptions.DefaultPageSize));
    }

    [HttpGet("{id:int}")]
    public ActionResult<MenuItem> GetById(int id)
    {
        MenuItem? item = _menuService.GetById(id);
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public ActionResult<MenuItem> Create(CreateMenuItemRequest request)
    {
        if (request.PriceEtb <= 0m)
        {
            return BadRequest("PriceEtb must be greater than zero.");
        }

        MenuItem item = _menuService.Create(request.Name, request.Category, request.PriceEtb);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }
}
