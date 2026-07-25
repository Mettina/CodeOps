# Demonstrates importing and using add_tax from utils.py

from utils import add_tax  # Import the function from utils.py

def main():
    try:
        price = float(input("Enter the price: "))
        rate_input = input("Enter tax rate (press Enter for default 15%): ")

        if rate_input.strip() == "":
            total_price = add_tax(price)
        else:
            total_price = add_tax(price, float(rate_input))

        print(f"Price including tax: {total_price:.2f}")

    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()