# Time Complexity: O(n^2) due to the slicing operation numbers[1:] creating a new list each time.
# Space Complexity: O(n) due to the depth of the recursive call stack.
def sum_list(numbers: list) -> int:
    # Base Case: An empty list has a sum of 0
    if not numbers:
        return 0
    # Recursive Case: Add the first number to the sum of the remaining list
    return numbers[0] + sum_list(numbers[1:])



if __name__ == "__main__":
    test_list = [1, 2, 3, 4, 5]
    
    print(f"Original List: {test_list}")
    
    # Run the recursive summation
    result = sum_list(test_list)
    print(f"Recursive Sum: {result}")
