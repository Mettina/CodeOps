#
# DAY 2 MINI-PROJECT
# Original file: day2_mini_project(1).py
#

#Personal Finance Tracker (Day 2 Project) 
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


#
# DAY 3 MINI-PROJECT
# Original file: day3_mini_project(1).py
#

#10. Full Program – Inventory Manager
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

#
# DAY 4 MINI-PROJECT
# Original file: day4_mini_project(1).py
#

# Addis Bank Account System (Version 1) 
class BankAccount:
    def __init__(self, account_number, name, initial_balance=0.0):
        self.__account_number = account_number
        self.__name = name
        self.__balance = float(initial_balance)

    # Getters for encapsulated data
    def get_account_number(self):
        return self.__account_number

    def get_name(self):
        return self.__name

    def get_balance(self):
        return self.__balance

    # Deposit method with validation
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than zero.\n")
        self.__balance += amount
        return self.__balance

    # Withdraw method with minimum balance validation
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero.\n")
        
        # Check if the remaining balance would drop below 50 Birr
        if self.__balance - amount < 50.0:
            raise ValueError("Transaction rejected. You must keep a minimum balance of 50 Birr in your account.\n")
            
        self.__balance -= amount
        return self.__balance

    def view_info(self):
        return f"Account No: {self.__account_number} | Owner: {self.__name} | Balance: {self.__balance:.2f} ETB\n"


#  SavingsAccount inheriting from BankAccount
class SavingsAccount(BankAccount):
    def __init__(self, account_number, name, initial_balance=0.0, interest_rate=0.02):
        super().__init__(account_number, name, initial_balance)
        self.__interest_rate = interest_rate

    def add_interest(self):
        interest = self.get_balance() * self.__interest_rate
        self.deposit(interest)
        return interest

    def view_info(self):
        base_info = super().view_info()
        cleaned_base = base_info.replace("\n", "")
        return f"{cleaned_base} | Type: Savings (Rate: {self.__interest_rate*100}%)\n"


# Menu-Driven Program
def main():
    accounts = {}

    while True:
        # Header formatting lines
        print("\n==============================")
        print("     ADDIS BANK SYSTEM        ")
        print("==============================")
        
        # Menu options listed out on separate print lines
        print("1. Create new account")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Check balance")
        print("5. View account info")
        print("6. Exit")
        print("==============================")

        choice = input("Choose an option (1-6): ")

        if choice == '1':
            acc_num = input("Enter account number: ")
            if acc_num == "":
                print("Error: Account number cannot be empty.\n")
                continue
                
            if acc_num in accounts:
                print("Error: Account number already exists.\n")
                continue
                
            name = input("Enter account holder name: ")
            if name == "":
                print("Error: Account holder name cannot be empty.\n")
                continue
                
            acc_type = input("Is this a savings account? (y/n): ")
            
            try:
                init_bal = float(input("Enter initial balance (ETB): "))
                if init_bal < 50:
                    print("Error: Initial deposit must be at least 50 Birr to open an account.\n")
                    continue
                
                if acc_type == 'y':
                    rate = float(input("Enter interest rate (e.g., 0.03 for 3%): "))
                    accounts[acc_num] = SavingsAccount(acc_num, name, init_bal, rate)
                else:
                    accounts[acc_num] = BankAccount(acc_num, name, init_bal)
                print("Account created successfully!\n")
            except ValueError:
                print("Error: Invalid numeric input.\n")

        elif choice in ['2', '3', '4', '5']:
            acc_num = input("Enter account number: ")
            if acc_num == "":
                print("Error: Account number cannot be empty.\n")
                continue
                
            if acc_num not in accounts:
                print("Error: Account not found.\n")
                continue
            
            acc = accounts[acc_num]

            if choice == '2':
                try:
                    amt = float(input("Enter amount to deposit (ETB): "))
                    acc.deposit(amt)
                    print(f"Deposited successfully. New balance: {acc.get_balance():.2f} ETB\n")
                except ValueError as e:
                    print(f"Error: {e}")

            elif choice == '3':
                try:
                    amt = float(input("Enter amount to withdraw (ETB): "))
                    acc.withdraw(amt)
                    print(f"Withdrawn successfully. New balance: {acc.get_balance():.2f} ETB\n")
                except ValueError as e:
                    print(f"Error: {e}")

            elif choice == '4':
                print(f"Current Balance: {acc.get_balance():.2f} ETB\n")

            elif choice == '5':
                print(acc.view_info())

        elif choice == '6':
            print("Exiting program.!\n")
            break
        else:
            print("Invalid choice. Please select from 1 to 6.\n")

