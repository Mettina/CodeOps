namespace AddisEats.Api.Services;

public class LifetimeProbe
{
    public LifetimeProbe(IClock clock) => Clock = clock;
    public IClock Clock { get; }
}