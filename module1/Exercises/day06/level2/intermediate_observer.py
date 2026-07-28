#  Observer Design Pattern - Security Alert System (Ethiopian Birr)

class Observer:
    # Base blueprint for all subscribers.
    def update(self, owner, amount):
        pass


class SMSAlert(Observer):
    def update(self, owner, amount):
        print(f" [SMS Alert] Security Notice to {owner}: High withdrawal of {amount:,.2f} ETB detected!")


class AuditLog(Observer):
    # Maintain an immutable ledger trail for compliance tracking.
    def update(self, owner, amount):
        print(f" [Audit Log] SECURITY WARNING: Recorded flagged transaction of {amount:,.2f} ETB for {owner}.")


class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = float(balance)
        self._observers = []  # List keeping track of all signed up subscribers

    def attach(self, observer):
        # Register a new subscriber.
        self._observers.append(observer)

    def notify_all(self, amount):
        # Loop through and update all registered subscribers.
        for observer in self._observers:
            observer.update(self.owner, amount)

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            print(f"\n[Transaction] {self.owner} withdrew {amount:,.2f} ETB. Remaining Balance: {self.balance:,.2f} ETB")
            
            # Instruction Requirement: Trigger notification only if amount is strictly greater than 3000
            if amount > 3000:
                self.notify_all(amount)
        else:
            print(f"\n[Transaction] Refused: Insufficient funds to draw {amount:,.2f} ETB")


# --- Execution Test ---
if __name__ == "__main__":
    print("--- Testing Security Alert System (Observer Pattern) ---")

    # 1. Create an account with opening capital in ETB
    acc = Account("Almaz Kebede", 20000.0)

    # 2. Instantiate our system alert subscribers
    sms_service = SMSAlert()
    audit_service = AuditLog()

    # 3. Attach (subscribe) them to the account system pipeline
    acc.attach(sms_service)
    acc.attach(audit_service)

    # Test Case A: Safe baseline transaction (3000 or less -> does NOT trigger observers)
    acc.withdraw(1500.0)

    # Test Case B: Heavy transaction (Strictly greater than 3000 -> triggers all observers automatically)
    acc.withdraw(4500.0)
