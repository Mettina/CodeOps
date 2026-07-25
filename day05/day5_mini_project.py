# File: day5_bank_system.py
# Topic: Full Menu-Driven Banking System with Abstraction, Inheritance, and Polymorphism

from abc import ABC, abstractmethod

class Account(ABC):
    """Abstract Base Class providing the core foundation for all accounts."""
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
        # Allow negative balance only for Current Accounts with overdraft
        if amount >= 0 or hasattr(self, 'overdraft_limit'):
            self.__balance = float(amount)
        else:
            print("Action Denied: Balance cannot be negative.")

    def deposit(self, amount):
        """Shared deposit function across all account types."""
        if amount > 0:
            self.__balance += amount
            print(f"Successfully deposited ${amount:,.2f}")
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
        print(f"Balance   : ${self.balance:,.2f}")


class SavingsAccount(Account):
    """Savings subclass featuring interest logic."""
    def __init__(self, account_number, owner, balance, interest_rate=0.05):
        super().__init__(account_number, owner, balance)
        self.interest_rate = float(interest_rate)

    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be positive.")
        elif amount > self.balance:
            print("Transaction Rejected: Insufficient available funds.")
        else:
            self.balance -= amount
            print(f"Successfully withdrew ${amount:,.2f} from Savings.")

    def apply_interest(self):
        """Calculates and applies compounding interest yields to the balance."""
        interest = self.balance * self.interest_rate
        self.deposit(interest)
        print(f"Interest of ${interest:,.2f} credited to Account {self.account_number}")

    def statement(self):
        print(" SAVINGS ACCOUNT STATEMENT ".center(50, "-"))
        super().statement()
        print(f"Interest  : {self.interest_rate * 100:.1f}% Per Annum")


class CurrentAccount(Account):
    """Current subclass engineered to handle transaction overshoots via overdraft."""
    def __init__(self, account_number, owner, balance, overdraft_limit=500.0):
        super().__init__(account_number, owner, balance)
        self.overdraft_limit = float(overdraft_limit)

    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be positive.")
        elif amount > self.balance + self.overdraft_limit:
            print("Transaction Rejected: Exceeds designated overdraft allocation buffer.")
        else:
            self.balance -= amount
            print(f"Successfully withdrew ${amount:,.2f} from Current Account.")

    def statement(self):
        print(" CURRENT ACCOUNT STATEMENT ".center(50, "-"))
        super().statement()
        print(f"Overdraft : Max Safety Cushion ${self.overdraft_limit:,.2f}")


# Bonus Challenge: FixedDepositAccount inheriting from SavingsAccount
class FixedDepositAccount(SavingsAccount):
    """A specialized savings account with a locked period where withdrawal is blocked."""
    def __init__(self, account_number, owner, balance, interest_rate=0.08, lock_in_months=12):
        # Fixed deposits typically offer higher interest rates (e.g., 8%)
        super().__init__(account_number, owner, balance, interest_rate)
        self.lock_in_months = lock_in_months
        self.is_locked = True  # Simulated lock status for safety

    def withdraw(self, amount):
        # Override withdrawal to restrict access to locked money
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
    # Dictionary storage structure mapping account_number string -> Account Object
    accounts = {}

    while True:
        print("\n=== Addis Bank Management System ===")
        print("1. Create Savings Account")
        print("2. Create Current Account")
        print("3. Deposit")
        print("4. Withdraw")
        print("5. Show Statement")
        print("6. Apply Interest to All Savings Accounts")
        print("7. Show All Accounts (Polymorphism)")
        print("8. Exit")

        choice = input("Enter choice (1-8): ").strip()

        if choice == '1':
            acc_num = input("Enter account number: ").strip()
            if acc_num in accounts:
                print("Error: This account number already exists.")
                continue
            name = input("Enter owner name: ").strip()
            bal = float(input("Enter initial balance: "))
            
            is_fixed = input("Is this a Fixed Deposit account? (y/n): ").strip().lower()
            if is_fixed == 'y':
                accounts[acc_num] = FixedDepositAccount(acc_num, name, bal)
                print("Fixed Deposit Account created successfully!")
            else:
                accounts[acc_num] = SavingsAccount(acc_num, name, bal)
                print("Savings Account created successfully!")

        elif choice == '2':
            acc_num = input("Enter account number: ").strip()
            if acc_num in accounts:
                print("Error: This account number already exists.")
                continue
            name = input("Enter owner name: ").strip()
            bal = float(input("Enter initial balance: "))
            limit = float(input("Enter overdraft limit: "))
            accounts[acc_num] = CurrentAccount(acc_num, name, bal, limit)
            print("Current Account created successfully!")

        elif choice in ['3', '4', '5']:
            acc_num = input("Enter account number: ").strip()
            if acc_num not in accounts:
                print("Error: Account not found.")
                continue
            
            target_acc = accounts[acc_num]

            if choice == '3':
                amt = float(input("Enter deposit amount: "))
                target_acc.deposit(amt)
            elif choice == '4':
                amt = float(input("Enter withdrawal amount: "))
                target_acc.withdraw(amt)
            elif choice == '5':
                target_acc.statement()

        elif choice == '6':
            print("\nApplying interest batches...")
            # Loop through all values to find savings types
            for acc in accounts.values():
                # isinstance checks if the account is a SavingsAccount or FixedDepositAccount
                if isinstance(acc, SavingsAccount):
                    acc.apply_interest()

        elif choice == '7':
            if not accounts:
                print("No accounts exist in the bank system yet.")
                continue
            print("\n--- Displaying All Register Records via Polymorphism ---")
            # Polymorphic loop calling statement() on different structures smoothly
            for acc in accounts.values():
                acc.statement()
                print()

        elif choice == '8':
            print("Thank you for using Addis Bank Management System. Goodbye!")
            break
        else:
            print("Invalid selection! Please enter a choice between 1 and 8.")


if __name__ == "__main__":
    main()
