# Create a list of numbers
numbers = [10, 25, 40, 15, 60, 30]

print("Original List:", numbers)

# Print only numbers greater than 30
print("\nNumbers greater than 30:")
for num in numbers:
    if num > 30:
        print(num)

# Sort the list and print it
sorted_numbers = sorted(numbers)
print("\nSorted List:", sorted_numbers)

# Find sum and average
total_sum = sum(numbers)
average = total_sum / len(numbers) if numbers else 0
print(f"\nSum: {total_sum}")
print(f"Average: {average:.2f}")

# 5. DICTIONARY OPERATIONS


# Updated dictionary of products and prices in Ethiopian Birr (ETB)
products = {
    "Refrigerator": 45000,
    "Microwave": 12000,
    "Air Conditioner": 55000,
    "Washing Machine": 30000,
    "Vacuum Cleaner": 8000
}

print("\nProduct List with Prices (ETB):")
for product, price in products.items():
    print(f" - {product:<18} : {price:,} ETB")

# Ask user for a product name and show its price
user_input = input("\nEnter a product name to check its price: ").strip()
price = products.get(user_input, "Product not found.")
if isinstance(price, int):
    print(f"Price of {user_input}: {price:,} ETB")
else:
    print(price)


# 6. LIST COMPREHENSION


# List of numbers from 1 to 20
list_1_to_20 = [i for i in range(1, 21)]
print("\nList from 1 to 20:", list_1_to_20)

# Even numbers from 1 to 30
even_numbers = [i for i in range(1, 31) if i % 2 == 0]
print("Even numbers from 1 to 30:", even_numbers)

# Odd numbers from 1 to 10
odd_numbers = [i for i in range(1, 11) if i % 2 != 0]
print("Odd numbers from 1 to 10:", odd_numbers)