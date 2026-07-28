#  Single Responsibility Principle (SRP) Implementation - Ethiopian Birr (ETB)

# Responsibility 1: Core Data Container
class Employee:
    def __init__(self, name, base_salary, transport_allowance):
        self.name = name
        self.base_salary = base_salary
        self.transport_allowance = transport_allowance


# Responsibility 2: Business Logic / Calculations
class SalaryCalculator:
    def __init__(self, income_tax_rate=0.30):  # Standard 30% tax bracket for higher income
        self.income_tax_rate = income_tax_rate

    def calculate_net_pay(self, employee):
        # Ethiopian tax rule example: Tax applies to base, transport allowance might be exempt up to a limit
        taxable_income = employee.base_salary
        tax_deduction = taxable_income * self.income_tax_rate
        
        net_pay = (employee.base_salary + employee.transport_allowance) - tax_deduction
        return net_pay


# Responsibility 3: Data Persistence (I/O)
class FileSaver:
    def __init__(self, filename="ethiopian_payroll.txt"):
        self.filename = filename

    def save_record(self, employee, net_salary):
        with open(self.filename, "a", encoding="utf-8") as file:
            file.write(f"Name: {employee.name}, Net Salary: {net_salary:,.2f} ETB\n")
        print(f"[File System]: Saved {employee.name}'s record to '{self.filename}'.")


# Responsibility 4: Communication / Notifications
class EmailService:
    def send_payslip_alert(self, employee, net_salary):
        print(f"[Email System]: Sent electronic payslip notification to {employee.name}.")
        print(f"               -> Body: 'Dear {employee.name}, your net payout of {net_salary:,.2f} ETB has been deposited.'")


# --- Execution Test ---
if __name__ == "__main__":
    print("--- Starting SRP Compliant Workflow (Ethiopia) --- \n")

    # 1. Initialize data container (Amounts in ETB)
    emp = Employee(name="Almaz Kebede", base_salary=25000.0, transport_allowance=3500.0)

    # 2. Instantiate dedicated service actors
    calculator = SalaryCalculator(income_tax_rate=0.30)
    saver = FileSaver()
    emailer = EmailService()

    # 3. Execute isolated tasks sequentially
    net_salary = calculator.calculate_net_pay(emp)
    print(f"[Calculated]: {emp.name}'s final net earnings match {net_salary:,.2f} ETB\n")

    saver.save_record(emp, net_salary)
    emailer.send_payslip_alert(emp, net_salary)

   