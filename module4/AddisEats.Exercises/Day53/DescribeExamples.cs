namespace AddisEats.Catalog;

public static class DescribeExamples
{
    public static void Describe(int value) => Console.WriteLine($"int overload: {value}");
    public static void Describe(string value) => Console.WriteLine($"string overload: {value}");
    public static void Describe(decimal value) => Console.WriteLine($"decimal overload: {value:N2}");
}
