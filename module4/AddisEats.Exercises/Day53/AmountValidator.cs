namespace AddisEats.Catalog;

public static class AmountValidator
{
    public static void EnsurePositive(decimal amount)
    {
        if (amount <= 0m)
        {
            throw new ArgumentException("Amount must be positive.", nameof(amount));
        }
    }
}
