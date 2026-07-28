# --- 1. Recursive Version ---
# Time Complexity: O(n) - Function calls itself n times
# Space Complexity: O(n) - Due to the call stack frames matching n
def factorial_recursive(n: int) -> int:
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers.")
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)


# --- 2. Iterative Version ---
# Time Complexity: O(n) - Loops exactly n times
# Space Complexity: O(1) - Uses a single tracking variable
def factorial_iterative(n: int) -> int:
    if n < 0:
        raise ValueError("Factorial is not defined for negative numbers.")
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result



if __name__ == "__main__":
    test_number = 5
    
    print(f"Calculating factorial for: {test_number}")
    
    # Run Recursive
    recursive_result = factorial_recursive(test_number)
    print(f"Recursive Output : {recursive_result}")
    
    # Run Iterative
    iterative_result = factorial_iterative(test_number)
    print(f"Iterative Output : {iterative_result}")
