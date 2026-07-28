#  Interface Segregation Principle (ISP) 

# Class 1: Generic base class for basic account details
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance


# Class 2: SEPARATED INTERFACE (Only accounts that earn interest will use this)
class InterestBearing:
    def calculate_interest(self):
        pass


# SavingsAccount uses BOTH Account details and Interest tools
class SavingsAccount(Account, InterestBearing):
    def __init__(self, owner, balance, interest_rate=0.07):  # Standard 7% Ethiopian savings rate
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"Added {interest:,.2f} ETB interest to {self.owner}'s account.")


# CurrentAccount ONLY uses standard Account details (It completely ignores interest)
class CurrentAccount(Account):
    pass


# --- Execution Test ---
if __name__ == "__main__":
    print("--- Testing ISP Compliant Design (Ethiopia) --- \n")

    # Create both account types with ETB balances
    sav = SavingsAccount("Almaz Kebede", 2000, 0.07)
    cur = CurrentAccount("Bekele Lemma", 500)

    # Apply interest only to the savings account
    sav.calculate_interest()
    print(f"Almaz New Balance: {sav.balance:,.2f} ETB")

    
