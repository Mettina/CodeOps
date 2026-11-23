using AddisEats.Api.Options;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/lab/delivery-options")]
public class DeliveryOptionsController : ControllerBase
{
    private readonly DeliveryOptions _options;

    public DeliveryOptionsController(IOptions<DeliveryOptions> options)
        => _options = options.Value;

    [HttpGet]
    public IActionResult Get() => Ok(new
    {
        freeAboveEtb = _options.FreeAboveEtb,
        defaultFeeEtb = _options.DefaultFeeEtb
    });
}