# Both algorithms run in O(n^2) worst-case time complexity.
# Selection Sort minimizes swaps; Insertion Sort minimizes comparisons on partially sorted data.

def selection_sort(arr: list):
    working_arr = list(arr)
    n = len(working_arr)
    comparisons = 0
    swaps = 0
    
    for i in range(n):
        min_index = i
        for j in range(i + 1, n):
            comparisons += 1
            if working_arr[j] < working_arr[min_index]:
                min_index = j
                
        if min_index != i:
            working_arr[i], working_arr[min_index] = working_arr[min_index], working_arr[i]
            swaps += 1
            
    return working_arr, comparisons, swaps


def insertion_sort(arr: list):
    working_arr = list(arr)
    n = len(working_arr)
    comparisons = 0
    shifts = 0  # Insertion sort shifts items rather than swapping them completely
    
    for i in range(1, n):
        key = working_arr[i]
        j = i - 1
        
        while j >= 0:
            comparisons += 1
            if working_arr[j] > key:
                working_arr[j + 1] = working_arr[j]
                shifts += 1
                j -= 1
            else:
                break
        working_arr[j + 1] = key
        
    return working_arr, comparisons, shifts



# EXECUTABLE DEMONSTRATION

if __name__ == "__main__":
    dataset = [64, 25, 12, 22, 11]
    print(f"Original Input Array: {dataset}\n")
    
    # Run Selection Sort
    sel_arr, sel_comp, sel_swaps = selection_sort(dataset)
    print("--- Selection Sort Results ---")
    print(f"Sorted Array: {sel_arr}")
    print(f"Total Comparisons Made: {sel_comp}")
    print(f"Total Swaps Executed   : {sel_swaps}\n")
    
    # Run Insertion Sort
    ins_arr, ins_comp, ins_shifts = insertion_sort(dataset)
    print("--- Insertion Sort Results ---")
    print(f"Sorted Array: {ins_arr}")
    print(f"Total Comparisons Made: {ins_comp}")
    print(f"Total Shifts Executed  : {ins_shifts}")
