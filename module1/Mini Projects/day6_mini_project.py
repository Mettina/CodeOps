import sys
from abc import ABC, abstractmethod

class BankConfig:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = -500.0
            cls._instance.large_withdrawal_threshold = 10000.0
        return cls._instance

class TransactionObserver(ABC):
    @abstractmethod
    def update(self, account_number: str, amount: float, event_type: str):
        pass

class SMSAlertObserver(TransactionObserver):
    def update(self, account_number: str, amount: float, event_type: str):
        print(f"[SMS ALERT] Large {event_type} of ETB {amount:.2f} detected on Account {account_number}!")

class AuditLogObserver(TransactionObserver):
    def update(self, account_number: str, amount: float, event_type: str):
        print(f"[AUDIT LOG] Recorded: {event_type} of ETB {amount:.2f} on Account {account_number}.")

class Account(ABC):
    def __init__(self, account_number: str, holder_name: str, balance: float = 0.0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.balance = balance
        self._observers = []

    def attach(self, observer: TransactionObserver):
        self._observers.append(observer)

    def notify(self, amount: float, event_type: str):
        config = BankConfig()
        if amount >= config.large_withdrawal_threshold:
            for obs in self._observers:
                obs.update(self.account_number, amount, event_type)

    def deposit(self, amount: float):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self.balance += amount
        print(f"Successfully deposited ETB {amount:.2f}. New balance: ETB {self.balance:.2f}")

    @abstractmethod
    def withdraw(self, amount: float):
        pass

    @abstractmethod
    def apply_interest(self):
        pass

class SavingsAccount(Account):
    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if self.balance - amount < 0:
            raise ValueError("Insufficient funds in Savings Account.")
        self.balance -= amount
        self.notify(amount, "Withdrawal")
        print(f"Withdrew ETB {amount:.2f}. New balance: ETB {self.balance:.2f}")

    def apply_interest(self):
        config = BankConfig()
        interest = self.balance * config.interest_rate
        self.balance += interest
        print(f"Applied ETB {interest:.2f} interest to Savings {self.account_number}.")

class CheckingAccount(Account):
    def withdraw(self, amount: float):
        config = BankConfig()
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if self.balance - amount < config.overdraft_limit:
            raise ValueError("Exceeds allowed overdraft limit!")
        self.balance -= amount
        self.notify(amount, "Overdrawn Withdrawal")
        print(f"Withdrew ETB {amount:.2f}. New balance: ETB {self.balance:.2f}")

    def apply_interest(self):
        print(f"Checking account {self.account_number} earns no interest.")

class AccountFactory:
    @staticmethod
    def create_account(acc_type: str, acc_num: str, name: str, initial_deposit: float) -> Account:
        acc_type = acc_type.strip().lower()
        sms = SMSAlertObserver()
        audit = AuditLogObserver()
        
        account = None
        if acc_type == "savings":
            account = SavingsAccount(acc_num, name, initial_deposit)
        elif acc_type == "checking":
            account = CheckingAccount(acc_num, name, initial_deposit)
        else:
            raise ValueError(f"Unknown account type: '{acc_type}'")
            
        account.attach(sms)
        account.attach(audit)
        return account

class BankSystem:
    def __init__(self):
        self.accounts = {}

    def run(self):
        while True:
            print("\n=== Addis Bank System ===")
            print("1. Create Account")
            print("2. Deposit")
            print("3. Withdraw")
            print("4. Check Balance")
            print("5. Apply Interest to All Accounts")
            print("6. Exit")
            
            choice = input("Select an option (1-6): ").strip()
            try:
                if choice == '1':
                    t = input("Type (Savings/Checking): ")
                    num = input("Account Number: ")
                    name = input("Holder Name: ")
                    dep = float(input("Initial Deposit (ETB): "))
                    acc = AccountFactory.create_account(t, num, name, dep)
                    self.accounts[num] = acc
                    print("Account created successfully!")
                    
                elif choice == '2':
                    num = input("Account Number: ")
                    if num not in self.accounts: raise KeyError("Account not found.")
                    amt = float(input("Amount to deposit: "))
                    self.accounts[num].deposit(amt)
                    
                elif choice == '3':
                    num = input("Account Number: ")
                    if num not in self.accounts: raise KeyError("Account not found.")
                    amt = float(input("Amount to withdraw: "))
                    self.accounts[num].withdraw(amt)
                    
                elif choice == '4':
                    num = input("Account Number: ")
                    if num not in self.accounts: raise KeyError("Account not found.")
                    acc = self.accounts[num]
                    print(f"Holder: {acc.holder_name} | Balance: ETB {acc.balance:.2f}")
                    
                elif choice == '5':
                    for acc in self.accounts.values():
                        acc.apply_interest()
                    print("Interest operation finished.")
                    
                elif choice == '6':
                    print("Exiting Addis Bank. Goodbye!")
                    break
                else:
                    print("Invalid choice, please select between 1 and 6.")
            except Exception as e:
                print(f"[Error] {e}")

if __name__ == "__main__":
    BankSystem().run()
