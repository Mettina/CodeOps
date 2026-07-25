class Node:
    # Represents a single element in the linked list.
    def __init__(self, value):
        self.value = value  # Stores the actual data
        self.next = None    # Pointer to the next node (initially None)


class LinkedList:
    # Manages the chain of connected nodes.
    def __init__(self):
        self.head = None    # The starting point of the list

    def append(self, value):
        # Adds a new node containing 'value' to the very end of the list.
        new_node = Node(value)
        
        # Case 1: If the list is empty, make the new node the head
        if not self.head:
            self.head = new_node
            return
        
        # Case 2: Traverse to the last node
        current = self.head
        while current.next:
            current = current.next
            
        # Link the last node to the new node
        current.next = new_node

    def print_list(self):
        # Traverses and prints all values in the list sequentially.
        current = self.head
        
        # Move through the list until reaching None
        while current:
            print(current.value, end=" -> ")
            current = current.next
            
        print("None")  # Indicates the end of the list
