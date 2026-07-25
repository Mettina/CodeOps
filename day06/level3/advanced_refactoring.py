#  Open/Closed Principle & Factory Pattern Extension

from abc import ABC, abstractmethod

# 1. Base Abstract Class (Closed for modification)
class Account(ABC):
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = float(balance)

    @abstractmethod
    def statement(self): pass


# Existing Account Types (Untouched)
class SavingsAccount(Account):
    def statement(self):
        print(f"Savings Account | Owner: {self.owner} | Balance: ${self.balance:,.2f}")

class CurrentAccount(Account):
    def statement(self):
        print(f"Current Account | Owner: {self.owner} | Balance: ${self.balance:,.2f}")



class InvestmentAccount(Account):
    """New account type added to the system under the Open/Closed Principle."""
    def __init__(self, owner, balance, risk_profile="Medium"):
        super().__init__(owner, balance)
        self.risk_profile = risk_profile

    def statement(self):
        print(f"Investment Account | Owner: {self.owner} | Balance: ${self.balance:,.2f} | Risk: {self.risk_profile}")


# 2. Account Factory (Open for extension to handle the new product type)
class AccountFactory:
    @staticmethod
    def create(kind, owner, balance):
        kind = kind.lower().strip()
        
        if kind == "savings":
            return SavingsAccount(owner, balance)
        elif kind == "current":
            return CurrentAccount(owner, balance)
        # Adding support for the new investment account option here
        elif kind == "investment":
            return InvestmentAccount(owner, balance, risk_profile="High-Growth")
        else:
            print("Error: Unknown account type.")
            return None


if __name__ == "__main__":
    print("--- Testing Factory Extension (OCP Compliance) ---")
    
    # Building existing accounts
    acc1 = AccountFactory.create("savings", "Almaz Kebede", 3000)
    acc2 = AccountFactory.create("current", "Bekele Lemma", 1500)
    
    # Building our brand new investment account seamlessly
    acc3 = AccountFactory.create("investment", "Chala Alemu", 12500)

    # Polymorphic loop handles the new type naturally without changes
    for acc in [acc1, acc2, acc3]:
        if acc:
            acc.statement()
