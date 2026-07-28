#1. Variables & Data Types
# Creating variables
full_name = "Metages Asebe"
age = 24
height = 1.55
is_student = True
favorite_food = "Kitfo"

# Printing using an f-string

print(f" Hello! My name is {full_name}. I am {age} years old and stand {height} meters tall. if you want to make me happy, just bring me some {favorite_food}34! ")

#2. Arithmetic Operations
# Taking and casting user inputs
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

# Visual divider
print("\n" + "=" * 50)
print(f" {f'ARITHMETIC RESULTS FOR {num1} & {num2}':^48} ")
print("=" * 50)

# Displaying basic arithmetic results
print(f" ▪ Sum (Addition):          {num1} + {num2} = {num1 + num2}")
print(f" ▪ Difference (Sub):       {num1} - {num2} = {num1 - num2}")
print(f" ▪ Product (Mult):         {num1} * {num2} = {num1 * num2}")

# Handling potential division by zero with clean formatting
if num2 != 0:
    print(f" ▪ Division:               {num1} / {num2} = {num1 / num2:.2f}")
    print(f" ▪ Floor Division:         {num1} // {num2} = {num1 // num2}")
    print(f" ▪ Remainder (Modulus):    {num1} % {num2} = {num1 % num2}")
else:
    print(" Division:               Cannot divide by zero!")
    print(" Floor Division:         Cannot divide by zero!")
    print(" Remainder (Modulus):    Cannot divide by zero!")

print("=" * 50 + "\n")


#3. Type Conversion
# Asking for user input 
birth_year = int(input("Enter your birth year: "))

# Calculating the age using the current year 2026
current_year = 2026
age = current_year - birth_year


print(f"You are {age} years old")

#4. Simple Decision (if/else)
# Ask user for the score
score = float(input("Enter score: "))

# Check if pass or fail
if score >= 50:
    print("Pass")
else:
    print("Fail")

