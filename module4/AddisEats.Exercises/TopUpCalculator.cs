using System;
using System.Collections.Generic;

namespace AddisEats.Exercises;

public static class TopUpCalculator
{
    private const int NumberOfTopUps = 5;
    private const decimal MaximumAmount = 5000m;

    public static void Run()
    {
        Console.WriteLine();
        Console.WriteLine("===== TELEBIRR TOP-UP CALCULATOR =====");

        List<TopUp> topUps = new();

        for (int i = 1; i <= NumberOfTopUps; i++)
        {
            Console.WriteLine();
            Console.WriteLine($"Top-up {i} of {NumberOfTopUps}");

            Console.Write("Customer name: ");
            string customerName = Console.ReadLine()?.Trim() ?? string.Empty;
            if (string.IsNullOrWhiteSpace(customerName))
            {
                customerName = $"Customer {i}";
            }

            Console.Write("Network: ");
            string network = Console.ReadLine()?.Trim() ?? string.Empty;
            if (string.IsNullOrWhiteSpace(network))
            {
                network = "Other";
            }

            decimal? amount = ReadValidAmount();
            if (amount is null)
            {
                Console.WriteLine("Input ended before five top-ups were entered.");
                break;
            }

            topUps.Add(new TopUp(customerName, network, amount.Value));
        }

        PrintSummary(topUps);
    }

    private static decimal? ReadValidAmount()
    {
        while (true)
        {
            Console.Write("Amount in ETB: ");
            string? input = Console.ReadLine();

            if (input is null)
            {
                return null;
            }

            if (decimal.TryParse(input, out decimal amount) && amount > 0m && amount <= MaximumAmount)
            {
                return amount;
            }

            Console.WriteLine("Invalid amount. Enter a number greater than 0 and no more than ETB 5,000.00.");
        }
    }

    private static void PrintSummary(List<TopUp> topUps)
    {
        Console.WriteLine();
        Console.WriteLine("Customer                 Network             Amount       Bonus      Extra       Total");
        Console.WriteLine("----------------------------------------------------------------------------------------");

        decimal grandTotal = 0m;

        foreach (TopUp topUp in topUps)
        {
            decimal bonusRate = topUp.Network.Trim().ToLowerInvariant() switch
            {
                "ethio telecom" => 0.05m,
                "safaricom" => 0.03m,
                _ => 0m
            };

            decimal bonus = topUp.Amount * bonusRate;
            decimal extra = topUp.Amount >= 1000m ? 20m : 0m;
            decimal total = topUp.Amount + bonus + extra;
            grandTotal += total;

            Console.WriteLine(
                $"{topUp.CustomerName,-24}{topUp.Network,-20}{topUp.Amount,10:N2}{bonus,11:N2}{extra,11:N2}{total,12:N2}");
        }

        Console.WriteLine("----------------------------------------------------------------------------------------");
        Console.WriteLine($"Grand total:{grandTotal,74:N2}");
    }

    private sealed record TopUp(string CustomerName, string Network, decimal Amount);
}
