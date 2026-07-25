# Time Complexity: O(n) - Scans the array from both ends toward the middle in a single pass.
# Space Complexity: O(1) - Constant space storage using only two pointer index variables.
def find_two_sum_sorted(arr: list, target: int) -> tuple:
    # Initialize pointers at both extremes of the array
    left = 0
    right = len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        # Scenario 1: Target sum found
        if current_sum == target:
            return (arr[left], arr[right])
        
        # Scenario 2: Sum is too small -> move left pointer right to increase value
        elif current_sum < target:
            left += 1
            
        # Scenario 3: Sum is too large -> move right pointer left to decrease value
        else:
            right -= 1

    return None  # No matching pair found



# EXECUTABLE DEMONSTRATION

if __name__ == "__main__":
    # Two pointer technique MUST receive a pre-sorted array
    sorted_numbers = [1, 3, 4, 6, 8, 10, 13]
    target_sum = 14
    
    print(f"Sorted Dataset: {sorted_numbers}")
    print(f"Target Sum    : {target_sum}")
    
    result = find_two_sum_sorted(sorted_numbers, target_sum)
    
    if result:
        print(f"Match Found   : {result[0]} + {result[1]} = {target_sum}")
    else:
        print("No two numbers add up to the target.")
