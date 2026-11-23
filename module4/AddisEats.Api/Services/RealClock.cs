namespace AddisEats.Api.Services;

public sealed class RealClock : IClock
{
    public DateTime UtcNow => DateTime.UtcNow;
}