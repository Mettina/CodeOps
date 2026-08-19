import sys

# ==========================================
# DATA STRUCTURE SETUP
# ==========================================

# 1. Customer Database using a Dictionary
# Fast lookup by account number
# Key: Account Number (String) -> Value: Customer Name (String)
customer_db = {
    "1000123": "Almaz Ayana",
    "1000456": "Bekele Gerba",
    "1000789": "Chala Shiferaw",
    "1000111": "Desta Kebede",
    "1000222": "Eskinder Nega"
}

# 2. Transaction History using a List as a Stack
# Supports Last-In, First-Out (LIFO) for undo capability
transaction_history = []


# ==========================================
# BANK OPERATIONS (with Big-O Analysis)
# ==========================================

def make_transaction():
    """
    Simulates making a banking transaction and logs it to the history stack.
    Time Complexity: O(1) Constant Time
    Why: Appending an element to the end of a dynamic array (list) is an O(1) operation.
    """
    print("\n--- Make a New Transaction ---")
    acc_num = input("Enter customer account number: ").strip()
    
    # Verify customer exists before proceeding
    if acc_num not in customer_db: # O(1) Lookup
        print("Error: Account number not found in Addis Bank records.")
        return
        
    amount = input(f"Enter transaction amount for {customer_db[acc_num]} (ETB): ").strip()
    
    try:
        amount = float(amount)
    except ValueError:
        print("Error: Invalid currency amount.")
        return

    # Record transactional context onto the Stack
    transaction = {"account": acc_num, "amount": amount, "name": customer_db[acc_num]}
    transaction_history.append(transaction) # O(1) push operation
    
    print(f"Success: Deposited/Withdrawn {amount} ETB for {customer_db[acc_num]}.")


def undo_transaction():
    """
    Pops the most recent transaction off the history stack to undo it.
    Time Complexity: O(1) Constant Time
    Why: Popping the last item from a list requires no shifting of elements.
    """
    print("\n--- Undo Last Transaction ---")
    
    if not transaction_history: # O(1) check
        print("Warning: No recent transactions found in history to undo.")
        return
        
    # Remove the top item from the stack
    last_tx = transaction_history.pop() # O(1) pop operation
    
    print(f"Undo Successful: Reversed transaction of {last_tx['amount']} ETB for {last_tx['name']} (Acc: {last_tx['account']}).")


def search_customer():
    """
    Finds and displays a customer's profile instantly.
    Time Complexity: O(1) Constant Time
    Why: Dictionary lookups use an internal hash table, bypassing sequential array scans.
    """
    print("\n--- Search Customer ---")
    acc_num = input("Enter 7-digit account number to search: ").strip()
    
    # Instantaneous key assessment
    if acc_num in customer_db: # O(1) Key Membership Check
        print(f"Customer Found: {customer_db[acc_num]} (Account: {acc_num})")
    else:
        print("Error: No matching profile found in Addis Bank database.")


# ==========================================
# MAIN INTERFACE LOOP
# ==========================================
def main():
    while True:
        print("\n==================================")
        print("  ADDIS BANK CUSTOMER SERVICE  ")
        print("==================================")
        print("1. Make a Transaction")
        print("2. Undo Last Transaction")
        print("3. Search Customer by Account Number")
        print("4. Exit Simulator")
        
        choice = input("Select an option (1-4): ").strip()
        
        if choice == "1":
            make_transaction()
        elif choice == "2":
            undo_transaction()
        elif choice == "3":
            search_customer()
        elif choice == "4":
            print("\nThank you for using Addis Bank Simulator. Goodbye!")
            sys.exit()
        else:
            print("Error: Invalid entry. Please enter a valid number (1-4).")

if __name__ == "__main__":
    main()
