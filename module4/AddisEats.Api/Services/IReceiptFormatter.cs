namespace AddisEats.Api.Services;

public interface IReceiptFormatter
{
    string Format(decimal totalEtb);
}