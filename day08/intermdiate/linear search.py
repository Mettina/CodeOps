# Time Complexity: O(n) - In the worst case, we check every element once.
# Space Complexity: O(1) - Only a few tracking variables are held in memory.
def linear_search(arr: list, target: any) -> int:
    # Iterate through the list with index tracking
    for index in range(len(arr)):
        if arr[index] == target:
            return index  # Return the index immediately upon finding the target
            
    return -1  # Return -1 if the loop finishes without finding the target



if __name__ == "__main__":
    items = [50, 20, 80, 40, 10, 30]
    
    print(f"Dataset: {items}")
    
    # Test case 1: Target exists
    target_1 = 40
    result_1 = linear_search(items, target_1)
    print(f"Searching for {target_1}: Found at index {result_1}")
    
    # Test case 2: Target does not exist
    target_2 = 99
    result_2 = linear_search(items, target_2)
    print(f"Searching for {target_2}: Result is {result_2}")
