import heapq

class TransactionPriorityQueue:
    def __init__(self):
        self.queue = []

    def add_transaction(self, base_priority: int, description: str) -> None:
        # Multiply priority by -1 to simulate a Max-Heap using Python's Min-Heap
        inverted_priority = -base_priority
        heapq.heappush(self.queue, (inverted_priority, base_priority, description))
        print(f"Added: Priority {base_priority} -> '{description}'")

    def pop_highest_priority(self) -> tuple:
        if not self.queue:
            return "The queue is completely empty."
        # Extract the elements from the popped heap tuple
        _, original_priority, description = heapq.heappop(self.queue)
        return original_priority, description



# EXECUTABLE DEMONSTRATION

if __name__ == "__main__":
    pq = TransactionPriorityQueue()
    
    print("--- 1. Enqueueing Transactions ---")
    pq.add_transaction(5000, "Big Loan")
    pq.add_transaction(200, "Small Deposit")
    pq.add_transaction(10000, "Fraud Alert")
    
    print("\n--- 2. Processing Highest Priority Item ---")
    priority, task = pq.pop_highest_priority()
    print(f"Popped item: Priority {priority} -> '{task}'")
    
    print("\n--- 3. Processing Remaining Items ---")
    while pq.queue:
        priority, task = pq.pop_highest_priority()
        print(f"Popped item: Priority {priority} -> '{task}'")
