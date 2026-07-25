class Queue:
    # A class that mimics a First-In, First-Out (FIFO) queue.
    def __init__(self):
        self.queue = []  # Internal list to store customers

    def enqueue(self, customer):
        # Adds a customer to the end of the line.
        self.queue.append(customer)
        print(f"-> {customer} arrived and joined the queue.")

    def dequeue(self):
        # Removes and returns the customer at the front of the line.
        if self.is_empty():
            print("The queue is empty! No one to serve.")
            return None
        # Removing index 0 shifts all remaining elements forward
        customer = self.queue.pop(0)
        print(f"<- {customer} is now being served.")
        return customer

    def is_empty(self):
        # Checks if the queue has no customers left.
        return len(self.queue) == 0

    def size(self):
        # Returns the current number of people in line.
        return len(self.queue)


# Bank Simulation
if __name__ == "__main__":
    bank_line = Queue()
    print("--- Bank Opens ---")

    # Customers arrive
    bank_line.enqueue("Abebe")
    bank_line.enqueue("Chala")
    bank_line.enqueue("Aster")
    print(f"Current line size: {bank_line.size()}\n")

    # Teller serves customers in order
    bank_line.dequeue()
    bank_line.dequeue()
    print(f"Current line size: {bank_line.size()}\n")

    # Another customer arrives
    bank_line.enqueue("Kebede")
    print(f"Current line size: {bank_line.size()}\n")

    # Serving remaining customers
    bank_line.dequeue()
    bank_line.dequeue()
    bank_line.dequeue()  # Attempting to serve when empty
