using AddisEats.Api.Models;

namespace AddisEats.Api.Data;

public static class SeedData
{
    public static List<Restaurant> Restaurants() => new()
    {
        // Bole (5)
        new Restaurant { Id = 1,  Name = "Abay Grill",              Area = "Bole",      DeliveryFeeEtb = 60m,  OwnerPhone = "+251900000001", CommissionRate = 0.12m },
        new Restaurant { Id = 2,  Name = "Bole Tibs House",         Area = "Bole",      DeliveryFeeEtb = 50m,  OwnerPhone = "+251900000002", CommissionRate = 0.10m },
        new Restaurant { Id = 3,  Name = "Gojo Kitfo",              Area = "Bole",      DeliveryFeeEtb = 70m,  OwnerPhone = "+251900000003", CommissionRate = 0.15m },
        new Restaurant { Id = 4,  Name = "Selam Shiro Bet",         Area = "Bole",      DeliveryFeeEtb = 45m,  OwnerPhone = "+251900000004", CommissionRate = 0.10m },
        new Restaurant { Id = 5,  Name = "Wegagen Pizza",           Area = "Bole",      DeliveryFeeEtb = 80m,  OwnerPhone = "+251900000005", CommissionRate = 0.13m },
        // Kazanchis (3)
        new Restaurant { Id = 6,  Name = "Enat Injera House",       Area = "Kazanchis", DeliveryFeeEtb = 55m,  OwnerPhone = "+251900000006", CommissionRate = 0.11m },
        new Restaurant { Id = 7,  Name = "Yeshi Buna Cafe",         Area = "Kazanchis", DeliveryFeeEtb = 40m,  OwnerPhone = "+251900000007", CommissionRate = 0.12m },
        new Restaurant { Id = 8,  Name = "Ras Dashen Buffet",       Area = "Kazanchis", DeliveryFeeEtb = 90m,  OwnerPhone = "+251900000008", CommissionRate = 0.14m },
        // Piassa (2)
        new Restaurant { Id = 9,  Name = "Lalibela Doro Wat House", Area = "Piassa",    DeliveryFeeEtb = 100m, OwnerPhone = "+251900000009", CommissionRate = 0.12m },
        new Restaurant { Id = 10, Name = "Tsion Fasting Kitchen",   Area = "Piassa",    DeliveryFeeEtb = 65m,  OwnerPhone = "+251900000010", CommissionRate = 0.10m },
        // Megenagna (2)
        new Restaurant { Id = 11, Name = "Mesob Kitchen",           Area = "Megenagna", DeliveryFeeEtb = 75m,  OwnerPhone = "+251900000011", CommissionRate = 0.13m },
        new Restaurant { Id = 12, Name = "Habesha Bet",             Area = "Megenagna", DeliveryFeeEtb = 85m,  OwnerPhone = "+251900000012", CommissionRate = 0.15m }
    };

    private static readonly (string Name, decimal Price)[] Mains =
    {
        ("Doro Wat", 450m), ("Kitfo", 520m), ("Shiro", 180m), ("Tibs", 380m),
        ("Firfir", 220m), ("Gomen", 160m), ("Dulet", 300m)
    };

    private static readonly (string Name, decimal Price)[] Drinks =
    {
        ("Buna", 40m), ("Tej", 120m), ("Fresh Juice", 80m), ("Spris", 90m)
    };

    // Six items per restaurant: four mains, one drink, then a dessert (even index)
    // or a second drink (odd index). Odd-index restaurants have NO dessert - useful for testing.
    public static List<RestaurantMenuItem> MenuItemsFor(IReadOnlyList<Restaurant> restaurants)
    {
        var items = new List<RestaurantMenuItem>();
        int nextId = 1;

        void Add(int restaurantId, string name, string category, decimal price)
            => items.Add(new RestaurantMenuItem
            {
                Id = nextId++,
                RestaurantId = restaurantId,
                Name = name,
                Category = category,
                PriceEtb = price
            });

        for (int i = 0; i < restaurants.Count; i++)
        {
            int rid = restaurants[i].Id;
            decimal bump = (i % 3) * 10m;   // prices differ a little between restaurants

            for (int k = 0; k < 4; k++)
            {
                var main = Mains[(i + k) % Mains.Length];
                Add(rid, main.Name, "Main", main.Price + bump);
            }

            var drink = Drinks[i % Drinks.Length];
            Add(rid, drink.Name, "Drinks", drink.Price + bump);

            if (i % 2 == 0)
            {
                Add(rid, "Chocolate Cake", "Dessert", 110m + bump);
            }
            else
            {
                var other = Drinks[(i + 1) % Drinks.Length];
                Add(rid, other.Name, "Drinks", other.Price + bump);
            }
        }

        return items;
    }
}