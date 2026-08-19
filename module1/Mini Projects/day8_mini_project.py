import sys

# ==========================================
# DATA STRUCTURING & DATA SETUP
# ==========================================

# Base mock transaction data
# Each transaction is represented as a dictionary: (amount, date, type)
# Date layout is YYYY-MM-DD for straightforward lexical comparison
transactions = [
    {"amount": 1500.0, "date": "2026-03-01", "type": "Deposit"},
    {"amount": 4200.0, "date": "2026-03-05", "type": "Deposit"},
    {"amount": -300.0,  "date": "2026-02-15", "type": "Withdrawal"},
    {"amount": 850.0,  "date": "2026-03-02", "type": "Deposit"},
    {"amount": -1200.0, "date": "2026-01-20", "type": "Withdrawal"}
]

# Track sorting status to validate binary search usage safely
is_sorted_by_amount = False


# ==========================================
# RECURSIVE OPERATIONS
# ==========================================

def calculate_balance_recursive(tx_list, index=0):
    """
    Computes total balance by recursively summing transaction amounts.
    Time Complexity: O(n)
    Space Complexity: O(n) due to the call stack depth.
    """
    # Base case: reached the end of the list
    if index == len(tx_list):
        return 0.0
    
    # Recursive case: current item value + sum of remaining items
    return tx_list[index]["amount"] + calculate_balance_recursive(tx_list, index + 1)


def generate_threshold_report_recursive(tx_list, threshold, index=0, report=None):
    """
    Bonus: Recursively finds all transactions above a threshold amount.
    Time Complexity: O(n)
    """
    if report is None:
        report = []
        
    # Base case
    if index == len(tx_list):
        return report
        
    # Check if absolute transaction amount meets or exceeds threshold
    if abs(tx_list[index]["amount"]) >= threshold:
        report.append(tx_list[index])
        
    # Recursive call for next index
    return generate_threshold_report_recursive(tx_list, threshold, index + 1, report)


# ==========================================
# SORTING ALGORITHM (QUICKSORT)
# ==========================================

def quicksort(tx_list, key_name):
    """
    Sorts transactions using the Quicksort algorithm.
    Time Complexity: O(n log n) average, O(n^2) worst case.
    Space Complexity: O(n) recursive stack allocation.
    """
    if len(tx_list) <= 1:
        return tx_list
    
    # Selecting the middle item as pivot
    pivot = tx_list[len(tx_list) // 2]
    
    # Partition lists based on the selected target key
    left = [x for x in tx_list if x[key_name] < pivot[key_name]]
    middle = [x for x in tx_list if x[key_name] == pivot[key_name]]
    right = [x for x in tx_list if x[key_name] > pivot[key_name]]
    
    return quicksort(left, key_name) + middle + quicksort(right, key_name)


# ==========================================
# SEARCHING ALGORITHMS
# ==========================================

def linear_search(tx_list, target_amount):
    """
    Scans sequential memory locations for an exact amount.
    Time Complexity: O(n)
    """
    results = []
    for tx in tx_list:
        if tx["amount"] == target_amount:
            results.append(tx)
    return results


def binary_search(tx_list, target_amount):
    """
    Divide-and-conquer strategy on pre-sorted data.
    Time Complexity: O(log n)
    """
    low = 0
    high = len(tx_list) - 1
    
    while low <= high:
        mid = (low + high) // 2
        mid_amount = tx_list[mid]["amount"]
        
        if mid_amount == target_amount:
            # Found an matching amount; collect any identical amounts nearby
            results = [tx_list[mid]]
            # Scan left
            left = mid - 1
            while left >= 0 and tx_list[left]["amount"] == target_amount:
                results.append(tx_list[left])
                left -= 1
            # Scan right
            right = mid + 1
            while right < len(tx_list) and tx_list[right]["amount"] == target_amount:
                results.append(tx_list[right])
                right += 1
            return results
            
        elif mid_amount < target_amount:
            low = mid + 1
        else:
            high = mid - 1
            
    return []


# ==========================================
# INTERFACE IMPLEMENTATION
# ==========================================

def print_transactions(tx_list):
    print(f"{'Date':<12} | {'Type':<12} | {'Amount (ETB)':<15}")
    print("-" * 45)
    for tx in tx_list:
        print(f"{tx['date']:<12} | {tx['type']:<12} | {tx['amount']:<15.2f}")


def main():
    global transactions, is_sorted_by_amount
    
    while True:
        print("\n==================================")
        print("  ADDIS BANK TRANSACTION ANALYZER  ")
        print("==================================")
        print("1. View All Transactions")
        print("2. Calculate Total Balance (Recursive)")
        print("3. Sort Transactions by Amount")
        print("4. Sort Transactions by Date")
        print("5. Search Transaction by Amount")
        print("6. Generate High-Value Report (Recursive Bonus)")
        print("7. Exit")
        
        choice = input("Select an option (1-7): ").strip()
        
        if choice == "1":
            print("\nCurrent Transaction Log:")
            print_transactions(transactions)
            
        elif choice == "2":
            balance = calculate_balance_recursive(transactions)
            print(f"\nTotal Calculated Balance: {balance:.2f} ETB")
            
        elif choice == "3":
            transactions = quicksort(transactions, "amount")
            is_sorted_by_amount = True
            print("\nTransactions successfully sorted by Amount (Ascending).")
            print_transactions(transactions)
            
        elif choice == "4":
            transactions = quicksort(transactions, "date")
            is_sorted_by_amount = False  # Breaking the sequence needed for amount binary search
            print("\nTransactions successfully sorted by Date (Oldest to Newest).")
            print_transactions(transactions)
            
        elif choice == "5":
            try:
                search_val = float(input("\nEnter the exact transaction amount to search: ").strip())
            except ValueError:
                print("Error: Invalid number format entered.")
                continue
                
            if is_sorted_by_amount:
                print("Notice: Running Binary Search (O(log n)) because data is sorted by amount.")
                found = binary_search(transactions, search_val)
            else:
                print("Notice: Running Linear Search (O(n)) because data is unsorted by amount.")
                found = linear_search(transactions, search_val)
                
            if found:
                print(f"\nFound {len(found)} matching record(s):")
                print_transactions(found)
            else:
                print("No transactions matched that exact amount.")
                
        elif choice == "6":
            try:
                threshold = float(input("\nEnter minimum absolute threshold amount (ETB): ").strip())
            except ValueError:
                print("Error: Invalid number format entered.")
                continue
                
            report = generate_threshold_report_recursive(transactions, threshold)
            if report:
                print(f"\nHigh-Value Report (Transactions >= {threshold} ETB):")
                print_transactions(report)
            else:
                print("No transactions found above or equal to that threshold.")
                
        elif choice == "7":
            print("\nExiting Transaction Analyzer. Goodbye!")
            sys.exit()
        else:
            print("Error: Invalid input choice.")

if __name__ == "__main__":
    main()
