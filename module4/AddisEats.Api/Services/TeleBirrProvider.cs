namespace AddisEats.Api.Services;

public sealed class TeleBirrProvider : IPaymentProvider
{
    public string Name => "TeleBirr";

    public PaymentResult Charge(decimal amountEtb)
        => new(Name, "TB-" + Guid.NewGuid().ToString("N")[..8].ToUpperInvariant(), amountEtb, true);
}