# 7. Full Account Hierarchy using Abstract Classes and Property Decorators

from abc import ABC, abstractmethod

class Account(ABC):
    # Abstract Base Class providing the core foundation for all accounts.
    def __init__(self, owner, balance):
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
        # Strict protection check: Block any process attempting to pass a negative balance
        if amount < 0:
            print("Error: Account balance cannot fall below zero.")
        else:
            self.__balance = float(amount)

    # Shared deposit function rule across the hierarchy
    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited {amount:,.2f} ETB into account.")
        else:
            print("Error: Deposit amount must be a positive number.")

    # MANDATORY CONTRACT METHOD: Must be uniquely built out by every child class
    @abstractmethod
    def withdraw(self, amount):
        pass

    # Generic base layout detail routine
    def statement(self):
        print(f"Owner: {self.owner}")
        print(f"Balance: {self.balance:,.2f} ETB")


class SavingsAccount(Account):
    # Savings subclass featuring interest logic and basic withdrawal caps.
    def __init__(self, owner, balance, interest_rate=0.05):
        # Pass core data straight to the parent abstract class factory
        super().__init__(owner, balance)
        self.interest_rate = float(interest_rate)

    # Fulfilling the abstraction requirement for withdrawal actions
    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be a positive number.")
        elif amount > self.balance:
            print("Transaction Rejected: Insufficient available funds.")
        else:
            self.balance -= amount
            print(f"Withdrew {amount:,.2f} ETB from Savings.")

    def add_interest(self):
        # Calculates and applies compounding interest yields to the balance.
        interest = self.balance * self.interest_rate
        self.deposit(interest)


class CurrentAccount(Account):
    # Current subclass engineered to handle transaction limits.
    def __init__(self, owner, balance, overdraft_limit=500.0):
        # Pass core data straight to the parent abstract class factory
        super().__init__(owner, balance)
        self.overdraft_limit = float(overdraft_limit)

    # Fulfilling the abstraction requirement ensuring the balance never drops below zero
    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be a positive number.")
        # Protection rule: Overdraft limits are capped strictly by your actual cash balance to prevent negative states
        elif amount > self.balance:
            print("Transaction Rejected: Insufficient funds. Your account balance cannot go negative.")
        else:
            self.balance -= amount
            print(f"Withdrew {amount:,.2f} ETB via Current Account transaction pipeline.")


# --- Structural Execution Verification ---

if __name__ == "__main__":
    print("==================================================")
    print("--- Processing Savings Account Tier ---")
    print("==================================================")
    sav = SavingsAccount("Almaz Kebede", 1000.0, 0.06)
    sav.statement()
    sav.add_interest()
    sav.withdraw(200)
    sav.statement()

    print("\n" + "="*50 + "\n")

    print("==================================================")
    print("--- Processing Current Account Tier ---")
    print("==================================================")
    cur = CurrentAccount("Bekele Lemma", 300.0, 500.0)
    cur.statement()
    
    print("\n[Attempting Withdrawal of 600.00 ETB...]")
    cur.withdraw(600)  # This will be rejected because 600 > 300 balance
    
    print("\n[Attempting Withdrawal of 150.00 ETB...]")
    cur.withdraw(150)  # This will succeed because 150 <= 300 balance
    
    print("\n--- Final Status Summary ---")
    cur.statement()
    print("==================================================")
