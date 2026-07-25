
#  Observer Design Pattern - Security Alert System


class Observer:
    """Base blueprint for all subscribers."""
    def update(self, owner, amount):
        pass


class SMSAlert(Observer):

    def update(self, owner, amount):
        print(f" [SMS Alert] Security Notice to {owner}: High withdrawal of ${amount:,.2f} detected!")


class AuditLog(Observer):
    # Maintain an immutable ledger trail for compliance tracking.
    def update(self, owner, amount):
        print(f" [Audit Log] SECURITY WARNING: Recorded flagged transaction of ${amount:,.2f} for {owner}.")




class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = float(balance)
        self._observers = []  # List keeping track of all signed up subscribers

    def attach(self, observer):
        """Register a new subscriber."""
        self._observers.append(observer)

    def notify_all(self, amount):
        """Loop through and update all registered subscribers."""
        for observer in self._observers:
            observer.update(self.owner, amount)

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            print(f"\n[Transaction] {self.owner} withdrew ${amount:,.2f}. Remaining Balance: ${self.balance:,.2f}")
            
            # Check security policy threshold constraint rule
            if amount > 3000:
                self.notify_all(amount)
        else:
            print(f"\n[Transaction] Refused: Insufficient funds to draw ${amount:,.2f}")


# --- Execution Test ---
if __name__ == "__main__":
    # 1. Create an account with opening capital
    acc = Account("Almaz Kebede", 10000.0)

    # 2. Instantiate our system alert subscribers
    sms_service = SMSAlert()
    audit_service = AuditLog()

    # 3. Attach (subscribe) them to the account system pipeline
    acc.attach(sms_service)
    acc.attach(audit_service)

    # Test Case A: Safe baseline expenditure transaction (Does not trigger observers)
    acc.withdraw(500.0)

    # Test Case B: Heavy expenditure transaction (Triggers all observers automatically)
    acc.withdraw(4500.0)
