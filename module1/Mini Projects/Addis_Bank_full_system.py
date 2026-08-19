from abc import ABC, abstractmethod

# DAY 4 - ENCAPSULATION


class Account(ABC):
    def __init__(self, owner, account_number, balance=0.0):
        if not owner:
            raise ValueError("Owner name cannot be empty.")

        if not account_number:
            raise ValueError("Account number cannot be empty.")

        if balance < 0:
            raise ValueError("Initial balance cannot be negative.")

        self.owner = owner
        self.account_number = account_number

        self.__balance = float(balance)

        self._observers = []

        self._history = []

    @property
    def balance(self):
        """Read-only access to the private balance."""
        return self.__balance

    def _increase_balance(self, amount):
        self.__balance += amount

    def _decrease_balance(self, amount):
        self.__balance -= amount

    def _set_balance(self, amount):
        self.__balance = float(amount)

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")

        before = self.balance
        self._increase_balance(amount)

        self._push_history("deposit", amount, before, self.balance)

        self._notify(amount, "Deposit")

        print(f"Deposited ETB {amount:.2f}. " f"New balance: ETB {self.balance:.2f}")

    @abstractmethod
    def withdraw(self, amount):
        pass

    @abstractmethod
    def apply_interest(self):
        pass

    def statement(self):
        print(f"Account No : {self.account_number}")
        print(f"Owner      : {self.owner}")
        print(f"Balance    : {self.balance:,.2f} ETB")

    # DAY 7 - TRANSACTION HISTORY STACK

    def _push_history(self, tx_type, amount, balance_before, balance_after):
        self._history.append(
            {
                "type": tx_type,
                "amount": amount,
                "balance_before": balance_before,
                "balance_after": balance_after,
            }
        )

    def undo_last(self):
        if not self._history:
            raise ValueError("No transactions to undo.")

        transaction = self._history.pop()

        self._set_balance(transaction["balance_before"])

        print(f"Undo successful. " f"Restored balance: ETB {self.balance:.2f}")

        return transaction

    # DAY 6 - OBSERVER

    def attach(self, observer):
        self._observers.append(observer)

    def _notify(self, amount, event_type):
        for observer in self._observers:
            observer.update(self.account_number, amount, event_type)


# DAY 5 - INHERITANCE, POLYMORPHISM & ABSTRACTION


class SavingsAccount(Account):
    def __init__(self, owner, account_number, balance=0.0, rate=0.05):
        super().__init__(owner, account_number, balance)

        self.rate = float(rate)

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")

        if self.balance - amount < 0:
            raise ValueError(
                "Insufficient funds. " "Savings account cannot go negative."
            )

        before = self.balance
        self._decrease_balance(amount)

        self._push_history("withdrawal", -amount, before, self.balance)

        self._notify(amount, "Savings Withdrawal")

        print(f"Withdrew ETB {amount:.2f}. " f"New balance: ETB {self.balance:.2f}")

    def add_interest(self):
        interest = self.balance * self.rate

        if interest > 0:
            self.deposit(interest)

        print(
            f"Interest of ETB {interest:.2f} "
            f"credited to Savings Account "
            f"{self.account_number}."
        )

    def apply_interest(self):
        self.add_interest()

    def statement(self):
        print("\n" + " SAVINGS ACCOUNT STATEMENT ".center(55, "-"))

        super().statement()

        print(f"Interest Rate: " f"{self.rate * 100:.1f}% per annum")


