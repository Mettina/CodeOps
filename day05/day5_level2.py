# File: day5_level2.py
# Topic: Method Overriding - Customizing the statement() method for different account types

class Account:
    """The base Account class from Day 4 featuring full encapsulation."""
    def __init__(self, account_number, name, initial_balance=0.0):
        self.__account_number = account_number
        self.__name = name
        self.__balance = float(initial_balance)

    # Getters to securely access private data fields in child classes
    def get_account_number(self):

        return self.__account_number

    def get_name(self):
        return self.__name

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False

    def statement(self):
        """Base statement method that prints general account layout details."""
        print(f"Account No: {self.__account_number}")
        print(f"Owner     : {self.__name}")
        print(f"Balance   : ${self.__balance:,.2f}")


class SavingsAccount(Account):
    """Child class representing a Savings Account with interest functionality."""
    def __init__(self, account_number, name, initial_balance, interest_rate):
        super().__init__(account_number, name, initial_balance)
        self.interest_rate = float(interest_rate)

    # OVERRIDE: Customizes the statement to include interest rate metrics
    def statement(self):
        print("               SAVINGS ACCOUNT STATEMENT          ".center(60))
        # super().statement() runs the parent code to show common properties
        super().statement()
        # Displays the specialized data unique to this specific child type
        print(f"Interest  : {self.interest_rate * 100:.1f}% Per Annum")


class CurrentAccount(Account):
    """Child class representing a Current Account with overdraft functionality."""
    def __init__(self, account_number, name, initial_balance, overdraft_limit):
        super().__init__(account_number, name, initial_balance)
        self.overdraft_limit = float(overdraft_limit)

    # OVERRIDE: Customizes the statement to incorporate overdraft parameters
    def statement(self):
        print("               CURRENT ACCOUNT STATEMENT          ".center(60))
        # super().statement() runs the parent code to show common properties
        super().statement()
        # Displays the specialized data unique to this specific child type
        print(f"Overdraft : Max Safety Cushion ${self.overdraft_limit:,.2f}")


# --- Object Verification and Output Execution ---

if __name__ == "__main__":
    # Create instances of both specialized child classes
    sav_acc = SavingsAccount("SA-1002", "Almaz Kebede", 2500.0, 0.07)
    cur_acc = CurrentAccount("CA-9902", "Bekele Lemma", 350.0, 500.0)

    # Execute the overridden statement for SavingsAccount
    print("\n[System Run] Printing Savings Summary:")
    sav_acc.statement()

    print("\n" + "="*60 + "\n")

    # Execute the overridden statement for CurrentAccount
    print("[System Run] Printing Current Summary:")
    cur_acc.statement()
    print()


# 2 Polymorphism Practice - Uniform list handling loop

class Account:
    """The base Account class from Day 4 featuring full encapsulation."""
    def __init__(self, account_number, name, initial_balance=0.0):
        self.__account_number = account_number
        self.__name = name
        self.__balance = float(initial_balance)

    # Getters to safely access internal private fields
    def get_account_number(self):
        return self.__account_number

    def get_name(self):
        return self.__name

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        """Standard deposit routine shared by all account variants."""
        if amount > 0:
            self.__balance += amount
            print(f" Successfully deposited ${amount:,.2f} into Account {self.__account_number}")
            return True
        return False

    def statement(self):
        """Base layout profile template."""
        print(f"Account No: {self.__account_number}")
        print(f"Owner     : {self.__name}")
        print(f"Balance   : ${self.__balance:,.2f}")


class SavingsAccount(Account):
    """Child class specialized for long-term savings asset tracking."""
    def __init__(self, account_number, name, initial_balance, interest_rate):
        super().__init__(account_number, name, initial_balance)
        self.interest_rate = float(interest_rate)

    # POLYMORPHIC OVERRIDE: Custom header and specialized interest rate output
    def statement(self):
        print(" SAVINGS ACCOUNT STATEMENT ".center(50))
        super().statement()
        print(f"Interest  : {self.interest_rate * 100:.1f}% Per Annum")


class CurrentAccount(Account):
    """Child class engineered for standard checking and transactional lines."""
    def __init__(self, account_number, name, initial_balance, overdraft_limit):
        super().__init__(account_number, name, initial_balance)
        self.overdraft_limit = float(overdraft_limit)

    # POLYMORPHIC OVERRIDE: Custom header and specialized overdraft cushion output
    def statement(self):
        print(" CURRENT ACCOUNT STATEMENT ".center(50))
        super().statement()
        print(f"Overdraft : Max Safety Cushion ${self.overdraft_limit:,.2f}")


# --- Polymorphism Processing Setup ---

if __name__ == "__main__":
    # Populating a uniform list collection with three unique object forms
    banking_portfolio = [
        Account("ACC-7701", "Chala Kebede", 500.0),
        SavingsAccount("SA-1002", "Almaz Kebede", 2500.0, 0.07),
        CurrentAccount("CA-9902", "Bekele Lemma", 350.0, 500.0)
    ]

    # Iterating through the collection and treating each element natively
    for account in banking_portfolio:
        print(f"\n[Processing Client: {account.get_name()}]")
        
        # Action A: Dynamically triggers matching statement structure variant
        account.statement()
        
        # Action B: Applies the same core parent calculation feature to all targets
        account.deposit(100.0)
        
        # Action C: Shows updated statement to verify deposit persistence
        print("\n--- Updated State Info ---")
        account.statement()
        print("-" * 50)


# 3 Abstract Base Classes - Enforcing uniform method requirements across structures

from abc import ABC, abstractmethod

class Account(ABC):
    """Abstract Base Class serving as the mandatory master structural blueprint."""
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = float(balance)

    @property
    def balance(self):
        return self._balance

    # MANDATORY CONTRACT: Every child class MUST build its own variant of this method
    @abstractmethod
    def calculate_interest(self):
        pass

    def statement(self):
        print(f"Owner  : {self.owner}")
        print(f"Balance: ${self._balance:,.2f}")


class SavingsAccount(Account):
    def __init__(self, owner, balance, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    # Fulfilling the abstract contract item for SavingsAccount
    def calculate_interest(self):
        earned = self._balance * self.interest_rate
        self._balance += earned
        print(f"Interest Earned: +${earned:,.2f} at {self.interest_rate * 100}%")


class CurrentAccount(Account):
    def __init__(self, owner, balance):
        super().__init__(owner, balance)

    # Fulfilling the abstract contract item for CurrentAccount (Checking lines earn no interest)
    def calculate_interest(self):
        print("Current Accounts do not accumulate interest earnings.")


# --- Object Verification and Output Execution ---

if __name__ == "__main__":
    print("--- Testing Blueprint Enforcement ---")
    try:
        # This will fail automatically because you cannot directly build an Abstract Class
        invalid_account = Account("Ghost", 500)
    except TypeError:
        print("Success: System successfully blocked direct instantiation of abstract Account class!")

    print("\n--- Processing Savings Account ---")
    sav = SavingsAccount("Bob", 1000.0, 0.05)
    sav.statement()
    sav.calculate_interest()
    sav.statement()

    print("\n--- Processing Current Account ---")
    cur = CurrentAccount("Alice", 500.0)
    cur.statement()
    cur.calculate_interest()
