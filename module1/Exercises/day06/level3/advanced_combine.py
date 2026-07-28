#  Combining Factory, Observer, and Singleton Patterns 

#  SINGLETON PATTERN: Global Configuration management tool
class BankConfig:
    _instance = None

    def __new__(cls):
        # Guarantee only one config object exists system-wide
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            cls._instance.interest_rate = 0.07  # Standard 7% Ethiopian savings interest rate
            cls._instance.overdraft_limit = 5000  # Global overdraft setting in ETB
        return cls._instance


#  OBSERVER PATTERN: Subscription alert system components
class TransactionObserver:
    def update(self, owner, amount): 
        pass

class SMSAlert(TransactionObserver):
    def update(self, owner, amount):
        print(f" [SMS Notice] High expenditure alert! {owner} withdrew {amount:,.2f} ETB")

class AuditLog(TransactionObserver):
    def update(self, owner, amount):
        print(f" [Audit Log] SECURITY WARNING: Logged transaction of {amount:,.2f} ETB for {owner}")


#  BASE DATA MODEL: Publisher Subject object
class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance
        self._observers = []  # List of subscribed observers

    def attach(self, observer):
        self._observers.append(observer)

    def notify_all(self, amount):
        for observer in self._observers:
            observer.update(self.owner, amount)

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew: {amount:,.2f} ETB | Remaining Balance: {self.balance:,.2f} ETB")
            # Automatically alert subscribers if withdrawal is over 3,000 ETB
            if amount > 3000:
                self.notify_all(amount)
        else:
            print("Error: Insufficient funds.")


# Concrete class variants for Factory targeting
class SavingsAccount(Account): 
    pass

class CurrentAccount(Account): 
    pass


#  FACTORY PATTERN: Simplified centralized creation engine
class AccountFactory:
    @staticmethod
    def create(kind, owner, balance):
        kind = kind.lower().strip()
        config = BankConfig()  # Fetching the global single config instance
        
        if kind == "savings":
            print(f"Factory: Building Savings Account with global rate {config.interest_rate * 100:.1f}%")
            return SavingsAccount(owner, balance)
        elif kind == "current":
            print(f"Factory: Building Current Account with global buffer {config.overdraft_limit:,.2f} ETB")
            return CurrentAccount(owner, balance)
        else:
            print("Error: Unknown account type.")
            return None


if __name__ == "__main__":
    # Create the security alert observers
    sms_service = SMSAlert()
    audit_service = AuditLog()

    print("--- Creating Accounts via Factory ---")
    # Using Factory to create accounts (The Factory reads Singleton behind the scenes)
    savings_acc = AccountFactory.create("savings", "Almaz Kebede", 10000)
    current_acc = AccountFactory.create("current", "Bekele Lemma", 2000)

    # Attach subscribers to Almaz's account
    if savings_acc:
        savings_acc.attach(sms_service)
        savings_acc.attach(audit_service)

    print("\n--- Executing Transactions ---")
    # Safe small transaction (Should not trigger any alerts)
    print("[Action] Almaz making small transaction:")
    if savings_acc:
        savings_acc.withdraw(500)

    # Flagged heavy transaction (Should instantly trigger both observers)
    print("\n[Action] Almaz making heavy transaction:")
    if savings_acc:
        savings_acc.withdraw(4000)
