using Microsoft.AspNetCore.Mvc;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/lab/ambiguous")]
public class AmbiguityLabController : ControllerBase
{
    [HttpGet("{id}")]
    public IActionResult GetOne(int id) => Ok(new { id });

    [HttpGet("by-slug/{slug}")]
    public IActionResult GetBySlug(string slug) => Ok(new { slug });
}