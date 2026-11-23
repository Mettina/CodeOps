using AddisEats.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/lab/payment")]
public class PaymentLabController : ControllerBase
{
    private readonly IPaymentProvider _provider;

    public PaymentLabController(IPaymentProvider provider) => _provider = provider;

    public record ChargeRequest(decimal AmountEtb);

    [HttpPost]
    public IActionResult Charge(ChargeRequest request)
    {
        if (request.AmountEtb <= 0m)
        {
            return BadRequest(new { error = "AmountEtb must be greater than zero." });
        }

        return Ok(_provider.Charge(request.AmountEtb));
    }
}