namespace AddisEats.Catalog;

public sealed class FiftyBirrDiscount : IDiscountPolicy
{
    public decimal Apply(decimal amount) => Math.Max(0m, amount - 50m);
}
