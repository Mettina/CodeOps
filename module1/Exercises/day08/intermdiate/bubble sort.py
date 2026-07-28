# Time Complexity: O(n^2) - Contains nested loops iterating through the array.
# Space Complexity: O(1) - Modifies the array directly in place.
def bubble_sort(arr: list) -> list:
    n = len(arr)
    
    # Outer loop tracking each full sorting pass
    for i in range(n):
        swapped = False
        
        # Inner loop compares adjacent elements up to the unsorted section
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements if they are in the wrong order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                
        # Visual Anchor: Print the state of the array after this pass completes
        print(f"Pass {i + 1}: {arr}")
        
        # Optimization: If no elements were swapped, array is already sorted
        if not swapped:
            print("Early exit triggered: array is fully sorted.")
            break
            
    return arr



if __name__ == "__main__":
    unsorted_items = [64, 34, 25, 12, 22, 11, 90]
    
    print(f"Original Array: {unsorted_items}\n")
    print("--- Starting Passes ---")
    
    sorted_result = bubble_sort(unsorted_items)
    
    print("\n--- Final Sorted Result ---")
    print(f"Sorted Array  : {sorted_result}")

