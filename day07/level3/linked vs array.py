from collections import deque
from typing import Dict, Any, Optional

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        if not self.head:
            self.head = Node(data)
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = Node(data)

    def to_list(self):
        result = []
        current = self.head
        while current:
            result.append(current.data)
            current = current.next
        return result

# --- 1. Python List (Array) Implementation ---
def remove_middle_array(arr: list) -> list:
    if not arr:
        return arr
    mid_index = len(arr) // 2
    arr.pop(mid_index)  # Shifts all elements after mid_index
    return arr

# --- 2. Linked List Implementation ---
def remove_middle_linked_list(ll: LinkedList) -> LinkedList:
    if not ll.head:
        return ll
    if not ll.head.next:
        ll.head = None
        return ll

    # Fast & Slow pointer approach to find the middle
    slow = ll.head
    fast = ll.head
    prev = None

    while fast and fast.next:
        fast = fast.next.next
        prev = slow
        slow = slow.next

    # Skip the middle node
    prev.next = slow.next
    return ll

# EXECUTABLE DEMONSTRATION

if __name__ == "__main__":
    # Test Array
    test_arr = [10, 20, 30, 40, 50]
    print("Original Array:", test_arr)
    print("After Removing Middle:", remove_middle_array(test_arr))

    print("-" * 40)

    # Test Linked List - Fixed the missing list values here
    test_ll = LinkedList()
    for val in [10, 20, 30, 40, 50]:
        test_ll.append(val)
    
    print("Original Linked List:", test_ll.to_list())
    remove_middle_linked_list(test_ll)
    print("After Removing Middle :", test_ll.to_list())
