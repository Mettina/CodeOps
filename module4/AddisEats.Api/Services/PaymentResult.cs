namespace AddisEats.Api.Services;

public record PaymentResult(string Provider, string Reference, decimal AmountEtb, bool Success);