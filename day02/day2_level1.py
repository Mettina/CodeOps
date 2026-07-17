# Creating variables
full_name = "Metages Asebe"
age = 24
height = 1.55
is_student = True
favorite_food = "Kitfo"

# Printing using an f-string
status = "currently a student" if is_student else "not a student"
print(f" Hello! My name is {full_name}. I am {age} years old and stand {height} meters tall. Right now, I am {status}, and if you want to make me happy, just bring me some {favorite_food}! ")

# Taking and casting user inputs
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

# Displaying the arithmetic results

print(f"   ARITHMETIC RESULTS for {num1} and {num2}   ")

print(f"Sum (Addition):          {num1} + {num2} = {num1 + num2}")
print(f"Difference (Subtraction): {num1} - {num2} = {num1 - num2}")
print(f"Product (Multiplication): {num1} * {num2} = {num1 * num2}")

# Handling potential division by zero
if num2 != 0:
    print(f"Division:                {num1} / {num2} = {num1 / num2}")
    print(f"Floor Division:          {num1} // {num2} = {num1 // num2}")
    print(f"Remainder (Modulus):     {num1} % {num2} = {num1 % num2}")
else:
    print("Division:                Cannot divide by zero!")
    print("Floor Division:          Cannot divide by zero!")
    print("Remainder (Modulus):     Cannot divide by zero!")


# Asking for user input 
birth_year = int(input("Enter your birth year: "))

# Calculating the age using the current year 2026
current_year = 2026
age = current_year - birth_year


print(f"You are {age} years old")

# Ask user for the score
score = float(input("Enter score: "))

# Check if pass or fail
if score >= 50:
    print("Pass")
else:
    print("Fail")

