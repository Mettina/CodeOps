namespace AddisEats.Catalog;

public static class DeliveryFeeExamples
{
    public static decimal DeliveryFee(string area, bool isVip = false)
        => isVip ? 0m : area switch
        {
            "Bole" => 50m,
            "Piassa" => 65m,
            _ => 80m
        };
}
