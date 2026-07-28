# 4. Student Class

class Student:
    def __init__(self, name, student_id):
        self.name = name
        self.student_id = student_id
        self.grades = []  

    def add_grade(self, grade):
        self.grades.append(grade)

    # Method to calculate the average grade
    def average_grade(self):
        if len(self.grades) == 0:
            return 0  # Prevents a crash if the list is empty
        return sum(self.grades) / len(self.grades)


# --- Quick Test ---
student1 = Student("Metages", "UU93898R")
student1.add_grade(90)
student1.add_grade(80)

print(f"Average Grade: {student1.average_grade()}")


# 5. Product Class

class Product:

    def __init__(self,name,price,stock):

        self.name=name

        self.price=price

        self.stock=stock


    def sell(self,quantity):

        if quantity <= self.stock:

            self.stock -= quantity

        else:

            print("Not enough stock")

    def restock(self,quantity):

        self.stock += quantity


product=Product(
    "Laptop",
    50000,
    10
)


product.sell(3)
product.restock(5)

print(
"Stock:",
product.stock
)


# 6. Encapsulation Account


class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance  # Private attribute

    @property
    def balance(self):
        """Read-only getter for the private balance."""
        return self.__balance

    def withdraw(self, amount):
        """Implements safe withdrawal validation checks."""
        if amount <= 0:
            print("Error: Withdrawal amount must be greater than zero.")
        elif amount > self.__balance:
            print(" Error: Insufficient funds for this transaction.")
        else:
            self.__balance -= amount
            print(f"  Success: Withdrew ${amount:,} from your account.")


# --- Testing the Bank Account ---
if __name__ == "__main__":
    account = Account("Metages", 10000)

    # Perform a valid transaction
    account.withdraw(3000)

    # Print a clean dashboard summary
  
    print(f" {'ACCOUNT SUMMARY'} ")
    print(f" ▪ Account Owner:   {account.owner}")
    print(f" ▪ Current Balance: ${account.balance}")
   
