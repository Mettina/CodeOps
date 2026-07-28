# Time Complexity: O(log n) - Halves the search space with every single step.
# Space Complexity: O(1) - Iterative approach uses a constant amount of memory pointers.
def binary_search(arr: list, target: int) -> int:
    low = 0
    high = len(arr) - 1

    while low <= high:
        # Calculate the midpoint of the current search space
        mid = (low + high) // 2
        
        # Target found: return its position index
        if arr[mid] == target:
            return mid
        
        # If target is larger, ignore the entire left half
        elif arr[mid] < target:
            low = mid + 1
            
        # If target is smaller, ignore the entire right half
        else:
            high = mid - 1
            
    return -1  # Target not found in the array



if __name__ == "__main__":
    # Binary search MUST receive a pre-sorted array
    sorted_items = [10, 20, 30, 40, 50, 60, 70]
    
    print(f"Sorted Dataset: {sorted_items}")
    
    # Test case 1: Target exists
    target_1 = 60
    result_1 = binary_search(sorted_items, target_1)
    print(f"Searching for {target_1}: Found at index {result_1}")
    
    # Test case 2: Target does not exist
    target_2 = 25
    result_2 = binary_search(sorted_items, target_2)
    print(f"Searching for {target_2}: Result is {result_2}")
