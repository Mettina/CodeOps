using AddisEats.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace AddisEats.Api.Controllers;

[ApiController]
[Route("api/v1/lab")]
public class LabController : ControllerBase
{
    private readonly IClock _clock;
    private readonly LifetimeProbe _probe;

    public LabController(IClock clock, LifetimeProbe probe)
    {
        _clock = clock;
        _probe = probe;
    }

    [HttpGet("lifetime")]
    public IActionResult Lifetime() => Ok(new
    {
        controllerClock = Describe(_clock),
        probeClock = Describe(_probe.Clock),
        sameInstance = ReferenceEquals(_clock, _probe.Clock)
    });

    private static object Describe(IClock clock) => new
    {
        id = (clock as CapturedClock)?.InstanceId.ToString("N")[..8],
        capturedAt = clock.UtcNow
    };
}