class CurrentAccount(Account):
    def __init__(self, owner, account_number, balance=0.0, overdraft=1000.0):
        super().__init__(owner, account_number, balance)

        self.overdraft_limit = abs(float(overdraft))

    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")

        minimum_balance = -self.overdraft_limit

        if self.balance - amount < minimum_balance:
            raise ValueError(
                f"Transaction rejected. "
                f"Overdraft limit is "
                f"ETB {self.overdraft_limit:.2f}."
            )

        before = self.balance
        self._decrease_balance(amount)

        self._push_history("withdrawal", -amount, before, self.balance)

        self._notify(amount, "Current Account Withdrawal")

        print(f"Withdrew ETB {amount:.2f}. " f"New balance: ETB {self.balance:.2f}")

    def apply_interest(self):
        print(f"Current Account {self.account_number} " f"does not earn interest.")

    def statement(self):
        print("\n" + " CURRENT ACCOUNT STATEMENT ".center(55, "-"))

        super().statement()

        print(f"Overdraft Limit: " f"ETB {self.overdraft_limit:.2f}")


# DAY 6 - SOLID & DESIGN PATTERNS


class BankConfig:
    """Singleton containing shared bank settings."""

    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)

            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = 1000.0

        return cls._instance


class TransactionObserver(ABC):
    @abstractmethod
    def update(self, account_number, amount, event_type):
        pass


class SMSAlertObserver(TransactionObserver):
    def update(self, account_number, amount, event_type):
        print(
            f"[SMS ALERT] "
            f"{event_type} of ETB {amount:.2f} "
            f"detected on Account {account_number}!"
        )


class AuditLogObserver(TransactionObserver):
    def update(self, account_number, amount, event_type):
        print(
            f"[AUDIT LOG] Recorded: "
            f"{event_type} of ETB {amount:.2f} "
            f"on Account {account_number}."
        )


class AccountFactory:
    """Factory for creating SavingsAccount or CurrentAccount."""

    @staticmethod
    def create(kind, owner, number, balance=0):
        kind = kind.strip().lower()
        config = BankConfig()

        if kind == "savings":
            account = SavingsAccount(owner, number, balance, config.interest_rate)

        elif kind == "current":
            account = CurrentAccount(owner, number, balance, config.overdraft_limit)

        else:
            raise ValueError("Unknown account type. " "Use 'savings' or 'current'.")

        account.attach(SMSAlertObserver())
        account.attach(AuditLogObserver())

        return account


# DAY 7 - DATA STRUCTURES


class AccountRegistry:
    def __init__(self):
        self.by_number = {}

        self.order = []

    def add(self, account):
        if account.account_number in self.by_number:
            raise ValueError(f"Account {account.account_number} " f"already exists.")

        self.by_number[account.account_number] = account
        self.order.append(account.account_number)

    def find(self, number):
        """O(1) dictionary lookup."""
        return self.by_number.get(number)

    def list_all(self):
        """Return accounts in insertion order."""
        return [self.by_number[number] for number in self.order]

    def undo_last(self, number):
        account = self.find(number)

        if account is None:
            raise ValueError(f"Account {number} not found.")

        return account.undo_last()

    # DAY 8 - SEARCHING, SORTING & RECURSION

    def top_by_balance(self, n=5):
        accounts = sorted(
            self.by_number.values(), key=lambda account: account.balance, reverse=True
        )

        return accounts[:n]

    def find_by_number(self, number):
        """
        Find an account using binary search over sorted
        account numbers.
        """
        numbers = sorted(self.by_number.keys())

        index = self.binary_search(numbers, number)

        if index == -1:
            return None

        return self.by_number[numbers[index]]

    def binary_search(self, numbers, target):
        """Return the index of target, or -1 if not found."""
        low = 0
        high = len(numbers) -1

        while low <= high:
            middle = (low + high) 

            if numbers[middle] == target:
                return middle

            if numbers[middle] < target:
                low = middle + 1
            else:
                high = middle - 1

        return -1

    def total_transactions(self, number):
        """Recursively sum one account's transaction history."""
        account = self.find(number)

        if account is None:
            return 0.0

        def calculate(history, index=0):
            if index == len(history):
                return 0.0

            return history[index]["amount"] + calculate(history, index + 1)

        return calculate(account._history)


# DAY 9 - TREES, GRAPHS & BFS


