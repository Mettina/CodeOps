import json

inventory = {}
FILENAME = "inventory.txt"


def add_product():
    """Adds a new product with a starting quantity to the inventory."""
    name = input("Enter product name: ").strip()
    try:
        quantity = int(input("Enter starting quantity: "))
        inventory[name] = quantity
        print(f" Added '{name}' with quantity {quantity}.")
    except ValueError:
        print(" Quantity must be a whole number.")

def update_quantity():
    """Updates the quantity of an existing product."""
    name = input("Enter product name to update: ").strip()
    if name not in inventory:
        print(f" '{name}' was not found in the inventory.")
        return
    try:
        quantity = int(input("Enter new quantity: "))
        inventory[name] = quantity
        print(f" Updated '{name}' to quantity {quantity}.")
    except ValueError:
        print(" Quantity must be a whole number.")


def view_products():
    """Prints every product currently in the inventory."""
    if not inventory:
        print(" The inventory is currently empty.")
        return
    print("\n Current Inventory:")
    for product, quantity in inventory.items():
        print(f"   {product:<15} -> {quantity} units")


def save_to_file():
    """Saves the inventory dictionary to a file using JSON format."""
    try:
        with open(FILENAME, "w") as file:
            json.dump(inventory, file)
        print(f" Inventory saved to {FILENAME}.")
    except Exception as error:
        print(f" Could not save file: {error}")


def load_from_file():
    """Loads the inventory dictionary back from the file, if it exists."""
    global inventory
    try:
        with open(FILENAME, "r") as file:
            inventory = json.load(file)
        print(f" Inventory loaded from {FILENAME}.")
    except FileNotFoundError:
        print(f" {FILENAME} was not found. Nothing to load yet.")
    except Exception as error:
        print(f" Could not load file: {error}")


def show_menu():
    """Prints the menu options."""
    print("\n******* Inventory Manager *******")
    print("1. Add new product")
    print("2. Update quantity")
    print("3. View all products")
    print("4. Save to file")
    print("5. Load from file")
    print("6. Exit")


while True:
    show_menu()
    choice = input("Choose an option (1-6): ")

    if choice == "1":
        add_product()
    elif choice == "2":
        update_quantity()
    elif choice == "3":
        view_products()
    elif choice == "4":
        save_to_file()
    elif choice == "5":
        load_from_file()
    elif choice == "6":
        print(" Exiting Inventory Manager!")
        break
    else:
        print(" Invalid choice. Please enter a number from 1 to 6.")