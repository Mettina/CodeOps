
# 4. Student Class



class Student:


    def __init__(self,name,student_id):

        self.name=name

        self.student_id=student_id

        self.grades=[]



    def add_grade(self,grade):

        self.grades.append(grade)



    def average_grade(self):

        return sum(self.grades)/len(self.grades)




student=Student(
    "Genet",
    "CS001"
)


student.add_grade(90)

student.add_grade(80)

student.add_grade(95)



print(
"Average:",
student.average_grade()
)


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





# ==========================
# 6. Encapsulation Account
# ==========================


class Account:


    def __init__(self,owner,balance):

        self.owner=owner

        self.__balance=balance



    @property
    def balance(self):

        return self.__balance



    def withdraw(self,amount):

        if amount > self.__balance:

            print("Not enough balance")

        else:

            self.__balance-=amount




account=Account(
    "Genet",
    10000
)


account.withdraw(3000)


print(
"Balance:",
account.balance
)