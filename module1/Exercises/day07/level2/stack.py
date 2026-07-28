class Stack:
    # A class that mimics a Last-In, First-Out (LIFO) stack.
    def __init__(self):
        self.stack = []  # Internal list to store elements

    def push(self, item):
        # Adds an item to the top of the stack.
        self.stack.append(item)

    def pop(self):
        # Removes and returns the top item. Returns None if empty.
        if self.is_empty():
            return None
        return self.stack.pop()

    def peek(self):
        # Returns the top item without removing it. Returns None if empty.
        if self.is_empty():
            return None
        return self.stack[-1]

    def is_empty(self):
        # Checks if the stack has no elements.
        return len(self.stack) == 0


def reverse_string(input_string):
    # Reverses a given string using a Stack instance.
    s = Stack()
    
    # Step 1: Push all characters onto the stack
    for char in input_string:
        s.push(char)
        
    # Step 2: Pop characters out until the stack is empty
    reversed_str = ""
    while not s.is_empty():
        reversed_str += s.pop()
        
    return reversed_str


# Test the implementation
if __name__ == "__main__":
    original = "Addis Ababa"
    result = reverse_string(original)
    
    print(f"Original: '{original}'")
    print(f"Reversed: '{result}'")
