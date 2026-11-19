
using System;

namespace AddisEats.Exercises;

public class Exercise4
{
    public static void Run()
    {
        decimal subtotal = 1480.5m;
        decimal deliveryFee = 60m;

        Console.WriteLine("===== EXERCISE 4 =====");
        Console.WriteLine("----- ADDIS EATS RECEIPT -----");
        Console.WriteLine($"Subtotal:     {subtotal,10:N2}");
        Console.WriteLine($"Delivery Fee: {deliveryFee,10:N2}");
        Console.WriteLine("------------------------------");
    }
}