if __name__ == "__main__":
    main()


#
# DAY 5 MINI-PROJECT
# Original file: day5_mini_project(1).py
#

# 10. Addis Bank System – Version 2
# Full Menu-Driven Banking System with Abstraction, Inheritance, and Polymorphism

from abc import ABC, abstractmethod

class Account(ABC):
    # Abstract Base Class providing the core foundation for all accounts.
    def __init__(self, account_number, owner, balance=0.0):
        self.account_number = account_number
        self.owner = owner
        # Fully encapsulated private variable
        self.__balance = float(balance)

    # Getter property to securely read the private balance
    @property
    def balance(self):
        return self.__balance
    
    # Setter property with validation rule protection
    @balance.setter
    def balance(self, amount):
        # Strict protection check: Ensure balance NEVER drops below zero
        if amount < 0:
            print("Error: Account balance cannot fall below zero.")
        else:
            self.__balance = float(amount)

    def deposit(self, amount):
        # Shared deposit function across all account types.
        if amount > 0:
            self.balance += amount
            print(f"Successfully deposited {amount:,.2f} ETB")
            return True
        print("Error: Deposit amount must be a positive number.")
        return False

    # MANDATORY CONTRACT METHOD: Must be uniquely implemented by every child class
    @abstractmethod
    def withdraw(self, amount):
        pass

    # Polymorphic method: Base layout routine overridden or extended by child classes
    def statement(self):
        print(f"Account No: {self.account_number}")
        print(f"Owner     : {self.owner}")
        print(f"Balance   : {self.balance:,.2f} ETB")


class SavingsAccount(Account):
    # Savings subclass featuring interest logic.
    def __init__(self, account_number, owner, balance, interest_rate=0.05):
        super().__init__(account_number, owner, balance)
        self.interest_rate = float(interest_rate)

    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be positive.")
        # Strict rule constraint: Must keep a minimum of 50 Birr active
        elif self.balance - amount < 50.0:
            print("Transaction Rejected: You must keep a minimum balance of 50 Birr in your account.")
        else:
            self.balance -= amount
            print(f"Successfully withdrew {amount:,.2f} ETB from Savings.")

    def apply_interest(self):
        # Calculates and applies compounding interest yields to the balance.
        interest = self.balance * self.interest_rate
        self.deposit(interest)
        print(f"Interest of {interest:,.2f} ETB credited to Account {self.account_number}")

    def statement(self):
        print(" SAVINGS ACCOUNT STATEMENT ".center(50, "-"))
        super().statement()
        print(f"Interest  : {self.interest_rate * 100:.1f}% Per Annum")


class CurrentAccount(Account):
    # Current subclass engineered to handle transaction limits.
    def __init__(self, account_number, owner, balance):
        # Overdraft parameter completely removed from constructor
        super().__init__(account_number, owner, balance)

    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be positive.")
        # Strict rule constraint: Must keep a minimum of 50 Birr active (No overdraft)
        elif self.balance - amount < 50.0:
            print("Transaction Rejected: You must keep a minimum balance of 50 Birr in your account.")
        else:
            self.balance -= amount
            print(f"Successfully withdrew {amount:,.2f} ETB from Current Account.")

    def statement(self):
        print(" CURRENT ACCOUNT STATEMENT ".center(50, "-"))
        super().statement()
        print("Account Rule: Minimum 50 Birr active balance constraint enforced.")


