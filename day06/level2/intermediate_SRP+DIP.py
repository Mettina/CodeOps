
#  Account Refactoring applying SRP + DIP via Dependency Injection

from abc import ABC, abstractmethod


class PersistenceInterface(ABC):
    @abstractmethod
    def save(self, owner, balance):
        pass

class NotificationInterface(ABC):
    @abstractmethod
    def send_alert(self, owner, message):
        pass


class FileSaver(PersistenceInterface):
    # Only handle disk writing tasks.
    def save(self, owner, balance):
        with open("bank_records.txt", "a") as file:
            file.write(f"Owner: {owner}, Balance: ${balance}\n")
        print(f"Saved updated balance (${balance}) to file.")


class EmailService(NotificationInterface):
    # Only handle messaging routes
    def send_alert(self, owner, message):
        print(f"Sent email to {owner}: {message}")




class Account:
    #Strictly handle core calculation values.
    # DEPENDENCY INJECTION: We inject our abstract interfaces straight into the setup
    def __init__(self, owner, balance, file_saver: PersistenceInterface, email_service: NotificationInterface):
        self.owner = owner
        self.balance = balance
        self.saver = file_saver
        self.emailer = email_service

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited: ${amount}")
            
            # Using our abstract tools smoothly right after the work step
            self.saver.save(self.owner, self.balance)
            self.emailer.send_alert(self.owner, f"Deposited ${amount}")


# --- Execution Test Loop ---
if __name__ == "__main__":
    # Spin up the specific tools first
    saver_tool = FileSaver()
    email_tool = EmailService()

    # Inject those concrete tools into the broad abstract parameters
    acc = Account("Almaz Kebede", 1000, saver_tool, email_tool)

    # Process actions
    acc.deposit(500)
