
using System;
Console.WriteLine("I AM RUNNING ADDISEATS.EXERCISES");

// EXERCISE 2
Console.WriteLine("===== EXERCISE 2 =====");

Console.WriteLine("Metages Asebe");
Console.WriteLine(DateTime.Now.ToString("dd MMM yyyy"));
Console.WriteLine("CodeOps Module 4 — .NET track");

Console.WriteLine();

// EXERCISE 3
Console.WriteLine("===== EXERCISE 3 =====");

int numberOfOrders = 25;
long orderReference = 12345678901L;
decimal foodPrice = 240.50m;
double deliveryDistance = 4.5;
bool isDelivered = true;
char foodSize = 'L';
string customerName = "Metages";
DateTime orderDate = DateTime.Now;

Console.WriteLine($"int: {numberOfOrders}");
Console.WriteLine($"long: {orderReference}");
Console.WriteLine($"decimal: {foodPrice}");
Console.WriteLine($"double: {deliveryDistance}");
Console.WriteLine($"bool: {isDelivered}");
Console.WriteLine($"char: {foodSize}");
Console.WriteLine($"string: {customerName}");
Console.WriteLine($"DateTime: {orderDate}");

Console.WriteLine();

// EXERCISE 4
Console.WriteLine("===== EXERCISE 4 =====");

decimal subtotal = 1480.5m;
decimal deliveryFee = 60m;

Console.WriteLine("----- ADDIS EATS RECEIPT -----");
Console.WriteLine($"Subtotal:     {subtotal,10:N2}");
Console.WriteLine($"Delivery Fee: {deliveryFee,10:N2}");
Console.WriteLine("------------------------------");

// EXERCISE 5
Console.WriteLine();
Console.WriteLine("===== EXERCISE 5 =====");
int wholeDivision = 7 / 2;
decimal decimalDivision = (decimal)7 / 2;
Console.WriteLine($"7 / 2 as int: {wholeDivision}");
Console.WriteLine($"7 / 2 as decimal: {decimalDivision}");
// Use decimal for a delivery fee split three ways so the fractional amount is not truncated.

// EXERCISE 6
Console.WriteLine();
Console.WriteLine("===== EXERCISE 6 =====");
// Integers are value types, so assigning one to another copies the value.
int originalNumber = 10;
int copiedNumber = originalNumber;
copiedNumber = 20;
Console.WriteLine($"Original integer: {originalNumber}");
Console.WriteLine($"Copied integer: {copiedNumber}");

// Lists are reference types, so assigning one list to another copies the reference.
List<string> originalFoods = new() { "Burger", "Pizza" };
List<string> copiedFoods = originalFoods;
copiedFoods.Add("Salad");
Console.WriteLine($"Original list: {string.Join(", ", originalFoods)}");
Console.WriteLine($"Copied list: {string.Join(", ", copiedFoods)}");

// EXERCISE 7
Console.WriteLine();
Console.WriteLine("===== EXERCISE 7 =====");
string? possiblyNullText = null;
int explicitLength = possiblyNullText is null ? 0 : possiblyNullText.Length;
int coalescingLength = possiblyNullText?.Length ?? 0;
int? conditionalLength = possiblyNullText?.Length;
Console.WriteLine($"Explicit null check length: {explicitLength}");
Console.WriteLine($"?? length: {coalescingLength}");
Console.WriteLine($"?. length: {conditionalLength}");

// EXERCISE 8
Console.WriteLine();
Console.WriteLine("===== EXERCISE 8 =====");
Console.Write("Enter an ETB amount: ");
string amountInput = Console.ReadLine() ?? string.Empty;

if (decimal.TryParse(amountInput, out decimal etbAmount) && etbAmount > 0)
{
    Console.WriteLine($"Amount: ETB {etbAmount:N2}");
}
else
{
    Console.WriteLine("Please enter a positive number.");
}