# Bonus Challenge: FixedDepositAccount inheriting from SavingsAccount
class FixedDepositAccount(SavingsAccount):
    # A specialized savings account with a locked period where withdrawal is blocked.
    def __init__(self, account_number, owner, balance, interest_rate=0.08, lock_in_months=12):
        super().__init__(account_number, owner, balance, interest_rate)
        self.lock_in_months = lock_in_months
        self.is_locked = True  # Simulated lock status for safety

    def withdraw(self, amount):
        if self.is_locked:
            print(f"Transaction Denied: Funds are locked for a duration of {self.lock_in_months} months.")
        else:
            super().withdraw(amount)

    def statement(self):
        print(" FIXED DEPOSIT ACCOUNT STATEMENT ".center(50, "-"))
        super().statement()
        print(f"Lock Period: {self.lock_in_months} Months (Status: Locked)")


# --- Main Menu Driven Loop ---
def main():
    accounts = {}

    while True:
        print("\n==================================")
        print("   ADDIS BANK MANAGEMENT SYSTEM   ")
        print("==================================")
        print("1. Create Savings Account")
        print("2. Create Current Account")
        print("3. Deposit")
        print("4. Withdraw")
        print("5. Show Statement")
        print("6. Apply Interest to All Savings Accounts")
        print("7. Show All Accounts (Polymorphism)")
        print("8. Exit")
        print("==================================")

        choice = input("Enter choice (1-8): ")

        if choice == '1':
            acc_num = input("Enter account number: ")
            if acc_num == "":
                print("Error: Account number cannot be empty.")
                continue
            if acc_num in accounts:
                print("Error: This account number already exists.")
                continue
            name = input("Enter owner name: ")
            if name == "":
                print("Error: Owner name cannot be empty.")
                continue
            try:
                bal = float(input("Enter initial balance (ETB): "))
                # Enforce minimum balance rule at initialization
                if bal < 50:
                    print("Error: Initial deposit must be at least 50 Birr to open an account.")
                    continue
                
                is_fixed = input("Is this a Fixed Deposit account? (y/n): ")
                if is_fixed == 'y':
                    accounts[acc_num] = FixedDepositAccount(acc_num, name, bal)
                    print("Fixed Deposit Account created successfully!")
                else:
                    accounts[acc_num] = SavingsAccount(acc_num, name, bal)
                    print("Savings Account created successfully!")
            except ValueError:
                print("Error: Invalid numeric input.")

        elif choice == '2':
            acc_num = input("Enter account number: ")
            if acc_num == "":
                print("Error: Account number cannot be empty.")
                continue
            if acc_num in accounts:
                print("Error: This account number already exists.")
                continue
            name = input("Enter owner name: ")
            if name == "":
                print("Error: Owner name cannot be empty.")
                continue
            try:
                bal = float(input("Enter initial balance (ETB): "))
                # Enforce minimum balance rule at initialization
                if bal < 50:
                    print("Error: Initial deposit must be at least 50 Birr to open an account.")
                    continue
                # Overdraft prompt completely removed
                accounts[acc_num] = CurrentAccount(acc_num, name, bal)
                print("Current Account created successfully!")
            except ValueError:
                print("Error: Invalid numeric input.")

        elif choice in ['3', '4', '5']:
            acc_num = input("Enter account number: ")
            if acc_num == "":
                print("Error: Account number cannot be empty.")
                continue
            if acc_num not in accounts:
                print("Error: Account not found.")
                continue
            
            target_acc = accounts[acc_num]

            if choice == '3':
                try:
                    amt = float(input("Enter deposit amount (ETB): "))
                    target_acc.deposit(amt)
                except ValueError:
                    print("Error: Invalid numeric input.")
            elif choice == '4':
                try:
                    amt = float(input("Enter withdrawal amount (ETB): "))
                    target_acc.withdraw(amt)
                except ValueError:
                    print("Error: Invalid numeric input.")
            elif choice == '5':
                target_acc.statement()

        elif choice == '6':
            print("\nApplying interest batches...")
            if not accounts:
                print("No accounts exist in the banking database registry to compile.")
                continue
            for acc in accounts.values():
                if isinstance(acc, SavingsAccount):
                    acc.apply_interest()

        elif choice == '7':
            if not accounts:
                print("No accounts exist in the bank system yet.")
                continue
            print("\n--- Listing All Accounts Natively ---")
            for acc in accounts.values():
                acc.statement()
                print("-" * 50)

        elif choice == '8':
            print("Exiting Addis Bank Management System. !")
            break
        else:
            print("Invalid choice. Please enter a number from 1 to 8.")