class Branch:
    def __init__(self, name):
        self.name = name
        self.children = []
        self.accounts = []

    def add_child(self, branch):
        self.children.append(branch)

    def add_account(self, account):
        self.accounts.append(account)

    def total_balance(self):
        """Recursively calculate this branch and all children."""
        total = sum(account.balance for account in self.accounts)

        for child in self.children:
            total += child.total_balance()

        return total

    def display(self, level=0):
        indentation = "    " * level

        print(f"{indentation}{self.name} " f"- ETB {self.total_balance():,.2f}")

        for child in self.children:
            child.display(level + 1)


def build_transfer_graph(transfers):
    """Build a graph from (sender, recipient) pairs."""
    graph = {}

    for sender, recipient in transfers:
        if sender not in graph:
            graph[sender] = []

        if recipient not in graph:
            graph[recipient] = []

        if recipient not in graph[sender]:
            graph[sender].append(recipient)

    return graph


def bfs(transfers, start):
    """Return every account reachable from start using BFS."""
    if start not in transfers:
        return []

    visited = {start}
    queue = [start]
    result = []

    while queue:
        current = queue.pop(0)
        result.append(current)

        for neighbor in transfers[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result


class BankSystem:
    def __init__(self):
        self.registry = AccountRegistry()

        self.head_office = Branch("Head Office")

        self.transfers = {}

    def create_account(self):
        print("\n--- CREATE ACCOUNT ---")

        kind = input("Account type (savings/current): ").strip()

        owner = input("Owner name: ").strip()

        number = input("Account number: ").strip()

        try:
            balance = float(input("Initial balance (ETB): ").strip())

            account = AccountFactory.create(kind, owner, number, balance)

            self.registry.add(account)

            print("Account created successfully!")

        except ValueError as error:
            print(f"Error: {error}")

    def deposit(self):
        number = input("Account number: ").strip()

        account = self.registry.find(number)

        if account is None:
            print("Account not found.")
            return

        try:
            amount = float(input("Deposit amount (ETB): ").strip())

            account.deposit(amount)

        except ValueError as error:
            print(f"Error: {error}")

    def withdraw(self):
        number = input("Account number: ").strip()

        account = self.registry.find(number)

        if account is None:
            print("Account not found.")
            return

        try:
            amount = float(input("Withdrawal amount (ETB): ").strip())

            account.withdraw(amount)

        except ValueError as error:
            print(f"Error: {error}")

    def show_statement(self):
        number = input("Account number: ").strip()

        account = self.registry.find(number)

        if account:
            account.statement()
        else:
            print("Account not found.")

    def apply_interest(self):
        accounts = self.registry.list_all()

        if not accounts:
            print("No accounts exist.")
            return

        for account in accounts:
            account.apply_interest()

    def show_all_accounts(self):
        accounts = self.registry.list_all()

        if not accounts:
            print("No accounts exist.")
            return

        for account in accounts:
            account.statement()
            print("-" * 50)

    # DAY 8 OPERATIONS

    def find_account_binary(self):
        number = input("Account number: ").strip()

        account = self.registry.find_by_number(number)

        if account:
            print(f"Customer found: {account.owner}")
        else:
            print("Account not found.")

    def show_top_balances(self):
        try:
            n = int(input("How many accounts? ").strip())

            accounts = self.registry.top_by_balance(n)

            print("\nTop Accounts by Balance:")

            for index, account in enumerate(accounts, 1):
                print(f"{index}. " f"{account.owner} - " f"ETB {account.balance:,.2f}")

        except ValueError:
            print("Invalid number.")

    def show_total_transactions(self):
        number = input("Account number: ").strip()

        if self.registry.find(number) is None:
            print("Account not found.")
            return

        total = self.registry.total_transactions(number)

        print(f"Transaction total: " f"ETB {total:,.2f}")

    def undo_transaction(self):
        number = input("Account number: ").strip()

        try:
            self.registry.undo_last(number)

        except ValueError as error:
            print(f"Error: {error}")

    # DAY 9 TREE OPERATIONS

    def add_branch(self):
        print("\n--- ADD BRANCH ---")

        name = input("Branch name: ").strip()

        if not name:
            print("Branch name cannot be empty.")
            return

        parent = input("Parent branch " "(Head Office or existing branch): ").strip()

        if parent.lower() == "head office":
            self.head_office.add_child(Branch(name))

            print("Branch added successfully.")
            return

        parent_branch = self.find_branch(self.head_office, parent)

        if parent_branch is None:
            print("Parent branch not found.")
            return

        parent_branch.add_child(Branch(name))

        print("Branch added successfully.")

    def find_branch(self, branch, name):
        if branch.name.lower() == name.lower():
            return branch

        for child in branch.children:
            result = self.find_branch(child, name)

            if result:
                return result

        return None

    def add_account_to_branch(self):
        number = input("Account number: ").strip()

        account = self.registry.find(number)

        if account is None:
            print("Account not found.")
            return

        branch_name = input("Branch name: ").strip()

        branch = self.find_branch(self.head_office, branch_name)

        if branch is None:
            print("Branch not found.")
            return

        branch.add_account(account)

        print("Account added to branch.")

    def show_bank_tree(self):
        print("\nBank Branch Hierarchy:")
        print("=" * 50)

        self.head_office.display()

        print(f"\nTotal Bank Balance: " f"ETB {self.head_office.total_balance():,.2f}")

    # DAY 9 GRAPH OPERATIONS

    def add_transfer(self):
        sender = input("Sender account number: ").strip()

        recipient = input("Recipient account number: ").strip()

        if self.registry.find(sender) is None or self.registry.find(recipient) is None:
            print("Both accounts must exist first.")
            return

        self.transfers.setdefault(sender, [])
        self.transfers.setdefault(recipient, [])

        if recipient not in self.transfers[sender]:
            self.transfers[sender].append(recipient)

        print("Transfer connection added.")

    def show_bfs(self):
        start = input("Starting account number: ").strip()

        result = bfs(self.transfers, start)

        if result:
            print(" -> ".join(result))
        else:
            print("Account not found in " "transfer network.")

    def run(self):
        while True:
            print("\n" + "=" * 60)
            print(" ADDIS BANK SYSTEM")
            print("=" * 60)

            print("1. Create Account")
            print("2. Deposit")
            print("3. Withdraw")
            print("4. Check Account Statement")
            print("5. Apply Interest to All Accounts")
            print("6. Show All Accounts")
            print("7. Search Account")
            print("8. Top Accounts by Balance")
            print("9. Total Transactions")
            print("10. Undo Last Transaction")
            print("11. Add Branch")
            print("12. Add Account to Branch")
            print("13. Show Bank Tree")
            print("14. Add Transfer Connection")
            print("15. Show Connected Accounts")
            print("16. Exit")

            print("=" * 60)

            choice = input("Select an option (1-16): ").strip()

            if choice == "1":
                self.create_account()

            elif choice == "2":
                self.deposit()

            elif choice == "3":
                self.withdraw()

            elif choice == "4":
                self.show_statement()

            elif choice == "5":
                self.apply_interest()

            elif choice == "6":
                self.show_all_accounts()

            elif choice == "7":
                self.find_account_binary()

            elif choice == "8":
                self.show_top_balances()

            elif choice == "9":
                self.show_total_transactions()

            elif choice == "10":
                self.undo_transaction()

            elif choice == "11":
                self.add_branch()

            elif choice == "12":
                self.add_account_to_branch()

            elif choice == "13":
                self.show_bank_tree()

            elif choice == "14":
                self.add_transfer()

            elif choice == "15":
                self.show_bfs()

            elif choice == "16":
                print("\nThank you for using Addis Bank.")
                break

            else:
                print("Invalid choice. " "Please select 1-16.")


if __name__ == "__main__":
    BankSystem().run()
