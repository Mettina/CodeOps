#1. Simple Class – Person
class person:
     def __init__(self,name,age):
        self.name=name
        self.age=age
     def introduce(self):
        print(f"Hello, {self.name}. You are {self.age} years old.")

# Creating 2 distinct Person objects
person1 = person("Metages", 23)
person2 = person("Almaz", 20)

# Calling the introduce() method on both objects
person1.introduce()
person2.introduce()


#2 .Rectangle Class
class Rectangle:
    def __init__(self,length,width):
        self.length=length
        self.width=width

    def area(self):
        return self.length * self.width
    def perimeter(self):
        return 2 * (self.length + self.width)
    
# create objects

rectangle1=Rectangle(3,4)
rectangle2=Rectangle(5,4)

# Call area() and perimeter() for the first rectangle
print("Rectangle 1")
print("Area:", rectangle1.area())
print("Perimeter:", rectangle1.perimeter())

# Call area() and perimeter() for the second rectangle
print("\nRectangle 2")
print("Area:", rectangle2.area())
print("Perimeter:", rectangle2.perimeter())



#3.Bank Account (Basic) 

class Account:
    def __init__(self,owner,balance):
        self.owner=owner
        self.balance=balance

    def deposit(self,amount):
        self.balance +=amount

    def withdraw(self,amount):
        if amount > self.balance:
            print("insuffcient banalce")
        else:
         self.balance -= amount

acc=Account("Nael",100)
print("Owner:", acc.owner)
print("Balance:", acc.balance)

acc.deposit(300)
print("After deposit:", acc.balance)

acc.withdraw(200)
print("After withdrawal:", acc.balance)

acc.withdraw(500)
print("Final balance:", acc.balance)



