namespace AddisEats.Api.Services;

public interface IPaymentProvider
{
    string Name { get; }
    PaymentResult Charge(decimal amountEtb);
}