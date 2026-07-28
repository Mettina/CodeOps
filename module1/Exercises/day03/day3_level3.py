# Program: Write and Read Student Scores
# This program writes 5 Ethiopian student names and scores to a file,
# then reads the file and calculates the average score.

def write_students(filename):
    """
    Writes 5 student names and scores to a file.
    
    """
    students = [
        ("Abebe", 85),
        ("Almaz", 90),
        ("Bekele", 78),
        ("Desta", 92),
        ("Fikir", 88)
    ]
    
    # Open the file in write mode ("w") - this will create or overwrite the file
    with open(filename, "w") as file:
        for name, score in students:
            file.write(f"{name},{score}\n")
    
    print(f" Student data has been written to '{filename}'.")


def read_and_average(filename):
    """
    Reads student scores from a file and calculates the average score.
    Handles the case where the file does not exist.
    """
    try:
        with open(filename, "r") as file:
            scores = []
            
            for line in file:
                # Remove extra spaces/newlines and split by comma
                name, score = line.strip().split(",")
                scores.append(int(score))
            
            # Calculate average
            average_score = sum(scores) / len(scores)
            print(f" The average score is: {average_score:.2f}")
    
    except FileNotFoundError:
        print(f"The file '{filename}' was not found. Please write data first.")


# Main program
if __name__ == "__main__":
    filename = "students.txt"
    
    # Step 1: Write student data to file
    write_students(filename)
    
    # Step 2: Read file and calculate average score
    read_and_average(filename)

    def get_number(prompt):
     while True:
        try:
            # Ask the user for input and try to convert it to a float
            number = float(input(prompt))
            return number
        except ValueError:
            # Handle the exception if the input is not a number
            print("Invalid input! Please enter a numeric value.")

# 9.Error Handling 
try:
    # Ask the user for two numbers
    num1 = float(input("Enter the first number: "))
    num2 = float(input("Enter the second number: "))

    # Perform division
    result = num1 / num2

    # Display the result
    print("Result:", result)

except ValueError:
    print("Error: Please enter valid numeric values.")

except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")

finally:
    print("Calculation attempt completed")