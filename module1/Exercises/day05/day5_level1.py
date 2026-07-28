# 1. Simple Inheritance - Vehicle Parent Class with Car and Motorcycle Child Classes

class Vehicle:
    def __init__(self, name, model, year):
        # Base attributes shared by all types of vehicles
        self.name = name
        self.model = model
        self.year = year

    def info(self):
        # Base method to display general vehicle details
        print(f"{self.name} {self.model} ({self.year})")


class Car(Vehicle):
    def __init__(self, name, model, year, country):
        # Forward basic properties to the main Vehicle setup
        super().__init__(name, model, year)
        # Unique attribute specific to Cars
        self.country = country

    def carmethod(self):
        # Unique method specific to Cars
        print(f"This car made in {self.country}")


class Motorcycle(Vehicle):
    def __init__(self, name, model, year, price):
        # Forward basic properties to the main Vehicle setup
        super().__init__(name, model, year)
        # Unique attribute specific to Motorcycles
        self.price = price

    def motormethod(self):
        # Unique method specific to Motorcycles
        print(f"Its price is {self.price} ETB")


# --- Object Verification and Output Execution ---

print("==================================================")
print("              VEHICLE DEMONSTRATION               ")
print("==================================================")
# Creating instances with updated car and motorcycle names/models
car = Car("Tesla", "Model Y", 2025, "USA")
bike = Motorcycle("Honda", "CBR650R", 2024, 9800)

# Executing Car actions
car.info()
car.carmethod()

print("-" * 30)  # Visual separator for clarity

# Executing Motorcycle actions
bike.info()
bike.motormethod()


# 2. SavingsAccount Inheritance - Extending the Account Class

class Account:
    # The base Account class featuring full encapsulation.
    def __init__(self, account_number, name, initial_balance=0.0):
        self.__account_number = account_number
        self.__name = name
        self.__balance = float(initial_balance)

    # Getters to securely access private data fields
    def get_account_number(self):
        return self.__account_number

    def get_name(self):
        return self.__name

    def get_balance(self):
        return self.__balance

    def _set_balance(self, new_balance):
        self.__balance = float(new_balance)

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return True
        return False

    def info(self):
        print(f"Account No: {self.__account_number} | Owner: {self.__name} | Balance: {self.__balance:,.2f} ETB")


class SavingsAccount(Account):
    # Child class that inherits from Account and introduces interest logic.
    def __init__(self, account_number, name, initial_balance, interest_rate):
        # Forward foundational details to the base Account constructor
        super().__init__(account_number, name, initial_balance)
        # Unique attribute specific to savings plans (e.g., 0.07 for 7%)
        self.interest_rate = float(interest_rate)

    def add_interest(self):
        # Calculates interest on the current balance and deposits it directly.
        current_balance = self.get_balance()
        interest_earned = current_balance * self.interest_rate
        
        # Safely modify the private balance using the inherited deposit method
        self.deposit(interest_earned)
        print(f"Interest Added: +{interest_earned:,.2f} ETB (Rate: {self.interest_rate * 100:.1f}%)")


# --- Object Verification and Output Execution ---

print("\n==================================================")
print("            SAVINGS ACCOUNT DEMONSTRATION          ")
print("==================================================")
# Instantiating a new specialized SavingsAccount
savings = SavingsAccount("SA-5501", "Almaz Kebede", 2000.0, 0.07)

# Displaying initial state
savings.info()

# Applying interest and verifying the state change
savings.add_interest()
savings.info()


# 3. CurrentAccount Inheritance - Method Overriding and Overdraft Protection

class CurrentAccount(Account):
    # Child class that inherits from Account and overrides withdraw to allow overdrafts.
    def __init__(self, account_number, name, initial_balance, overdraft_limit):
        super().__init__(account_number, name, initial_balance)
        self.overdraft_limit = float(overdraft_limit)

    def withdraw(self, amount):
        if amount <= 0:
            print("Error: Withdrawal amount must be greater than zero.")
            return False

        current_balance = self.get_balance()
        max_allowed_withdrawal = current_balance + self.overdraft_limit

        if amount <= max_allowed_withdrawal:
            new_balance = current_balance - amount
            self._set_balance(new_balance)
            print(f"Success: Withdrew {amount:,.2f} ETB")
            return True
        else:
            print(f"Transaction Denied: Exceeds overdraft limit of {self.overdraft_limit:,.2f} ETB")
            return False

    def info(self):
        # Generates a clear summary block using plain text lines
        print("--------------------------------------------------")
        print("               ACCOUNT PROFILE                    ")
        print("--------------------------------------------------")
        print(f" Account No   : {self.get_account_number():<10}")
        print(f" Owner        : {self.get_name():<15}")
        print(f" Balance      : {self.get_balance():,.2f} ETB")
        print(f" Account Type : Current Account")
        print(f" Overdraft    : Max Safety Cushion {self.overdraft_limit:,.2f} ETB")
        print("--------------------------------------------------")


# --- Object Verification and Output Execution ---

print("\n==================================================")
print("            CURRENT ACCOUNT DEMONSTRATION          ")
print("==================================================")
# Instantiating a new specialized CurrentAccount
current = CurrentAccount("CA-9902", "Bekele Lemma", 300.0, 500.0)

print("\n[System Action] Initial Account Setup")
current.info()

print("\n[System Action] Test 1: Standard Withdrawal of 100.00 ETB")
current.withdraw(100.0)
current.info()

print("\n[System Action] Test 2: Overdraft Withdrawal of 400.00 ETB")
current.withdraw(400.0)
current.info()

print("\n[System Action] Test 3: Exceeding Overdraft Cushion by 400.00 ETB")
current.withdraw(400.0)
