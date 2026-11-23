namespace AddisEats.Api.Services;

public sealed class CbeBirrProvider : IPaymentProvider
{
    public string Name => "CBE Birr";

    public PaymentResult Charge(decimal amountEtb)
        => new(Name, "CBE-" + Guid.NewGuid().ToString("N")[..8].ToUpperInvariant(), amountEtb, true);
}