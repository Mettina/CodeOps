score = float(input("Enter score: "))

if score >= 90:
    print("Excellent")
elif score >= 80:
    print("Very Good")
elif score >= 70:
    print("Good")
elif score >= 50:
    print("Pass")
else:
    print("Fail")
# Number Pattern 
for i in range(1, 21):
    # Print odd numbers
    if i % 2 != 0:
        print(f"{i} is odd")
        
    # Nested if: Check if the number is also divisible by 5
    if i % 5 == 0:
        print(f"--> {i} is divisible by 5")

#While Loop Practice 
total = 0

# Start a loop that keeps running
while True:
    num = int(input("Enter a positive number (0 to stop): "))
    
    # Stop the loop if the user enters 0
    if num == 0:
        break
    # Add the number to the running total
    total += num

print(f"Total sum: {total}")

#Function that prints a welcome message
def greet(name):
    print(f"Welcome, {name}!")

#  Function that returns the square of a number
def square(number):
    return number * number

#  Function that returns True if even, False otherwise
def is_even(number):
    return number % 2 == 0

greet("Ruth")#Testing the functions

result_square = square(4)
print(f"Square of 4 is: {result_square}")


result_even = is_even(7)
print(f"Is 7 even? {result_even}")