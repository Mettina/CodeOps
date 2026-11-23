using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/lab/secret")]
[Authorize]
public class SecretController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { message = "You are in.", user = User.Identity?.Name });
}