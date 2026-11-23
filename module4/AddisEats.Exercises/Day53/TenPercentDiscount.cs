namespace AddisEats.Catalog;

public sealed class TenPercentDiscount : IDiscountPolicy
{
    public decimal Apply(decimal amount) => amount * 0.90m;
}
