
my_favorite_foods =[ "Kitfo",
                    "Tibs",
                    "Burger",
                    "Shiro",
                    "Sushi",
                    "Pizza"
                    
    ]   #1.Creating a list of 6 favorite foods.

print(my_favorite_foods[0])#2.Print the first city(item or food)

print(my_favorite_foods[-1])#Print the last city(item or food)


my_favorite_foods.append("Tacos") # 3.Add a new city(food) using .append() 

print("After adding:", my_favorite_foods)

my_favorite_foods.pop(1) # 4.removes the second city(food) using .pop()

print("After removing second item:", my_favorite_foods)


Ethiopia_coordinates=(9.145, 40.489673)#Create a tuple of coordinates for Ethiopia and unpack it into two variables

latitude, longitude = Ethiopia_coordinates

print("Latitude:", latitude)

print("Longitude:", longitude)

#2. Dictionaries

# Creating the student dictionary
student = {
    "name": "Metages",
    "age": 23,
    "grade": "A",
    "city": "Addis Ababa",
    "department": "Computer Science"
}

# Accessing and printing the dictionary data
print(f"Student Name: {student['name']}")
print(f"Department:   {student['department']}")


# Adding the new key and value
student["phone"] = "0987654321"

# Printing the updated dictionary to verify
print(student)

# Updating the value of an existing key
student["grade"] = "A+"

# Printing the updated grade to verify
print(f"Updated Grade: {student['grade']}")

#3. Sets 

# Creating a list with duplicate names
names_list = ["Metages", "Alex", "Metages", "Sara", "Alex", "Kebede"]

# Printing the list to see all items
print("Original List:", names_list)

# Converting the list to a set to remove duplicates
unique_names_set = set(names_list)

print("Unique Set:", unique_names_set)

# Adding a new name to the set
unique_names_set.add("Yonas")

print("Updated Set:", unique_names_set)