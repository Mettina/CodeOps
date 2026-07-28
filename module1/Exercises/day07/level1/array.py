# 1. Create a list of 10 student names
students = ["Alex", "Blake", "Charlie", "Diana", "Ethan", "Fiona", "Garrett", "Hannah", "Ian", "Julia"]
print("Original list:", students)

# 2. Accessing by index (Python uses 0-based indexing)
first_student = students[0]
fourth_student = students[3]
print(f"First student (index 0): {first_student}")
print(f"Fourth student (index 3): {fourth_student}")

# 3. Adding at the end
students.append("Kevin")
print("After adding to the end:", students)

# 4. Inserting at position 0
students.insert(0, "Amara")
print("After inserting at position 0:", students)
