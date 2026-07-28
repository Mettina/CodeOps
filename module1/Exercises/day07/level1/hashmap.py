# 1. Create a dictionary with 5 students and their grades
student_grades = {
    "Almaz": 85,
    "Bekele": 92,
    "Chala": 78,
    "Desta": 95,
    "Eskinder": 88
}
print("Original dictionary:", student_grades)

# 2. Add a new student
student_grades["Fikre"] = 91
print("After adding Fikre:", student_grades)

# 3. Update a grade
student_grades["Chala"] = 84
print("After updating Chala's grade:", student_grades)

# 4. Check if a student exists (Fast O(1) lookup)
search_name = "Desta"
if search_name in student_grades:
    print(f"Yes, {search_name} exists! Grade: {student_grades[search_name]}")
else:
    print(f"No, {search_name} is not in the dictionary.")
