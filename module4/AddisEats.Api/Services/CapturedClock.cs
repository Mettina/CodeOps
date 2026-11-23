namespace AddisEats.Api.Services;

public sealed class CapturedClock : IClock
{
    private readonly DateTime _capturedAt = DateTime.UtcNow;

    public Guid InstanceId { get; } = Guid.NewGuid();
    public DateTime UtcNow => _capturedAt;
}