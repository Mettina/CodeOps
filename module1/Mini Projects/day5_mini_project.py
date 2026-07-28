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
