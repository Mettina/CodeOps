#  Full SOLID Refactoring 

from abc import ABC, abstractmethod

#  DEPENDENCY INVERSION PRINCIPLE (DIP) & INTERFACE SEGREGATION PRINCIPLE (ISP)
# Small, focused interfaces mean classes only depend on what they actually use.

class FileSaverInterface(ABC):
    @abstractmethod
    def save(self, owner, balance): 
        pass

class EmailInterface(ABC):
    @abstractmethod
    def send_email(self, owner, message): 
        pass

class InterestInterface(ABC):
    @abstractmethod
    def add_interest(self): 
        pass


#  SINGLE RESPONSIBILITY PRINCIPLE (SRP)
# FileSaver only handles I/O, EmailService only handles notifications.

class FileSaver(FileSaverInterface):
    def save(self, owner, balance):
        with open("records.txt", "a", encoding="utf-8") as file:
            file.write(f"{owner}: {balance:,.2f} ETB\n")
        print(f" Saved {balance:,.2f} ETB to record file.")

class EmailService(EmailInterface):
    def send_email(self, owner, message):
        print(f" Sent email to {owner}: {message}")


#  OPEN/CLOSED PRINCIPLE (OCP) & LISKOV SUBSTITUTION PRINCIPLE (LSP)
# Account is open for extension via subclasses but closed to modifications.
# Any concrete account type can substitute the abstract Account safely.

class Account(ABC):
    def __init__(self, owner, balance, file_saver: FileSaverInterface, email_service: EmailInterface):
        self.owner = owner
        self.balance = balance
        self.saver = file_saver
        self.emailer = email_service

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited: {amount:,.2f} ETB")
        self.saver.save(self.owner, self.balance)
        self.emailer.send_email(self.owner, f"Deposited {amount:,.2f} ETB")

    @abstractmethod
    def withdraw(self, amount): 
        pass


# SavingsAccount cleanly implements InterestInterface (ISP)
class SavingsAccount(Account, InterestInterface):
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew: {amount:,.2f} ETB")
            self.saver.save(self.owner, self.balance)
        else:
            print("Error: Insufficient funds.")

    def add_interest(self):
        interest = self.balance * 0.07  # Standard 7% Commercial Bank of Ethiopia savings rate
        self.balance += interest
        print(f"Added Interest: {interest:,.2f} ETB")
        self.saver.save(self.owner, self.balance)


# CurrentAccount does not support interest, ignoring InterestInterface safely (ISP)
class CurrentAccount(Account):
    def __init__(self, owner, balance, file_saver, email_service, overdraft=5000):
        super().__init__(owner, balance, file_saver, email_service)
        self.overdraft = overdraft  # Overdraft buffer in ETB

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self.balance -= amount
            print(f"Withdrew: {amount:,.2f} ETB (Overdraft used)")
            self.saver.save(self.owner, self.balance)
        else:
            print("Error: Overdraft exceeded.")


# --- Execution Test Block ---
if __name__ == "__main__":
    saver = FileSaver()
    emailer = EmailService()

    print("--- Almaz's Savings Account ---")
    savings_acc = SavingsAccount("Almaz Kebede", 2000, saver, emailer)
    savings_acc.deposit(500)
    savings_acc.add_interest()

    print("\n--- Bekele's Current Account ---")
    current_acc = CurrentAccount("Bekele Lemma", 100, saver, emailer, 5000)
    current_acc.withdraw(400)
