# 1. Define the Node class
class Node:
    def __init__(self, value):
        self.value = value  # Stores the actual data
        self.next = None    # Stores the reference/pointer to the next node

# 2. Define the LinkedList class
class LinkedList:
    def __init__(self):
        self.head = None    # Points to the first node in the list (initially empty)

    # Method to add a new node to the end of the list
    def append(self, value):
        new_node = Node(value)
        
        # Scenario A: If the list is completely empty, make the new node the head
        if self.head is None:
            self.head = new_node
            return
            
        # Scenario B: Traverse to the very last node
        current = self.head
        while current.next is not None:
            current = current.next
            
        # Link the final node's next pointer to our new node
        current.next = new_node

    # Method to print all elements in the list sequentially
    def print_list(self):
        current = self.head
        
        # Traverse through each node until reaching the end (None)
        while current is not None:
            print(current.value, end=" -> ")
            current = current.next
            
        print("None")  # Marks the end of the chain

# ==========================================
# Demonstration
# ==========================================
print("--- Linked List Demonstration ---")
my_linked_list = LinkedList()

# Append items
my_linked_list.append("Almaz")
my_linked_list.append("Bekele")
my_linked_list.append("Chala")

# Display the final list structure
my_linked_list.print_list()
