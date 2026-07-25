# Open/Closed Principle (OCP) - Simple Version

#  Base Class serving as a blueprint
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_bonus(self):
        return 0


#  Permanent Employee Extension
class PermanentEmployee(Employee):
    def get_bonus(self):
        return self.salary * 0.10  # 10% bonus rule


# Contract Employee Extension
class ContractEmployee(Employee):
    def get_bonus(self):
        return self.salary * 0.05  # 5% bonus rule


#  NEW TYPE EXTENSION: Added easily without changing any other class code!
class InternEmployee(Employee):
    def get_bonus(self):
        return 500  # Flat rate bonus rule


# The core calculation function remains closed to modification
def print_bonus(employee_object):
    print(f"Bonus for {employee_object.name}: ${employee_object.get_bonus():,.2f}")


# --- Execution Test ---
if __name__ == "__main__":
    # Create different types of employees using their specific blueprints
    emp1 = PermanentEmployee("Almaz Kebede", 5000)
    emp2 = ContractEmployee("Bekele Lemma", 4000)
    emp3 = InternEmployee("Chala Alemu", 1500)

    # Calculate bonuses using the exact same closed function call
    print_bonus(emp1)
    print_bonus(emp2)
    print_bonus(emp3)
