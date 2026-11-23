namespace AddisEats.Catalog;

public static class Day53Runner
{
    public static void Run()
    {
        Console.WriteLine();
        Console.WriteLine("===== DAY 53 EXERCISES =====");

        Console.WriteLine($"Bole fee: {DeliveryFeeExamples.DeliveryFee("Bole"):N2} ETB");
        Console.WriteLine($"VIP fee: {DeliveryFeeExamples.DeliveryFee("Bole", isVip: true):N2} ETB");
        DescribeExamples.Describe(42);
        DescribeExamples.Describe("AE-2026-0053");
        DescribeExamples.Describe(480.50m);

        Restaurant restaurant = new() { Id = 1, Name = "Addis Eats", Area = "Bole" };
        Console.WriteLine($"Restaurant: {restaurant.DisplayName}");

        CustomerRecord recordA = new("Almaz", "0911000000");
        CustomerRecord recordB = new("Almaz", "0911000000");
        CustomerClass classA = new("Almaz", "0911000000");
        CustomerClass classB = new("Almaz", "0911000000");
        Console.WriteLine($"Records equal: {recordA == recordB}");
        Console.WriteLine($"Classes equal: {classA == classB}");

        OrderBook orderBook = CreateOrderBook();
        Console.WriteLine($"Bole orders over ETB 500: {orderBook.ForArea("Bole").Count(order => order.Total > 500m)}");
        Console.WriteLine($"Kazanchis revenue: {orderBook.ForArea("Kazanchis").Sum(order => order.Total):N2} ETB");
        Console.WriteLine($"Revenue: {orderBook.Revenue():N2} ETB");
        Console.WriteLine($"Busiest category: {orderBook.BusiestCategory() ?? "None"}");
        Console.WriteLine($"Page 1: {string.Join(", ", orderBook.Page(1).Select(order => order.Customer))}");

        Console.WriteLine($"10% discount: {new TenPercentDiscount().Apply(500m):N2} ETB");
        Console.WriteLine($"50 ETB discount: {new FiftyBirrDiscount().Apply(500m):N2} ETB");

        try
        {
            AmountValidator.EnsurePositive(0m);
        }
        catch (ArgumentException exception)
        {
            Console.WriteLine($"Caught: {exception.Message}");
        }
        finally
        {
            Console.WriteLine("Finally always runs.");
        }
    }

    private static OrderBook CreateOrderBook()
    {
        MenuItem burger = new(1, "Burger", "Main", 250m);
        MenuItem pizza = new(2, "Pizza", "Main", 450m);
        MenuItem juice = new(3, "Juice", "Drinks", 80m);

        Order boleOrder = new("Almaz", "Bole");
        boleOrder.AddLine(pizza, 2);
        boleOrder.AddLine(juice, 1);

        Order kazanchisOrder = new("Sara", "Kazanchis");
        kazanchisOrder.AddLine(burger, 2);
        kazanchisOrder.AddLine(juice, 2);

        OrderBook orderBook = new();
        orderBook.Add(boleOrder);
        orderBook.Add(kazanchisOrder);
        return orderBook;
    }
}
