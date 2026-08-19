# Addis Bank Account System (Version 1) 
class BankAccount:
    def __init__(self, account_number, name, initial_balance=0.0):
        self.__account_number = account_number
        self.__name = name
        self.__balance = float(initial_balance)

    # Getters for encapsulated data
    def get_account_number(self):
        return self.__account_number

    def get_name(self):
        return self.__name

    def get_balance(self):
        return self.__balance

    # Deposit method with validation
    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than zero.\n")
        self.__balance += amount
        return self.__balance

    # Withdraw method with minimum balance validation
    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero.\n")
        
        # Check if the remaining balance would drop below 50 Birr
        if self.__balance - amount < 50.0:
            raise ValueError("Transaction rejected. You must keep a minimum balance of 50 Birr in your account.\n")
            
        self.__balance -= amount
        return self.__balance

    def view_info(self):
        return f"Account No: {self.__account_number} | Owner: {self.__name} | Balance: {self.__balance:.2f} ETB\n"


#  SavingsAccount inheriting from BankAccount
class SavingsAccount(BankAccount):
    def __init__(self, account_number, name, initial_balance=0.0, interest_rate=0.02):
        super().__init__(account_number, name, initial_balance)
        self.__interest_rate = interest_rate

    def add_interest(self):
        interest = self.get_balance() * self.__interest_rate
        self.deposit(interest)
        return interest

    def view_info(self):
        base_info = super().view_info()
        cleaned_base = base_info.replace("\n", "")
        return f"{cleaned_base} | Type: Savings (Rate: {self.__interest_rate*100}%)\n"


# Menu-Driven Program
def main():
    accounts = {}

    while True:
        # Header formatting lines
        print("\n==============================")
        print("     ADDIS BANK SYSTEM        ")
        print("==============================")
        
        # Menu options listed out on separate print lines
        print("1. Create new account")
        print("2. Deposit")
        print("3. Withdraw")
        print("4. Check balance")
        print("5. View account info")
        print("6. Exit")
        print("==============================")

        choice = input("Choose an option (1-6): ")

        if choice == '1':
            acc_num = input("Enter account number: ")
            if acc_num == "":
                print("Error: Account number cannot be empty.\n")
                continue
                
            if acc_num in accounts:
                print("Error: Account number already exists.\n")
                continue
                
            name = input("Enter account holder name: ")
            if name == "":
                print("Error: Account holder name cannot be empty.\n")
                continue
                
            acc_type = input("Is this a savings account? (y/n): ")
            
            try:
                init_bal = float(input("Enter initial balance (ETB): "))
                if init_bal < 50:
                    print("Error: Initial deposit must be at least 50 Birr to open an account.\n")
                    continue
                
                if acc_type == 'y':
                    rate = float(input("Enter interest rate (e.g., 0.03 for 3%): "))
                    accounts[acc_num] = SavingsAccount(acc_num, name, init_bal, rate)
                else:
                    accounts[acc_num] = BankAccount(acc_num, name, init_bal)
                print("Account created successfully!\n")
            except ValueError:
                print("Error: Invalid numeric input.\n")

        elif choice in ['2', '3', '4', '5']:
            acc_num = input("Enter account number: ")
            if acc_num == "":
                print("Error: Account number cannot be empty.\n")
                continue
                
            if acc_num not in accounts:
                print("Error: Account not found.\n")
                continue
            
            acc = accounts[acc_num]

            if choice == '2':
                try:
                    amt = float(input("Enter amount to deposit (ETB): "))
                    acc.deposit(amt)
                    print(f"Deposited successfully. New balance: {acc.get_balance():.2f} ETB\n")
                except ValueError as e:
                    print(f"Error: {e}")

            elif choice == '3':
                try:
                    amt = float(input("Enter amount to withdraw (ETB): "))
                    acc.withdraw(amt)
                    print(f"Withdrawn successfully. New balance: {acc.get_balance():.2f} ETB\n")
                except ValueError as e:
                    print(f"Error: {e}")

            elif choice == '4':
                print(f"Current Balance: {acc.get_balance():.2f} ETB\n")

            elif choice == '5':
                print(acc.view_info())

        elif choice == '6':
            print("Exiting program.!\n")
            break
        else:
            print("Invalid choice. Please select from 1 to 6.\n")

if __name__ == "__main__":
    main()