if __name__ == "__main__":
    main()


#
# DAY 6 MINI-PROJECT
# Original file: day6_mini_project.py
#

import sys
from abc import ABC, abstractmethod

class BankConfig:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = -500.0
            cls._instance.large_withdrawal_threshold = 10000.0
        return cls._instance

class TransactionObserver(ABC):
    @abstractmethod
    def update(self, account_number: str, amount: float, event_type: str):
        pass

class SMSAlertObserver(TransactionObserver):
    def update(self, account_number: str, amount: float, event_type: str):
        print(f"[SMS ALERT] Large {event_type} of ETB {amount:.2f} detected on Account {account_number}!")

class AuditLogObserver(TransactionObserver):
    def update(self, account_number: str, amount: float, event_type: str):
        print(f"[AUDIT LOG] Recorded: {event_type} of ETB {amount:.2f} on Account {account_number}.")

class Account(ABC):
    def __init__(self, account_number: str, holder_name: str, balance: float = 0.0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = balance
        self._observers = []

    def attach(self, observer: TransactionObserver):
        self._observers.append(observer)

    def notify(self, amount: float, event_type: str):
        config = BankConfig()
        if amount >= config.large_withdrawal_threshold:
            for obs in self._observers:
                obs.update(self.account_number, amount, event_type)

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        print(f"Successfully deposited ETB {amount:.2f}. New balance: ETB {self.balance:.2f}")

    @abstractmethod
    def withdraw(self, amount: float):
        pass

    @abstractmethod
    def apply_interest(self):
        pass

class SavingsAccount(Account):
    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if self.balance - amount < 0:
            raise ValueError("Insufficient funds in Savings Account.")
        self.balance -= amount
        self.notify(amount, "Withdrawal")
        print(f"Withdrew ETB {amount:.2f}. New balance: ETB {self.balance:.2f}")

    def apply_interest(self):
        config = BankConfig()
        interest = self.balance * config.interest_rate
        self.balance += interest
        print(f"Applied ETB {interest:.2f} interest to Savings {self.account_number}.")

class CheckingAccount(Account):
    def withdraw(self, amount: float):
        config = BankConfig()
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if self.balance - amount < config.overdraft_limit:
            raise ValueError("Exceeds allowed overdraft limit!")
        self.balance -= amount
        self.notify(amount, "Overdrawn Withdrawal")
        print(f"Withdrew ETB {amount:.2f}. New balance: ETB {self.balance:.2f}")

    def apply_interest(self):
        print(f"Checking account {self.account_number} earns no interest.")

class AccountFactory:
    @staticmethod
    def create_account(acc_type: str, acc_num: str, name: str, initial_deposit: float) -> Account:
        acc_type = acc_type.strip().lower()
        sms = SMSAlertObserver()
        audit = AuditLogObserver()
        
        account = None
        if acc_type == "savings":
            account = SavingsAccount(acc_num, name, initial_deposit)
        elif acc_type == "checking":
            account = CheckingAccount(acc_num, name, initial_deposit)
        else:
            raise ValueError(f"Unknown account type: '{acc_type}'")
            
        account.attach(sms)
        account.attach(audit)
        return account

class BankSystem:
    def __init__(self):
        self.accounts = {}

    def run(self):
        while True:
            print("\n=== Addis Bank System ===")
            print("1. Create Account")
            print("2. Deposit")
            print("3. Withdraw")
            print("4. Check Balance")
            print("5. Apply Interest to All Accounts")
            print("6. Exit")
            
            choice = input("Select an option (1-6): ").strip()
            try:
                if choice == '1':
                    t = input("Type (Savings/Checking): ")
                    num = input("Account Number: ")
                    name = input("Holder Name: ")
                    dep = float(input("Initial Deposit (ETB): "))
                    acc = AccountFactory.create_account(t, num, name, dep)
                    self.accounts[num] = acc
                    print("Account created successfully!")
                    
                elif choice == '2':
                    num = input("Account Number: ")
                    if num not in self.accounts: raise KeyError("Account not found.")
                    amt = float(input("Amount to deposit: "))
                    self.accounts[num].deposit(amt)
                    
                elif choice == '3':
                    num = input("Account Number: ")
                    if num not in self.accounts: raise KeyError("Account not found.")
                    amt = float(input("Amount to withdraw: "))
                    self.accounts[num].withdraw(amt)
                    
                elif choice == '4':
                    num = input("Account Number: ")
                    if num not in self.accounts: raise KeyError("Account not found.")
                    acc = self.accounts[num]
                    print(f"Holder: {acc.holder_name} | Balance: ETB {acc.balance:.2f}")
                    
                elif choice == '5':
                    for acc in self.accounts.values():
                        acc.apply_interest()
                    print("Interest operation finished.")
                    
                elif choice == '6':
                    print("Exiting Addis Bank. Goodbye!")
                    break
                else:
                    print("Invalid choice, please select between 1 and 6.")
            except Exception as e:
                print(f"[Error] {e}")

if __name__ == "__main__":
    BankSystem().run()


##
# DAY 7 MINI-PROJECT
# Original file: day7_mini_project.py
##

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


##
# DAY 8 MINI-PROJECT
# Original file: day8_mini_project.py
##

import sys

# ==========================================
# DATA STRUCTURING & DATA SETUP
# ==========================================

# Base mock transaction data
# Each transaction is represented as a dictionary: (amount, date, type)
# Date layout is YYYY-MM-DD for straightforward lexical comparison
transactions = [
    {"amount": 1500.0, "date": "2026-03-01", "type": "Deposit"},
    {"amount": 4200.0, "date": "2026-03-05", "type": "Deposit"},
    {"amount": -300.0,  "date": "2026-02-15", "type": "Withdrawal"},
    {"amount": 850.0,  "date": "2026-03-02", "type": "Deposit"},
    {"amount": -1200.0, "date": "2026-01-20", "type": "Withdrawal"}
]

# Track sorting status to validate binary search usage safely
is_sorted_by_amount = False


# ==========================================
# RECURSIVE OPERATIONS
# ==========================================

def calculate_balance_recursive(tx_list, index=0):
    """
    Computes total balance by recursively summing transaction amounts.
    Time Complexity: O(n)
    Space Complexity: O(n) due to the call stack depth.
    """
    # Base case: reached the end of the list
    if index == len(tx_list):
        return 0.0
    
    # Recursive case: current item value + sum of remaining items
    return tx_list[index]["amount"] + calculate_balance_recursive(tx_list, index + 1)


def generate_threshold_report_recursive(tx_list, threshold, index=0, report=None):
    """
    Bonus: Recursively finds all transactions above a threshold amount.
    Time Complexity: O(n)
    """
    if report is None:
        report = []
        
    # Base case
    if index == len(tx_list):
        return report
        
    # Check if absolute transaction amount meets or exceeds threshold
    if abs(tx_list[index]["amount"]) >= threshold:
        report.append(tx_list[index])
        
    # Recursive call for next index
    return generate_threshold_report_recursive(tx_list, threshold, index + 1, report)


# ==========================================
# SORTING ALGORITHM (QUICKSORT)
# ==========================================

def quicksort(tx_list, key_name):
    """
    Sorts transactions using the Quicksort algorithm.
    Time Complexity: O(n log n) average, O(n^2) worst case.
    Space Complexity: O(n) recursive stack allocation.
    """
    if len(tx_list) <= 1:
        return tx_list
    
    # Selecting the middle item as pivot
    pivot = tx_list[len(tx_list) // 2]
    
    # Partition lists based on the selected target key
    left = [x for x in tx_list if x[key_name] < pivot[key_name]]
    middle = [x for x in tx_list if x[key_name] == pivot[key_name]]
    right = [x for x in tx_list if x[key_name] > pivot[key_name]]
    
    return quicksort(left, key_name) + middle + quicksort(right, key_name)


# ==========================================
# SEARCHING ALGORITHMS
# ==========================================

def linear_search(tx_list, target_amount):
    """
    Scans sequential memory locations for an exact amount.
    Time Complexity: O(n)
    """
    results = []
    for tx in tx_list:
        if tx["amount"] == target_amount:
            results.append(tx)
    return results


def binary_search(tx_list, target_amount):
    """
    Divide-and-conquer strategy on pre-sorted data.
    Time Complexity: O(log n)
    """
    low = 0
    high = len(tx_list) - 1
    
    while low <= high:
        mid = (low + high) // 2
        mid_amount = tx_list[mid]["amount"]
        
        if mid_amount == target_amount:
            # Found an matching amount; collect any identical amounts nearby
            results = [tx_list[mid]]
            # Scan left
            left = mid - 1
            while left >= 0 and tx_list[left]["amount"] == target_amount:
                results.append(tx_list[left])
                left -= 1
            # Scan right
            right = mid + 1
            while right < len(tx_list) and tx_list[right]["amount"] == target_amount:
                results.append(tx_list[right])
                right += 1
            return results
            
        elif mid_amount < target_amount:
            low = mid + 1
        else:
            high = mid - 1
            
    return []


# ==========================================
# INTERFACE IMPLEMENTATION
# ==========================================

def print_transactions(tx_list):
    print(f"{'Date':<12} | {'Type':<12} | {'Amount (ETB)':<15}")
    print("-" * 45)
    for tx in tx_list:
        print(f"{tx['date']:<12} | {tx['type']:<12} | {tx['amount']:<15.2f}")


def main():
    global transactions, is_sorted_by_amount
    
    while True:
        print("\n==================================")
        print("  ADDIS BANK TRANSACTION ANALYZER  ")
        print("==================================")
        print("1. View All Transactions")
        print("2. Calculate Total Balance (Recursive)")
        print("3. Sort Transactions by Amount")
        print("4. Sort Transactions by Date")
        print("5. Search Transaction by Amount")
        print("6. Generate High-Value Report (Recursive Bonus)")
        print("7. Exit")
        
        choice = input("Select an option (1-7): ").strip()
        
        if choice == "1":
            print("\nCurrent Transaction Log:")
            print_transactions(transactions)
            
        elif choice == "2":
            balance = calculate_balance_recursive(transactions)
            print(f"\nTotal Calculated Balance: {balance:.2f} ETB")
            
        elif choice == "3":
            transactions = quicksort(transactions, "amount")
            is_sorted_by_amount = True
            print("\nTransactions successfully sorted by Amount (Ascending).")
            print_transactions(transactions)
            
        elif choice == "4":
            transactions = quicksort(transactions, "date")
            is_sorted_by_amount = False  # Breaking the sequence needed for amount binary search
            print("\nTransactions successfully sorted by Date (Oldest to Newest).")
            print_transactions(transactions)
            
        elif choice == "5":
            try:
                search_val = float(input("\nEnter the exact transaction amount to search: ").strip())
            except ValueError:
                print("Error: Invalid number format entered.")
                continue
                
            if is_sorted_by_amount:
                print("Notice: Running Binary Search (O(log n)) because data is sorted by amount.")
                found = binary_search(transactions, search_val)
            else:
                print("Notice: Running Linear Search (O(n)) because data is unsorted by amount.")
                found = linear_search(transactions, search_val)
                
            if found:
                print(f"\nFound {len(found)} matching record(s):")
                print_transactions(found)
            else:
                print("No transactions matched that exact amount.")
                
        elif choice == "6":
            try:
                threshold = float(input("\nEnter minimum absolute threshold amount (ETB): ").strip())
            except ValueError:
                print("Error: Invalid number format entered.")
                continue
                
            report = generate_threshold_report_recursive(transactions, threshold)
            if report:
                print(f"\nHigh-Value Report (Transactions >= {threshold} ETB):")
                print_transactions(report)
            else:
                print("No transactions found above or equal to that threshold.")
                
        elif choice == "7":
            print("\nExiting Transaction Analyzer. Goodbye!")
            sys.exit()
        else:
            print("Error: Invalid input choice.")

if __name__ == "__main__":
    main()


##DAY 9 MINI-PROJECT
# Original file: day9_mini_project.py
##

import sys
import heapq

# ==========================================
# 1. TREE COMPONENTS (Hierarchy)
# ==========================================
class BankTreeNode:
    def __init__(self, name, role=""):
        self.name = name
        self.role = role
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)

def print_tree_recursive(node, level=0):
    indent = "    " * level
    if node.role:
        print(f"{indent}- {node.name} ({node.role})")
    else:
        print(f"{indent}- {node.name}")
    for child in node.children:
        print_tree_recursive(child, level + 1)


# ==========================================
# 2. GRAPH COMPONENTS (Transfer Network)
# ==========================================
class TransferNetworkGraph:
    def __init__(self):
        self.adj_list = {}

    def add_account(self, acc_num):
        if acc_num not in self.adj_list:
            self.adj_list[acc_num] = []

    def add_transfer_link(self, acc1, acc2):
        self.add_account(acc1)
        self.add_account(acc2)
        if acc2 not in self.adj_list[acc1]:
            self.adj_list[acc1].append(acc2)
        if acc1 not in self.adj_list[acc2]:
            self.adj_list[acc2].append(acc1)

    def bfs_traversal(self, start_acc):
        """
        Traverses connected customers using Breadth-First Search (BFS).
        Time Complexity: O(V + E) where V = Vertices (accounts), E = Edges (links).
        """
        if start_acc not in self.adj_list:
            return []
        visited = set([start_acc])
        queue = [start_acc]
        result = []
        
        while queue:
            current = queue.pop(0)
            result.append(current)
            for neighbor in self.adj_list[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return result


# ==========================================
# 3. BINARY SEARCH TREE (Fast Search Database)
# ==========================================
class BSTNode:
    def __init__(self, acc_num, holder_name):
        self.acc_num = acc_num
        self.holder_name = holder_name
        self.left = None
        self.right = None

class CustomerBST:
    def __init__(self):
        self.root = None

    def insert(self, acc_num, holder_name):
        """Time Complexity: O(log n) average, O(n) worst case."""
        new_node = BSTNode(acc_num, holder_name)
        if self.root is None:
            self.root = new_node
            return
        
        current = self.root
        while True:
            if acc_num < current.acc_num:
                if current.left is None:
                    current.left = new_node
                    break
                current = current.left
            elif acc_num > current.acc_num:
                if current.right is None:
                    current.right = new_node
                    break
                current = current.right
            else:
                break # Account already exists

    def search(self, acc_num):
        """Time Complexity: O(log n) average, O(n) worst case."""
        current = self.root
        while current:
            if acc_num == current.acc_num:
                return current.holder_name
            elif acc_num < current.acc_num:
                current = current.left
            else:
                current = current.right
        return None


# ==========================================
# SYSTEM SETUP & INITIAL VALUES
# ==========================================

# Initialize Tree Hierarchy
bank_hierarchy_root = BankTreeNode("Head Office")
bole_branch = BankTreeNode("Bole Branch")
piassa_branch = BankTreeNode("Piassa Branch")
bank_hierarchy_root.add_child(bole_branch)
bank_hierarchy_root.add_child(piassa_branch)
bole_branch.add_child(BankTreeNode("Teller", "Customer Service"))

# Initialize Graph Network
transfer_network = TransferNetworkGraph()
transfer_network.add_transfer_link("1001", "1002")
transfer_network.add_transfer_link("1002", "1003")

# Initialize Priority Queue Heap
# Python's heapq is a min-heap. To create a priority system where priority 1 
# is handled first, we can push items directly as (priority_integer, description)
transaction_heap = []
heapq.heappush(transaction_heap, (2, "Standard Wire Transfer - 45,000 ETB"))
heapq.heappush(transaction_heap, (1, "CRITICAL: Corporate Liquidity Adjustment"))

# Initialize Search Database BST
customer_database = CustomerBST()
customer_database.insert("1001", "Almaz Ayana")
customer_database.insert("1002", "Bekele Gerba")
customer_database.insert("1003", "Chala Shiferaw")


# ==========================================
# INTERFACE IMPLEMENTATION
# ==========================================

def menu_add_tree():
    """Time Complexity: O(1) direct insertion once location node is chosen."""
    print("\n--- Add New Branch / Employee (Tree) ---")
    print("1. Add under Head Office")
    print("2. Add under Bole Branch")
    sub_choice = input("Select target parent node (1-2): ").strip()
    name = input("Enter name of new entry: ").strip()
    role = input("Enter role designation (leave blank if branch node): ").strip()
    
    new_node = BankTreeNode(name, role)
    if sub_choice == "1":
        bank_hierarchy_root.add_child(new_node)
        print(f"Success: Added '{name}' under Head Office.")
    elif sub_choice == "2":
        bole_branch.add_child(new_node)
        print(f"Success: Added '{name}' under Bole Branch.")
    else:
        print("Invalid allocation target selected.")

def menu_add_graph():
    """Time Complexity: O(1) list appending."""
    print("\n--- Add Money Transfer Connection (Graph) ---")
    acc1 = input("Enter sender account number: ").strip()
    acc2 = input("Enter receiver account number: ").strip()
    transfer_network.add_transfer_link(acc1, acc2)
    print(f"Success: Linked account {acc1} and account {acc2} in network database.")

def menu_show_graph():
    """Time Complexity: O(V + E) network scan mapping."""
    print("\n--- Show Connected Customers using BFS ---")
    start = input("Enter starting account number for trace lookup: ").strip()
    connected = transfer_network.bfs_traversal(start)
    if connected:
        print(f"Accessible account network path from {start}:")
        print(" -> ".join(connected))
    else:
        print("Account sequence not found or has no network connections.")

def menu_add_heap():
    """Time Complexity: O(log n) structural bubble-up operation."""
    print("\n--- Add Urgent Transaction (Heap) ---")
    try:
        priority = int(input("Enter urgency level priority (1=Highest, 5=Lowest): ").strip())
    except ValueError:
        print("Error: Priority validation score must be integer base numerals.")
        return
    details = input("Enter transaction processing details (e.g. amount, customer): ").strip()
    heapq.heappush(transaction_heap, (priority, details))
    print(f"Success: Logged urgent transaction onto high-priority processing queue.")

def menu_process_heap():
    """Time Complexity: O(log n) restructuring extraction sift-down operational loop."""
    print("\n--- Process Highest Priority Transaction ---")
    if not transaction_heap:
        print("System notice: Transaction priority queue is entirely empty.")
        return
    priority, details = heapq.heappop(transaction_heap)
    print("Dispatch processing target pipeline active:")
    print(f"Priority Level: {priority}")
    print(f"Task Details  : {details}")

def menu_search_bst():
    """Time Complexity: O(log n) tree traversal split paths."""
    print("\n--- Search for Customer Account in BST ---")
    acc = input("Enter account number to locate: ").strip()
    name = customer_database.search(acc)
    if name:
        print(f"Match Discovered! Account: {acc} | Registered Holder: {name}")
    else:
        print("Zero record entries found matching that account inside data index structures.")


def main():
    while True:
        print("\n==============================================")
        print("  ADDIS BANK NETWORK & PRIORITY SYSTEM CENTRAL ")
        print("==============================================")
        print("1. Add New Branch / Employee (Tree Hierarchy)")
        print("2. Add Money Transfer Connection (Network Graph)")
        print("3. Show Connected Customers Path (BFS Mapping)")
        print("4. Add Urgent Transaction (Priority Heap Queue)")
        print("5. Process Highest Priority Transaction (Heap Extraction)")
        print("6. Search for Customer Account (Binary Search Tree)")
        print("7. View Operational Hierarchy Map (Debug View)")
        print("8. Shutdown Application Terminal")
        
        choice = input("Select operation interface code (1-8): ").strip()
        
        if choice == "1": menu_add_tree()
        elif choice == "2": menu_add_graph()
        elif choice == "3": menu_show_graph()
        elif choice == "4": menu_add_heap()
        elif choice == "5": menu_process_heap()
        elif choice == "6": menu_search_bst()
        elif choice == "7":
            print("\n--- Present Corporate Hierarchy State ---")
            print_tree_recursive(bank_hierarchy_root)
        elif choice == "8":
            print("\nShutting down Addis Bank Central Terminal modules. Secure session closed.")
            sys.exit()
        else:
            print("System Error: Unrecognized interaction context parameters.")

if __name__ == "__main__":
    main()