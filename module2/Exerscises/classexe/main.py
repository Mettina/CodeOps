"""
====================================================================
            ADDIS BANK MANAGEMENT SYSTEM - COMPLETE
            Mini Project: Days 2-9 Integrated
====================================================================
Features Integrated:
- Day 2: Personal Finance Tracker (Balance management)
- Day 3: Inventory Manager (File persistence)
- Day 4: Bank Account System V1 (OOP, Encapsulation)
- Day 5: Bank Account System V2 (Abstraction, Inheritance, Polymorphism)
- Day 6: Bank Account System V3 (Design Patterns: Singleton, Observer, Factory)
- Day 7: Customer Service (Data Structures: Dict, Stack)
- Day 8: Transaction Analyzer (Recursion, Sorting, Searching)
- Day 9: Network & Priority System (Tree, Graph, BST, Heap)
====================================================================
"""

import sys
import json
import heapq
from abc import ABC, abstractmethod
from datetime import datetime

# ====================================================================
# DAY 2: PERSONAL FINANCE TRACKER
# ====================================================================

class PersonalFinanceTracker:
    """Day 2: Personal Finance Tracker functionality"""
    
    def __init__(self):
        self.balance = 0.0
        self.transactions = []
    
    def add_income(self):
        try:
            amount = float(input("Enter income amount (ETB): "))
            if amount < 0:
                print("Amount cannot be negative.")
                return
            
            self.balance += amount
            self.transactions.append({
                "type": "Income",
                "amount": amount,
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            print(f"Successfully added {amount:.2f} ETB to your income.")
        except ValueError:
            print("Invalid input. Please enter a valid numerical number.")
    
    def add_expense(self):
        try:
            amount = float(input("Enter expense amount (ETB): "))
            if amount < 0:
                print("Amount cannot be negative.")
                return
            if amount > self.balance:
                print(f"Warning! This expense ({amount:.2f} ETB) exceeds your current balance ({self.balance:.2f} ETB).")
                return
            
            self.balance -= amount
            self.transactions.append({
                "type": "Expense",
                "amount": amount,
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })
            print(f"Successfully recorded expense of {amount:.2f} ETB.")
        except ValueError:
            print("Invalid input. Please enter a valid numerical number.")
    
    def show_balance(self):
        print("\n" + "-" * 25)
        print(f"Current Balance: {self.balance:.2f} ETB")
        print("-" * 25)
    
    def show_summary(self):
        total_income = sum(t["amount"] for t in self.transactions if t["type"] == "Income")
        total_expense = sum(t["amount"] for t in self.transactions if t["type"] == "Expense")
        
        print("\n" + "=" * 40)
        print("      FINANCIAL SUMMARY")
        print("=" * 40)
        print(f"Total Income:  {total_income:.2f} ETB")
        print(f"Total Expense: {total_expense:.2f} ETB")
        print(f"Net Balance:   {self.balance:.2f} ETB")
        print("=" * 40)


# ====================================================================
# DAY 3: INVENTORY MANAGER
# ====================================================================

class InventoryManager:
    """Day 3: Inventory Manager with file persistence"""
    
    def __init__(self, filename="inventory.txt"):
        self.inventory = {}
        self.filename = filename
        self.load_from_file()
    
    def add_product(self):
        name = input("Enter product name: ").strip()
        if not name:
            print("Product name cannot be empty.")
            return
        
        try:
            quantity = int(input("Enter starting quantity: "))
            if quantity < 0:
                print("Quantity cannot be negative.")
                return
            self.inventory[name] = quantity
            print(f"Added '{name}' with quantity {quantity}.")
        except ValueError:
            print("Quantity must be a whole number.")
    
    def update_quantity(self):
        name = input("Enter product name to update: ").strip()
        if name not in self.inventory:
            print(f"'{name}' was not found in the inventory.")
            return
        
        try:
            quantity = int(input("Enter new quantity: "))
            if quantity < 0:
                print("Quantity cannot be negative.")
                return
            self.inventory[name] = quantity
            print(f"Updated '{name}' to quantity {quantity}.")
        except ValueError:
            print("Quantity must be a whole number.")
    
    def view_products(self):
        if not self.inventory:
            print("The inventory is currently empty.")
            return
        
        print("\n" + "-" * 40)
        print("Current Inventory:")
        print("-" * 40)
        for product, quantity in self.inventory.items():
            print(f"  {product:<20} -> {quantity} units")
        print("-" * 40)
    
    def save_to_file(self):
        try:
            with open(self.filename, "w") as file:
                json.dump(self.inventory, file)
            print(f"Inventory saved to {self.filename}.")
        except Exception as error:
            print(f"Could not save file: {error}")
    
    def load_from_file(self):
        try:
            with open(self.filename, "r") as file:
                self.inventory = json.load(file)
            print(f"Inventory loaded from {self.filename}.")
        except FileNotFoundError:
            print(f"{self.filename} was not found. Starting with empty inventory.")
        except Exception as error:
            print(f"Could not load file: {error}")


# ====================================================================
# DAY 4 & 5: BANK ACCOUNT SYSTEM (V1 & V2)
# ====================================================================

class BankConfig:
    """Day 6: Singleton Pattern for configuration"""
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(BankConfig, cls).__new__(cls)
            cls._instance.interest_rate = 0.05
            cls._instance.overdraft_limit = -500.0
            cls._instance.large_withdrawal_threshold = 10000.0
            cls._instance.minimum_balance = 50.0
        return cls._instance


class TransactionObserver(ABC):
    """Day 6: Observer Pattern"""
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
    """Day 5: Abstract Base Class"""
    
    def __init__(self, account_number: str, holder_name: str, balance: float = 0.0):
        self.account_number = account_number
        self.holder_name = holder_name
        self.__balance = float(balance)
        self._observers = []
        self.transaction_history = []  # Day 7: Stack for undo
        self.minimum_balance = BankConfig().minimum_balance
    
    @property
    def balance(self):
        return self.__balance
    
    @balance.setter
    def balance(self, amount):
        if amount < 0:
            print("Error: Account balance cannot fall below zero.")
        else:
            self.__balance = float(amount)
    
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
        self.transaction_history.append({
            "type": "Deposit",
            "amount": amount,
            "balance": self.balance,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        print(f"Successfully deposited ETB {amount:.2f}. New balance: ETB {self.balance:.2f}")
    
    @abstractmethod
    def withdraw(self, amount: float):
        pass
    
    @abstractmethod
    def apply_interest(self):
        pass
    
    def statement(self):
        print("-" * 50)
        print(f"Account No: {self.account_number}")
        print(f"Owner     : {self.holder_name}")
        print(f"Balance   : {self.balance:,.2f} ETB")
        print("-" * 50)
    
    def undo_last_transaction(self):  # Day 7: Undo functionality
        if not self.transaction_history:
            print("No transactions to undo.")
            return
        
        last_tx = self.transaction_history.pop()
        if last_tx["type"] == "Deposit":
            self.balance -= last_tx["amount"]
            print(f"Undo Deposit: Reversed {last_tx['amount']:.2f} ETB")
        elif last_tx["type"] == "Withdrawal":
            self.balance += last_tx["amount"]
            print(f"Undo Withdrawal: Reversed {last_tx['amount']:.2f} ETB")
        print(f"New balance: {self.balance:.2f} ETB")


class SavingsAccount(Account):
    """Day 4 & 5: Savings Account"""
    
    def __init__(self, account_number, holder_name, balance, interest_rate=0.05):
        super().__init__(account_number, holder_name, balance)
        self.interest_rate = interest_rate
    
    def withdraw(self, amount: float):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if self.balance - amount < self.minimum_balance:
            raise ValueError(f"Transaction Rejected: You must keep a minimum balance of {self.minimum_balance} ETB.")
        
        self.balance -= amount
        self.transaction_history.append({
            "type": "Withdrawal",
            "amount": amount,
            "balance": self.balance,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        self.notify(amount, "Withdrawal")
        print(f"Successfully withdrew ETB {amount:.2f} from Savings.")
    
    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.balance += interest
        print(f"Interest of ETB {interest:.2f} credited to Savings Account {self.account_number}")
    
    def statement(self):
        print(" SAVINGS ACCOUNT STATEMENT ".center(50, "-"))
        super().statement()
        print(f"Interest Rate: {self.interest_rate * 100:.1f}% Per Annum")
        print("Minimum Balance: 50 ETB")
        print("-" * 50)


class CurrentAccount(Account):
    """Day 5: Current Account"""
    
    def __init__(self, account_number, holder_name, balance):
        super().__init__(account_number, holder_name, balance)
    
    def withdraw(self, amount: float):
        config = BankConfig()
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if self.balance - amount < self.minimum_balance:
            raise ValueError(f"Transaction Rejected: You must keep a minimum balance of {self.minimum_balance} ETB.")
        
        self.balance -= amount
        self.transaction_history.append({
            "type": "Withdrawal",
            "amount": amount,
            "balance": self.balance,
            "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        self.notify(amount, "Overdrawn Withdrawal")
        print(f"Successfully withdrew ETB {amount:.2f} from Current Account.")
    
    def apply_interest(self):
        print(f"Current Account {self.account_number} earns no interest.")
    
    def statement(self):
        print(" CURRENT ACCOUNT STATEMENT ".center(50, "-"))
        super().statement()
        print("Account Rule: Minimum 50 ETB balance enforced.")
        print("-" * 50)


class FixedDepositAccount(SavingsAccount):
    """Day 5: Fixed Deposit Account"""
    
    def __init__(self, account_number, holder_name, balance, interest_rate=0.08, lock_in_months=12):
        super().__init__(account_number, holder_name, balance, interest_rate)
        self.lock_in_months = lock_in_months
        self.is_locked = True
    
    def withdraw(self, amount: float):
        if self.is_locked:
            print(f"Transaction Denied: Funds are locked for {self.lock_in_months} months.")
            return
        super().withdraw(amount)
    
    def statement(self):
        print(" FIXED DEPOSIT ACCOUNT STATEMENT ".center(50, "-"))
        super().statement()
        print(f"Lock Period: {self.lock_in_months} Months (Status: {'Locked' if self.is_locked else 'Unlocked'})")
        print("-" * 50)


# ====================================================================
# DAY 6: ACCOUNT FACTORY (Factory Pattern)
# ====================================================================

class AccountFactory:
    """Day 6: Factory Pattern for account creation"""
    
    @staticmethod
    def create_account(acc_type: str, acc_num: str, name: str, initial_deposit: float, **kwargs) -> Account:
        acc_type = acc_type.strip().lower()
        
        # Attach observers
        sms = SMSAlertObserver()
        audit = AuditLogObserver()
        
        account = None
        if acc_type == "savings":
            interest_rate = kwargs.get('interest_rate', 0.05)
            is_fixed = kwargs.get('is_fixed', False)
            
            if is_fixed:
                lock_months = kwargs.get('lock_months', 12)
                account = FixedDepositAccount(acc_num, name, initial_deposit, interest_rate, lock_months)
            else:
                account = SavingsAccount(acc_num, name, initial_deposit, interest_rate)
        
        elif acc_type == "current":
            account = CurrentAccount(acc_num, name, initial_deposit)
        
        else:
            raise ValueError(f"Unknown account type: '{acc_type}'")
        
        account.attach(sms)
        account.attach(audit)
        return account


# ====================================================================
# DAY 7: CUSTOMER DATABASE & TRANSACTION STACK
# ====================================================================

class CustomerDatabase:
    """Day 7 & 9: Customer management with Dictionary and BST"""
    
    def __init__(self):
        self.customers = {}  # Dictionary: O(1) lookup
        self.bst_root = None  # BST for fast search
    
    # BST Node
    class BSTNode:
        def __init__(self, acc_num, holder_name):
            self.acc_num = acc_num
            self.holder_name = holder_name
            self.left = None
            self.right = None
    
    def add_customer(self, acc_num, holder_name):
        """O(1) for dict, O(log n) for BST"""
        # Dictionary storage
        self.customers[acc_num] = holder_name
        
        # BST storage
        self.bst_root = self._bst_insert(self.bst_root, acc_num, holder_name)
    
    def _bst_insert(self, node, acc_num, holder_name):
        if node is None:
            return self.BSTNode(acc_num, holder_name)
        
        if acc_num < node.acc_num:
            node.left = self._bst_insert(node.left, acc_num, holder_name)
        elif acc_num > node.acc_num:
            node.right = self._bst_insert(node.right, acc_num, holder_name)
        return node
    
    def search_by_account(self, acc_num):
        """O(1) dict lookup"""
        return self.customers.get(acc_num)
    
    def search_bst(self, acc_num):
        """O(log n) BST search"""
        return self._bst_search(self.bst_root, acc_num)
    
    def _bst_search(self, node, acc_num):
        if node is None:
            return None
        if acc_num == node.acc_num:
            return node.holder_name
        elif acc_num < node.acc_num:
            return self._bst_search(node.left, acc_num)
        else:
            return self._bst_search(node.right, acc_num)
    
    def list_all(self):
        return self.customers


# ====================================================================
# DAY 8: TRANSACTION ANALYZER (Recursion, Sorting, Searching)
# ====================================================================

class TransactionAnalyzer:
    """Day 8: Analytics with recursive algorithms"""
    
    def __init__(self):
        self.transactions = []
        self.is_sorted_by_amount = False
    
    def add_transaction(self, amount, date, type_name):
        self.transactions.append({
            "amount": amount,
            "date": date,
            "type": type_name
        })
    
    def calculate_balance_recursive(self, tx_list=None, index=0):
        """O(n) recursive balance calculation"""
        if tx_list is None:
            tx_list = self.transactions
        if index == len(tx_list):
            return 0.0
        return tx_list[index]["amount"] + self.calculate_balance_recursive(tx_list, index + 1)
    
    def threshold_report_recursive(self, threshold, tx_list=None, index=0, report=None):
        """O(n) recursive threshold report"""
        if tx_list is None:
            tx_list = self.transactions
        if report is None:
            report = []
        if index == len(tx_list):
            return report
        if abs(tx_list[index]["amount"]) >= threshold:
            report.append(tx_list[index])
        return self.threshold_report_recursive(threshold, tx_list, index + 1, report)
    
    def quicksort(self, tx_list, key_name):
        """O(n log n) Quicksort"""
        if len(tx_list) <= 1:
            return tx_list
        pivot = tx_list[len(tx_list) // 2]
        left = [x for x in tx_list if x[key_name] < pivot[key_name]]
        middle = [x for x in tx_list if x[key_name] == pivot[key_name]]
        right = [x for x in tx_list if x[key_name] > pivot[key_name]]
        return self.quicksort(left, key_name) + middle + self.quicksort(right, key_name)
    
    def sort_by_amount(self):
        self.transactions = self.quicksort(self.transactions, "amount")
        self.is_sorted_by_amount = True
        print("\nTransactions sorted by Amount (Ascending).")
    
    def sort_by_date(self):
        self.transactions = self.quicksort(self.transactions, "date")
        self.is_sorted_by_amount = False
        print("\nTransactions sorted by Date (Oldest to Newest).")
    
    def linear_search(self, target_amount):
        """O(n) linear search"""
        return [tx for tx in self.transactions if tx["amount"] == target_amount]
    
    def binary_search(self, target_amount):
        """O(log n) binary search (requires sorted data)"""
        low, high = 0, len(self.transactions) - 1
        while low <= high:
            mid = (low + high) // 2
            mid_amount = self.transactions[mid]["amount"]
            if mid_amount == target_amount:
                results = [self.transactions[mid]]
                # Check left and right for duplicates
                left = mid - 1
                while left >= 0 and self.transactions[left]["amount"] == target_amount:
                    results.append(self.transactions[left])
                    left -= 1
                right = mid + 1
                while right < len(self.transactions) and self.transactions[right]["amount"] == target_amount:
                    results.append(self.transactions[right])
                    right += 1
                return results
            elif mid_amount < target_amount:
                low = mid + 1
            else:
                high = mid - 1
        return []
    
    def print_transactions(self, tx_list=None):
        if tx_list is None:
            tx_list = self.transactions
        print(f"{'Date':<15} | {'Type':<12} | {'Amount (ETB)':<15}")
        print("-" * 45)
        for tx in tx_list:
            print(f"{tx['date']:<15} | {tx['type']:<12} | {tx['amount']:<15.2f}")
        print("-" * 45)


# ====================================================================
# DAY 9: NETWORK & PRIORITY SYSTEM
# ====================================================================

class BankTreeNode:
    """Day 9: Tree structure for bank hierarchy"""
    
    def __init__(self, name, role=""):
        self.name = name
        self.role = role
        self.children = []
    
    def add_child(self, child_node):
        self.children.append(child_node)
    
    def print_tree(self, level=0):
        indent = "    " * level
        role_str = f" ({self.role})" if self.role else ""
        print(f"{indent}- {self.name}{role_str}")
        for child in self.children:
            child.print_tree(level + 1)


class TransferNetworkGraph:
    """Day 9: Graph structure for transfer network"""
    
    def __init__(self):
        self.adj_list = {}
    
    def add_account(self, acc_num):
        if acc_num not in self.adj_list:
            self.adj_list[acc_num] = []
    
    def add_transfer_link(self, acc1, acc2):
        self.add_account(acc1)
        self.add_account(acc2)
        if acc2 not in self.adj_list[acc1]:
            self.adj_list[acc1].append(acc2)
        if acc1 not in self.adj_list[acc2]:
            self.adj_list[acc2].append(acc1)
    
    def bfs_traversal(self, start_acc):
        """O(V + E) Breadth-First Search"""
        if start_acc not in self.adj_list:
            return []
        visited = {start_acc}
        queue = [start_acc]
        result = []
        while queue:
            current = queue.pop(0)
            result.append(current)
            for neighbor in self.adj_list[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return result
    
    def display_network(self):
        print("\n" + "=" * 50)
        print("TRANSFER NETWORK (Connected Accounts)")
        print("=" * 50)
        for account, connections in self.adj_list.items():
            if connections:
                print(f"Account {account} -> {', '.join(connections)}")
        print("=" * 50)


# ====================================================================
# MAIN BANK SYSTEM - INTEGRATING ALL DAYS
# ====================================================================

class AddisBankSystem:
    """Complete Banking System integrating Days 2-9"""
    
    def __init__(self):
        # Day 2: Personal Finance
        self.finance_tracker = PersonalFinanceTracker()
        
        # Day 3: Inventory
        self.inventory_manager = InventoryManager()
        
        # Day 4-6: Accounts
        self.accounts = {}
        
        # Day 7: Customer Database
        self.customer_db = CustomerDatabase()
        
        # Day 8: Transaction Analyzer
        self.analyzer = TransactionAnalyzer()
        
        # Day 9: Network & Priority
        self.bank_hierarchy = BankTreeNode("Addis Bank Head Office")
        self.transfer_network = TransferNetworkGraph()
        self.transaction_heap = []  # Priority queue
        self._initialize_sample_data()
    
    def _initialize_sample_data(self):
        """Initialize with sample data"""
        # Day 7: Sample customers
        sample_customers = {
            "1001": "Almaz Ayana",
            "1002": "Bekele Gerba", 
            "1003": "Chala Shiferaw",
            "1004": "Desta Kebede",
            "1005": "Eskinder Nega"
        }
        for acc, name in sample_customers.items():
            self.customer_db.add_customer(acc, name)
        
        # Day 9: Sample hierarchy
        bole = BankTreeNode("Bole Branch")
        piassa = BankTreeNode("Piassa Branch")
        self.bank_hierarchy.add_child(bole)
        self.bank_hierarchy.add_child(piassa)
        bole.add_child(BankTreeNode("Teller 1", "Customer Service"))
        bole.add_child(BankTreeNode("Teller 2", "Customer Service"))
        piassa.add_child(BankTreeNode("Teller 3", "Customer Service"))
        
        # Day 9: Sample transfer network
        self.transfer_network.add_transfer_link("1001", "1002")
        self.transfer_network.add_transfer_link("1002", "1003")
        self.transfer_network.add_transfer_link("1003", "1004")
        
        # Day 9: Sample priority transactions
        heapq.heappush(self.transaction_heap, (2, "Standard Transfer - 45,000 ETB"))
        heapq.heappush(self.transaction_heap, (1, "CRITICAL: Corporate Payment"))
        
        # Day 8: Sample transactions
        sample_txs = [
            (1500.0, "2026-03-01", "Deposit"),
            (4200.0, "2026-03-05", "Deposit"),
            (-300.0, "2026-02-15", "Withdrawal"),
            (850.0, "2026-03-02", "Deposit"),
            (-1200.0, "2026-01-20", "Withdrawal")
        ]
        for amt, date, tx_type in sample_txs:
            self.analyzer.add_transaction(amt, date, tx_type)
    
    # ======== MENU FUNCTIONS ========
    
    def menu_finance_tracker(self):
        """Day 2: Personal Finance Tracker Menu"""
        while True:
            print("\n" + "=" * 40)
            print("  PERSONAL FINANCE TRACKER (Day 2)")
            print("=" * 40)
            print("1. Add Income")
            print("2. Add Expense")
            print("3. Show Balance")
            print("4. Show Summary")
            print("5. Back to Main Menu")
            print("=" * 40)
            
            choice = input("Choose option (1-5): ")
            
            if choice == '1':
                self.finance_tracker.add_income()
            elif choice == '2':
                self.finance_tracker.add_expense()
            elif choice == '3':
                self.finance_tracker.show_balance()
            elif choice == '4':
                self.finance_tracker.show_summary()
            elif choice == '5':
                break
            else:
                print("Invalid choice. Please try again.")
    
    def menu_inventory(self):
        """Day 3: Inventory Manager Menu"""
        while True:
            print("\n" + "=" * 40)
            print("  INVENTORY MANAGER (Day 3)")
            print("=" * 40)
            print("1. Add Product")
            print("2. Update Quantity")
            print("3. View All Products")
            print("4. Save to File")
            print("5. Load from File")
            print("6. Back to Main Menu")
            print("=" * 40)
            
            choice = input("Choose option (1-6): ")
            
            if choice == '1':
                self.inventory_manager.add_product()
            elif choice == '2':
                self.inventory_manager.update_quantity()
            elif choice == '3':
                self.inventory_manager.view_products()
            elif choice == '4':
                self.inventory_manager.save_to_file()
            elif choice == '5':
                self.inventory_manager.load_from_file()
            elif choice == '6':
                break
            else:
                print("Invalid choice. Please try again.")
    
    def menu_account_management(self):
        """Days 4-6: Account Management Menu"""
        while True:
            print("\n" + "=" * 40)
            print("  ACCOUNT MANAGEMENT (Days 4-6)")
            print("=" * 40)
            print("1. Create Savings Account")
            print("2. Create Current Account")
            print("3. Create Fixed Deposit Account")
            print("4. Deposit")
            print("5. Withdraw")
            print("6. Check Balance")
            print("7. View Statement")
            print("8. Apply Interest to All Savings Accounts")
            print("9. View All Accounts")
            print("10. Undo Last Transaction")
            print("11. Back to Main Menu")
            print("=" * 40)
            
            choice = input("Choose option (1-11): ")
            
            if choice == '1':
                self._create_account("savings")
            elif choice == '2':
                self._create_account("current")
            elif choice == '3':
                self._create_account("fixed")
            elif choice in ['4', '5', '6', '7', '10']:
                acc_num = input("Enter account number: ")
                if acc_num not in self.accounts:
                    print("Account not found!")
                    continue
                acc = self.accounts[acc_num]
                
                if choice == '4':
                    try:
                        amt = float(input("Enter deposit amount (ETB): "))
                        acc.deposit(amt)
                    except ValueError as e:
                        print(f"Error: {e}")
                
                elif choice == '5':
                    try:
                        amt = float(input("Enter withdrawal amount (ETB): "))
                        acc.withdraw(amt)
                    except ValueError as e:
                        print(f"Error: {e}")
                
                elif choice == '6':
                    print(f"Current Balance: {acc.balance:.2f} ETB")
                
                elif choice == '7':
                    acc.statement()
                
                elif choice == '10':
                    acc.undo_last_transaction()
            
            elif choice == '8':
                for acc in self.accounts.values():
                    if isinstance(acc, SavingsAccount):
                        acc.apply_interest()
                print("Interest applied to all savings accounts.")
            
            elif choice == '9':
                if not self.accounts:
                    print("No accounts created yet.")
                else:
                    for acc in self.accounts.values():
                        acc.statement()
            
            elif choice == '11':
                break
            else:
                print("Invalid choice. Please try again.")
    
    def _create_account(self, acc_type):
        """Helper to create accounts"""
        acc_num = input("Enter account number: ")
        if acc_num in self.accounts:
            print("Account number already exists!")
            return
        
        name = input("Enter account holder name: ")
        if not name:
            print("Name cannot be empty!")
            return
        
        try:
            balance = float(input("Enter initial balance (ETB): "))
            if balance < 50:
                print("Initial deposit must be at least 50 ETB.")
                return
        except ValueError:
            print("Invalid amount!")
            return
        
        kwargs = {}
        if acc_type in ["savings", "fixed"]:
            try:
                rate = float(input("Enter interest rate (e.g., 0.05 for 5%): ") or "0.05")
                kwargs['interest_rate'] = rate
            except ValueError:
                kwargs['interest_rate'] = 0.05
        
        if acc_type == "fixed":
            kwargs['is_fixed'] = True
            try:
                months = int(input("Enter lock-in months (default 12): ") or "12")
                kwargs['lock_months'] = months
            except ValueError:
                kwargs['lock_months'] = 12
        
        try:
            account = AccountFactory.create_account(
                acc_type, acc_num, name, balance, **kwargs
            )
            self.accounts[acc_num] = account
            self.customer_db.add_customer(acc_num, name)
            print(f"{acc_type.title()} Account created successfully!")
        except ValueError as e:
            print(f"Error: {e}")
    
    def menu_customer_service(self):
        """Day 7: Customer Service Menu"""
        while True:
            print("\n" + "=" * 40)
            print("  CUSTOMER SERVICE (Day 7)")
            print("=" * 40)
            print("1. Search Customer (Dictionary O(1))")
            print("2. Search Customer (BST O(log n))")
            print("3. List All Customers")
            print("4. View Transaction History (Stack)")
            print("5. Back to Main Menu")
            print("=" * 40)
            
            choice = input("Choose option (1-5): ")
            
            if choice == '1':
                acc_num = input("Enter account number: ")
                name = self.customer_db.search_by_account(acc_num)
                if name:
                    print(f"Customer Found: {name} (Account: {acc_num})")
                else:
                    print("Customer not found.")
            
            elif choice == '2':
                acc_num = input("Enter account number: ")
                name = self.customer_db.search_bst(acc_num)
                if name:
                    print(f"Customer Found (BST): {name} (Account: {acc_num})")
                else:
                    print("Customer not found.")
            
            elif choice == '3':
                customers = self.customer_db.list_all()
                if not customers:
                    print("No customers registered.")
                else:
                    print("\n" + "-" * 40)
                    print("Registered Customers:")
                    print("-" * 40)
                    for acc, name in customers.items():
                        print(f"Account: {acc} -> {name}")
                    print("-" * 40)
            
            elif choice == '4':
                acc_num = input("Enter account number: ")
                if acc_num not in self.accounts:
                    print("Account not found!")
                    continue
                acc = self.accounts[acc_num]
                if not acc.transaction_history:
                    print("No transaction history.")
                else:
                    print("\n" + "-" * 40)
                    print("Transaction History (Most Recent First):")
                    print("-" * 40)
                    for tx in reversed(acc.transaction_history[-10:]):  # Show last 10
                        print(f"{tx['date']} | {tx['type']} | {tx['amount']:.2f} ETB | Balance: {tx['balance']:.2f} ETB")
                    print("-" * 40)
            
            elif choice == '5':
                break
            else:
                print("Invalid choice. Please try again.")
    
    def menu_transaction_analyzer(self):
        """Day 8: Transaction Analyzer Menu"""
        while True:
            print("\n" + "=" * 40)
            print("  TRANSACTION ANALYZER (Day 8)")
            print("=" * 40)
            print("1. View All Transactions")
            print("2. Calculate Balance (Recursive O(n))")
            print("3. Sort by Amount (Quicksort O(n log n))")
            print("4. Sort by Date (Quicksort O(n log n))")
            print("5. Search Transaction (Linear O(n) / Binary O(log n))")
            print("6. Generate High-Value Report (Recursive)")
            print("7. Back to Main Menu")
            print("=" * 40)
            
            choice = input("Choose option (1-7): ")
            
            if choice == '1':
                self.analyzer.print_transactions()
            
            elif choice == '2':
                balance = self.analyzer.calculate_balance_recursive()
                print(f"Total Calculated Balance: {balance:.2f} ETB")
            
            elif choice == '3':
                self.analyzer.sort_by_amount()
                self.analyzer.print_transactions()
            
            elif choice == '4':
                self.analyzer.sort_by_date()
                self.analyzer.print_transactions()
            
            elif choice == '5':
                try:
                    amount = float(input("Enter transaction amount to search: "))
                    if self.analyzer.is_sorted_by_amount:
                        print("Using Binary Search (O(log n))")
                        results = self.analyzer.binary_search(amount)
                    else:
                        print("Using Linear Search (O(n))")
                        results = self.analyzer.linear_search(amount)
                    
                    if results:
                        print(f"Found {len(results)} matching transaction(s):")
                        self.analyzer.print_transactions(results)
                    else:
                        print("No matching transactions found.")
                except ValueError:
                    print("Invalid amount.")
            
            elif choice == '6':
                try:
                    threshold = float(input("Enter minimum threshold (ETB): "))
                    report = self.analyzer.threshold_report_recursive(threshold)
                    if report:
                        print(f"Transactions >= {threshold} ETB:")
                        self.analyzer.print_transactions(report)
                    else:
                        print("No transactions above threshold.")
                except ValueError:
                    print("Invalid amount.")
            
            elif choice == '7':
                break
            else:
                print("Invalid choice. Please try again.")
    
    def menu_network_priority(self):
        """Day 9: Network & Priority Menu"""
        while True:
            print("\n" + "=" * 40)
            print("  NETWORK & PRIORITY (Day 9)")
            print("=" * 40)
            print("1. View Bank Hierarchy (Tree)")
            print("2. Add Branch/Employee to Hierarchy")
            print("3. View Transfer Network (Graph)")
            print("4. Add Transfer Link (Graph)")
            print("5. BFS Traversal (Connected Accounts)")
            print("6. Add Urgent Transaction (Priority Queue)")
            print("7. Process Highest Priority Transaction")
            print("8. Back to Main Menu")
            print("=" * 40)
            
            choice = input("Choose option (1-8): ")
            
            if choice == '1':
                print("\n" + "=" * 40)
                print("BANK ORGANIZATIONAL HIERARCHY")
                print("=" * 40)
                self.bank_hierarchy.print_tree()
            
            elif choice == '2':
                print("\n--- Add to Hierarchy ---")
                parent = input("Enter parent node name (Head Office/Bole/Piassa): ").strip()
                name = input("Enter name of new entry: ").strip()
                role = input("Enter role (optional): ").strip()
                
                new_node = BankTreeNode(name, role)
                # Simple way: add to root or find matching parent
                if parent.lower() == "head office":
                    self.bank_hierarchy.add_child(new_node)
                elif parent.lower() == "bole":
                    # Find Bole branch
                    for child in self.bank_hierarchy.children:
                        if child.name.lower() == "bole":
                            child.add_child(new_node)
                            break
                elif parent.lower() == "piassa":
                    for child in self.bank_hierarchy.children:
                        if child.name.lower() == "piassa":
                            child.add_child(new_node)
                            break
                else:
                    self.bank_hierarchy.add_child(new_node)
                print(f"Added '{name}' successfully.")
            
            elif choice == '3':
                self.transfer_network.display_network()
            
            elif choice == '4':
                acc1 = input("Enter first account number: ")
                acc2 = input("Enter second account number: ")
                self.transfer_network.add_transfer_link(acc1, acc2)
                print(f"Linked accounts {acc1} and {acc2}.")
            
            elif choice == '5':
                start = input("Enter starting account number: ")
                connected = self.transfer_network.bfs_traversal(start)
                if connected:
                    print(f"Connected accounts from {start}: {' -> '.join(connected)}")
                else:
                    print("Account not found or has no connections.")
            
            elif choice == '6':
                try:
                    priority = int(input("Enter priority (1=Highest, 5=Lowest): "))
                    details = input("Enter transaction details: ")
                    heapq.heappush(self.transaction_heap, (priority, details))
                    print("Transaction added to priority queue.")
                except ValueError:
                    print("Invalid priority.")
            
            elif choice == '7':
                if not self.transaction_heap:
                    print("No transactions in queue.")
                else:
                    priority, details = heapq.heappop(self.transaction_heap)
                    print(f"Processing Transaction:")
                    print(f"  Priority Level: {priority}")
                    print(f"  Details: {details}")
            
            elif choice == '8':
                break
            else:
                print("Invalid choice. Please try again.")
    
    def main_menu(self):
        """Main Menu - Integrated System"""
        while True:
            print("\n" + "=" * 60)
            print("  🏦 ADDIS BANK MANAGEMENT SYSTEM  ")
            print("  Complete Integration: Days 2-9  ")
            print("=" * 60)
            print("1.  Personal Finance Tracker (Day 2)")
            print("2.  Inventory Manager (Day 3)")
            print("3.  Account Management (Days 4-6)")
            print("4.  Customer Service (Day 7)")
            print("5.  Transaction Analyzer (Day 8)")
            print("6.  Network & Priority (Day 9)")
            print("7.  Exit System")
            print("=" * 60)
            print("💡 Tip: Each module demonstrates specific concepts")
            print("=" * 60)
            
            choice = input("Select module (1-7): ")
            
            if choice == '1':
                self.menu_finance_tracker()
            elif choice == '2':
                self.menu_inventory()
            elif choice == '3':
                self.menu_account_management()
            elif choice == '4':
                self.menu_customer_service()
            elif choice == '5':
                self.menu_transaction_analyzer()
            elif choice == '6':
                self.menu_network_priority()
            elif choice == '7':
                print("\n" + "=" * 60)
                print("Thank you for using Addis Bank Management System!")
                print("Exiting... Goodbye! 👋")
                print("=" * 60)
                sys.exit()
            else:
                print("Invalid choice. Please select 1-7.")


# ====================================================================
# PROGRAM ENTRY POINT
# ====================================================================

if __name__ == "__main__":
    # Create and run the integrated system
    bank_system = AddisBankSystem()
    bank_system.main_menu()