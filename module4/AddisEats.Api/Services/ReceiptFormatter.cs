namespace AddisEats.Api.Services;

public sealed class ReceiptFormatter : IReceiptFormatter
{
    public string Format(decimal totalEtb) => $"Addis Eats receipt - total {totalEtb:N2} ETB";
}