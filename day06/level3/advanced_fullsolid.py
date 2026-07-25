#  Full SOLID Refactoring

from abc import ABC, abstractmethod

class FileSaverInterface(ABC):
    @abstractmethod
    def save(self, owner, balance): pass

class EmailInterface(ABC):
    @abstractmethod
    def send_email(self, owner, message): pass

class InterestInterface(ABC):
    @abstractmethod
    def add_interest(self): pass


class FileSaver(FileSaverInterface):
    def save(self, owner, balance):
        with open("records.txt", "a") as file:
            file.write(f"{owner}: ${balance}\n")
        print(f" Saved ${balance} to record file.")

class EmailService(EmailInterface):
    def send_email(self, owner, message):
        print(f" Sent email to {owner}: {message}")


class Account(ABC):
    def __init__(self, owner, balance, file_saver: FileSaverInterface, email_service: EmailInterface):
        self.owner = owner
        self.balance = balance
        self.saver = file_saver
        self.emailer = email_service

    def deposit(self, amount):
        self.balance += amount
        print(f"Deposited: ${amount}")
        self.saver.save(self.owner, self.balance)
        self.emailer.send_email(self.owner, f"Deposited ${amount}")

    @abstractmethod
    def withdraw(self, amount): pass


class SavingsAccount(Account, InterestInterface):
    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew: ${amount}")
            self.saver.save(self.owner, self.balance)
        else:
            print("Error: Insufficient funds.")

    def add_interest(self):
        interest = self.balance * 0.05
        self.balance += interest
        print(f"Added Interest: ${interest}")
        self.saver.save(self.owner, self.balance)


class CurrentAccount(Account):
    def __init__(self, owner, balance, file_saver, email_service, overdraft=500):
        super().__init__(owner, balance, file_saver, email_service)
        self.overdraft = overdraft

    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self.balance -= amount
            print(f"Withdrew: ${amount} (Overdraft used)")
            self.saver.save(self.owner, self.balance)
        else:
            print("Error: Overdraft exceeded.")


if __name__ == "__main__":
    saver = FileSaver()
    emailer = EmailService()

    print("--- Almaz's Savings Account ---")
    savings_acc = SavingsAccount("Almaz Kebede", 2000, saver, emailer)
    savings_acc.deposit(500)
    savings_acc.add_interest()

    print("\n--- Bekele's Current Account ---")
    current_acc = CurrentAccount("Bekele Lemma", 100, saver, emailer, 500)
    current_acc.withdraw(400)
