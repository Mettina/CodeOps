
#  Interface Segregation Principle (ISP) - Simple Version

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
    def __init__(self, owner, balance, interest_rate=0.05):
        super().__init__(owner, balance)
        self.interest_rate = interest_rate

    def calculate_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"Added ${interest} interest to {self.owner}'s account.")


# CurrentAccount ONLY uses standard Account details (It completely ignores interest)
class CurrentAccount(Account):
    pass


# --- Execution Test ---
if __name__ == "__main__":
    # Create both account types
    sav = SavingsAccount("Almaz Kebede", 2000, 0.05)
    cur = CurrentAccount("Bekele Lemma", 500)

    # Apply interest only to the savings account
    sav.calculate_interest()
    print(f"Almaz New Balance: ${sav.balance}")

    # Notice: cur.calculate_interest() cannot be called. 
    # CurrentAccount is completely safe from carrying useless code!
