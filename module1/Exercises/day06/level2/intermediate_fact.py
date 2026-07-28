
# Factory Design Pattern - Simple and Understandable

class Account:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance

class SavingsAccount(Account):
    def __init__(self, owner, number, balance):
        super().__init__(owner, number, balance)
        self.account_type = "Savings"

class CurrentAccount(Account):
    def __init__(self, owner, number, balance):
        super().__init__(owner, number, balance)
        self.account_type = "Current"

class FixedDepositAccount(Account):
    def __init__(self, owner, number, balance):
        super().__init__(owner, number, balance)
        self.account_type = "Fixed Deposit"




class AccountFactory:
    """Job: Centralizes and simplifies object creation logic."""
    @staticmethod
    def create(kind, owner, number, balance):
        # Normalize text type to ensure matching validation rules
        kind = kind.strip().lower()
        
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        elif kind == "fixed deposit" or kind == "fixed":
            return FixedDepositAccount(owner, number, balance)
        else:
            print(f"Error: Unknown account kind '{kind}'")
            return None


# --- Execution Test ---
if __name__ == "__main__":
    print("--- Testing Account Factory Pattern ---")
    
    # Create different types of accounts using the factory engine
    acc1 = AccountFactory.create("savings", "Almaz Kebede", "SA-101", 5000)
    acc2 = AccountFactory.create("current", "Bekele Lemma", "CA-202", 1500)
    acc3 = AccountFactory.create("fixed deposit", "Chala Alemu", "FD-303", 10000)

    # Verify that the correct objects were built
    for acc in [acc1, acc2, acc3]:
        if acc:
            print(f"Created: {acc.owner} | Number: {acc.number} | Type: {acc.account_type}")
