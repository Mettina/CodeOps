
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




