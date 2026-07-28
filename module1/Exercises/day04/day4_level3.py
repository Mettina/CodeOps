# 7. Full Bank Account

class BankAccount:
    def __init__(self, name, initial_balance):
        self.name = name
        self.__balance = initial_balance  # Initialize the private attribute directly
        self.__borrowed_amount = 0        # Tracker for the borrow/return methods

    @property
    def balance(self):
        """Getter: Safely returns the private balance value."""
        return self.__balance

    @balance.setter
    def balance(self, value):
        """Setter: Regulates direct balance updates."""
        if value < 0:
            print(" Error: Balance cannot be negative.")
        else:
            self.__balance = value

    def deposit(self, amount):
        """Adds funds with positive amount validation."""
        if amount > 0:
            self.__balance += amount
            print(f" Deposited ${amount:,} to {self.name}'s account.")
        else:
            print(" Error: Deposit amount must be positive.")

    def withdraw(self, amount):
        """Withdraws funds with a strict sufficiency check."""
        if amount <= 0:
            print(" Error: Withdrawal amount must be positive.")
        elif amount <= self.__balance:
            self.__balance -= amount
            return True
        else:
            print(f" Error: Insufficient funds for {self.name}.")
            return False

    def transfer(self, to_account, amount):
        """Transfers funds safely between two distinct account instances."""
        if amount <= 0:
            print("Error: Transfer amount must be positive.")
        elif self.withdraw(amount):
            to_account.deposit(amount)
            print(f"  Successfully transferred ${amount:,} from {self.name} to {to_account.name}.")

    # --- Add, Borrow & Return Operations ---
    
    def borrow_funds(self, amount):
        """Allows borrowing money, increasing the cash balance while tracking debt."""
        if amount > 0:
            self.__borrowed_amount += amount
            self.__balance += amount
            print(f" {self.name} borrowed ${amount:,}. Current Debt: ${self.__borrowed_amount:,}")
        else:
            print(" Error: Borrow amount must be positive.")

    def return_funds(self, amount):
        """Repays borrowed debt out of the current active balance."""
        if amount <= 0:
            print(" Error: Return amount must be positive.")
        elif amount > self.__borrowed_amount:
            print(f" Error: You cannot return more than you owe! Total Debt: ${self.__borrowed_amount:,}")
        elif amount > self.__balance:
            print(" Error: Insufficient funds in active balance to make this repayment.")
        else:
            self.__balance -= amount
            self.__borrowed_amount -= amount
            print(f"  Paid back ${amount:,}. Remaining Debt: ${self.__borrowed_amount:,}")


# --- Testing Program Execution ---
if __name__ == "__main__":
    # Create accounts
    account1 = BankAccount("Metages", 10000)
    account2 = BankAccount("Sara", 5000)

    
    # Testing Deposit (Add) & Transfer
    account1.transfer(account2, 2000)
    
    
    # Testing Borrowing 
    account1.borrow_funds(3000)
    
  
    # Testing Returning 
    account1.return_funds(1500)

   
    # Final Balances Summary Dashboard
    print(f" ▪ {account1.name}'s Final Balance: ${account1.balance:,}")
    print(f" ▪ {account2.name}'s Final Balance: ${account2.balance:,}")
   


# 8. Library System

class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        # Private attribute to enforce proper data hiding encapsulation
        self.__available = True

    @property
    def available(self):
        """Read-only getter to safely check a book's active shelf status."""
        return self.__available

    def mark_as_borrowed(self):
        """Encapsulated state changer: returns True if successful, False if already borrowed."""
        if self.__available:
            self.__available = False
            return True
        return False

    def mark_as_returned(self):
        """Encapsulated state changer: returns True if successful, False if already on shelf."""
        if not self.__available:
            self.__available = True
            return True
        return False


class Library:
    def __init__(self):
        self.books = []

    def add_book(self, book):
        """Registers a new book object into the system storage list."""
        self.books.append(book)
        print(f"Added to Library: '{book.title}' by {book.author}")

    def borrow_book(self, isbn):
        """Finds a book by ISBN and validates if it can be borrowed safely."""
        for book in self.books:
            if book.isbn == isbn:
                if book.mark_as_borrowed():
                    print(f"Success: '{book.title}' has been checked out.")
                    return
                else:
                    print(f"Error: '{book.title}' is already borrowed.")
                    return
        print(f"Error: Book with ISBN '{isbn}' was not found in our catalog.")

    def return_book(self, isbn):
        """Finds a book by ISBN and validates if it can be returned safely."""
        for book in self.books:
            if book.isbn == isbn:
                if book.mark_as_returned():
                    print(f"Success: '{book.title}' has been returned to the shelf.")
                    return
                else:
                    print(f"Warning: '{book.title}' is already available on the shelf.")
                    return
        print(f"Error: Book with ISBN '{isbn}' belongs to a different library.")


# --- Testing Program Execution ---
if __name__ == "__main__":
    # Create instances
    book1 = Book("Python Basics", "Samuel", "py001")
    library = Library()

    print("==================================================")
    library.add_book(book1)

    print("\n==================================================")
    # Test borrowing execution path
    library.borrow_book("py001")
    print(f"Is book available? -> {book1.available}")
    
    # Test duplicate borrowing attempt error check
    library.borrow_book("py001")

    print("\n==================================================")
    # Test returning execution path
    library.return_book("py001")
    print(f"Is book available? -> {book1.available}")


# 9. Car Class with Encapsulation 

class Car:
    def __init__(self):
        self.__speed = 0
        self.__fuel = 100

    @property
    def speed(self):
        # Read-only getter for vehicle speed.
        return self.__speed

    @property
    def fuel(self):
        # Read-only getter for vehicle fuel level.
        return self.__fuel

    def accelerate(self):
        # Increases speed by 10 and consumes 5 units of fuel if fuel is available.
        if self.__fuel >= 5:
            self.__speed += 10
            self.__fuel -= 5
            print(f"Accelerated: Speed is {self.__speed} km/h, Fuel is {self.__fuel}%")
        else:
            print("Error: Out of fuel! Cannot accelerate.")

    def brake(self):
        # Decreases speed by 10, ensuring it never drops below 0.
        if self.__speed >= 10:
            self.__speed -= 10
        else:
            self.__speed = 0
        print(f"Braked: Speed is {self.__speed} km/h")

    def refuel(self):
        # Restores fuel to maximum capacity.
        self.__fuel = 100
        print("Refueled: Fuel is back to 100%")


# --- Testing Program Execution ---
if __name__ == "__main__":
    car = Car()

    print("==================================================")
    car.accelerate()
    car.accelerate()
    
    print("\n==================================================")
    car.brake()
    
    print("\n==================================================")
    car.refuel()
    
    print("\n==================================================")
    print(f"Final Speed: {car.speed} km/h")
    print(f"Final Fuel:  {car.fuel}%")
    print("==================================================")
