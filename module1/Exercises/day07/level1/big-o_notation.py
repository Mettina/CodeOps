# Big-O Time Complexity Examples

# 1. Accessing an element by index has O(1) complexity (Instant)
lst = [1, 3, 4]
print(lst[0]) 

# 2. Searching for an element using 'in' has O(n) complexity (Scans everything)
target = 3
for i in lst:
    if i == target:
        print("searched value found")
        break

# 3. Inserting at the beginning has O(n) complexity (Shifts all items right)
lst.insert(0, 3)
print(lst)

# 4. Dictionary lookup by key has O(1) complexity (Instant hash lookup)
accounts = {"001": "Almaz", "002": "Bekele"}
print(accounts["001"])
