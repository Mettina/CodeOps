using AddisEats.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/lab/receipt")]
public class ReceiptController : ControllerBase
{
    private readonly IReceiptFormatter _formatter;

    public ReceiptController(IReceiptFormatter formatter) => _formatter = formatter;

    [HttpGet]
    public IActionResult Get([FromQuery] decimal totalEtb)
        => Ok(new { receipt = _formatter.Format(totalEtb) });
}