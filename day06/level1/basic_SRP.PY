
#  Single Responsibility Principle (SRP) using Name and Salary only

# Class 1: Only stores basic employee data
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary


# Class 2: Only handles saving data records to a file
class FileSaver:
    def save(self, employee):
        with open("employees.txt", "a") as file:
            file.write(f"Name: {employee.name}, Salary: ${employee.salary}\n")
        print(f"Saved {employee.name} record to file.")


# Class 3: Only handles sending text alerts
class EmailService:
    def send_email(self, employee):
        print(f"Sent payslip email to {employee.name}.")


# --- Execution Test ---
if __name__ == "__main__":
    # Create a simple employee object with a name and a salary
    emp = Employee("Almaz Kebede", 4000)

    # Instantiate the helper classes for each separate job
    saver = FileSaver()
    emailer = EmailService()

    # Step 1: Save the record to a file
    saver.save(emp)

    # Step 2: Send the notification email
    emailer.send_email(emp)
