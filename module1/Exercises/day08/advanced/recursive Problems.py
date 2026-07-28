# Time Complexity: O(n^2) - Slicing numbers[1:] takes O(n) time, executed n times.
# Space Complexity: O(n) - The recursive call stack reaches a maximum depth of n.
def count_occurrences(numbers: list, target: any) -> int:
    # Base Case: An empty list contains zero occurrences
    if not numbers:
        return 0
    
    # Check if the first element matches the target
    match = 1 if numbers[0] == target else 0
    
    # Recursive Case: Add the match value to the count of the remaining list
    return match + count_occurrences(numbers[1:], target)



if __name__ == "__main__":
    test_list = [1, 4, 2, 4, 3, 4, 5]
    target_val = 4
    print(f"Dataset: {test_list}")
    print(f"Occurrences of {target_val}: {count_occurrences(test_list, target_val)}")
