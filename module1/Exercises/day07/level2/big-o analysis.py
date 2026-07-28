# ==========================================
# 1. ARRAYS / LISTS (with Amharic Names)
# ==========================================
print("--- 1. Arrays / Lists ---")

# Create a list of 10 student names
students = ["Almaz", "Bekele", "Chala", "Desta", "Eskinder", "Fikre", "Girma", "Hagos", "Iskander", "Julia"]
print("Original list:", students)

# Accessing by index (0-based indexing)
first_student = students[0]
fourth_student = students[3]
print(f"First student (index 0): {first_student}")
print(f"Fourth student (index 3): {fourth_student}")

# Adding at the end
students.append("Kevin")
print("After adding to the end:", students)

# Inserting at position 0
students.insert(0, "Amara")
print("After inserting at position 0:", students)
print("\n" + "="*40 + "\n")


# ==========================================
# 2. HASHMAPS / DICTIONARIES
# ==========================================
print("--- 2. Hashmaps (Dictionaries) ---")

# Create a dictionary with 5 students and their grades
student_grades = {
    "Almaz": 85,
    "Bekele": 92,
    "Chala": 78,
    "Desta": 95,
    "Eskinder": 88
}
print("Original dictionary:", student_grades)

# Add a new student
student_grades["Fikre"] = 91
print("After adding Fikre:", student_grades)

# Update a grade
student_grades["Chala"] = 84
print("After updating Chala's grade:", student_grades)

# Check if a student exists (Fast lookup)
search_name = "Desta"
if search_name in student_grades:
    print(f"Yes, {search_name} exists! Grade: {student_grades[search_name]}")
else:
    print(f"No, {search_name} is not in the dictionary.")
print("\n" + "="*40 + "\n")


# ==========================================
# 3. BIG-O ANALYSIS FUNCTIONS
# ==========================================
print("--- 3. Big-O Analysis ---")

# Function 1: Linear Time Complexity - O(n)
def find_max(numbers):
    if not numbers:
        return None
    max_num = numbers[0]
    for num in numbers:
        if num > max_num:
            max_num = num
    return max_num

# Function 2: Quadratic Time Complexity - O(n^2)
def find_pair_sum(numbers, target):
    n = len(numbers)
    for i in range(n):
        for j in range(i + 1, n):
            if numbers[i] + numbers[j] == target:
                return (numbers[i], numbers[j])
    return None

# Demonstrating Big-O Functions
sample_numbers = [10, 45, 5, 23, 40, 17]
print("Sample List:", sample_numbers)

# Run O(n) function
max_value = find_max(sample_numbers)
print(f"Max value found [O(n)]: {max_value}")

# Run O(n^2) function
target_sum = 50
pair = find_pair_sum(sample_numbers, target_sum)
print(f"Pair that sums to {target_sum} [O(n^2)]: {pair}")
