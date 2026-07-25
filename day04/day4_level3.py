
# 7. Full Bank Account

class BankAccount:


    def __init__(self,name,balance):

        self.name=name

        self.__balance=balance



    @property
    def balance(self):

        return self.__balance



    @balance.setter
    def balance(self,value):

        self.__balance=value



    def deposit(self,amount):

        if amount>0:

            self.__balance+=amount



    def withdraw(self,amount):

        if amount <= self.__balance:

            self.__balance-=amount

        else:

            print("Insufficient money")



    def transfer(self,to_account,amount):

        if amount <= self.__balance:

            self.withdraw(amount)

            to_account.deposit(amount)




account1=BankAccount(
    "Genet",
    10000
)


account2=BankAccount(
    "Sara",
    5000
)


account1.transfer(account2,2000)


print(account1.balance)

print(account2.balance)


# 8. Library System

class Book:


    def __init__(self,title,author,isbn):

        self.title=title

        self.author=author

        self.isbn=isbn

        self.available=True





class Library:


    def __init__(self):

        self.books=[]



    def add_book(self,book):

        self.books.append(book)



    def borrow_book(self,isbn):

        for book in self.books:

            if book.isbn==isbn:

                book.available=False




    def return_book(self,isbn):

        for book in self.books:

            if book.isbn==isbn:

                book.available=True





book=Book(
    "Python",
    "John",
    "001"
)


library=Library()


library.add_book(book)


library.borrow_book("001")


print(book.available)


library.return_book("001")


print(book.available)

# 9. Car Class

class Car:


    def __init__(self):

        self.__speed=0

        self.__fuel=100



    @property
    def speed(self):

        return self.__speed



    @property
    def fuel(self):

        return self.__fuel




    def accelerate(self):

        self.__speed+=10



    def brake(self):

        self.__speed-=10



    def refuel(self):

        self.__fuel=100


car=Car()


car.accelerate()

car.accelerate()

car.brake()

car.refuel()

print(car.speed)

print(car.fuel)