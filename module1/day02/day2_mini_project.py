def add_income(balance):
    # Asks user for income amount and returns the updated balance.
    try:
        amount = float(input("Enter income amount (ETB): "))
        if amount < 0:
            print("Amount cannot be negative.")
            return balance
        
        new_balance = balance + amount
        print(f"Successfully added {amount:.2f} ETB to your income.")
        return new_balance
    except ValueError:
        print("Invalid input. Please enter a valid numerical number.")
        return balance


def add_expense(balance):
    # Asks user for expense amount and returns the updated balance.
    try:
        amount = float(input("Enter expense amount (ETB): "))
        if amount < 0:
            print("Amount cannot be negative.")
            return balance
        if amount > balance:
            print(f"Warning! This expense ({amount:.2f} ETB) exceeds your current balance ({balance:.2f} ETB).")
            return balance
            
        new_balance = balance - amount
        print(f"Successfully recorded expense of {amount:.2f} ETB.")
        return new_balance
    except ValueError:
        print("Invalid input. Please enter a valid numerical number.")
        return balance

#Bonus: Save balance to a variable and show summary at the end.
def show_balance(balance):
    # Prints the current total balance.
    print("\n-------------------------")
    print(f"Current Balance: {balance:.2f} ETB")
    print("-------------------------")


def show_final_summary(initial_balance, final_balance):
    
    print("\n==============================")
    print("      FINANCIAL SUMMARY       ")
    print("==============================")
    print(f"Starting Balance: {initial_balance:.2f} ETB")
    print(f"Ending Balance:   {final_balance:.2f} ETB")
    
    net_change = final_balance - initial_balance
    if net_change > 0:
        print(f"Net Savings:      +{net_change:.2f} ETB")
    elif net_change < 0:
        print(f"Net Spending:     -{abs(net_change):.2f} ETB")
    else:
        print("Net Change:        0.00 ETB ")
    print("==============================\nThank you for tracking your finances!")


def run_finance_tracker():
    # Main program loop handling the menu selection and system flow.
    balance = 0.0
    starting_balance = balance  
    
    while True:
        print("\n     Personal Finance Tracker ")
        print("1. Add Income")
        print("2. Add Expense")
        print("3. Show Balance")
        print("4. Exit")
        
        try:
            choice = int(input("Choose an option (1-4): "))
            
            if choice == 1:
                balance = add_income(balance)
            elif choice == 2:
                balance = add_expense(balance)
            elif choice == 3:
                 
                show_balance(balance)
            elif choice == 4:
                show_final_summary(starting_balance, balance)
                break  
            else:
                print("Invalid choice. Please select a number between 1 and 4.")
                
        except ValueError:
            print("Invalid input. Please enter a choice using numbers only.")


# Start the application
if __name__ == "__main__":
    run_finance_tracker()
