from collections import deque

class RealWorldSystemManager:
    def __init__(self):
        # 1. Instagram Username Check (Hash Set)
        self.taken_usernames = set()
        
        # 2. Amazon Customer Support (FIFO Queue)
        self.support_queue = deque()
        
        # 3. Microsoft Word Undo Feature (LIFO Stack)
        self.undo_stack = []
        
        # 4. MIT Student Lookup Database (Hash Map / Dictionary)
        self.student_records = {}

    # --- 1. INSTAGRAM USERNAME METHODS ---
    def register_username(self, username: str) -> str:
        if username in self.taken_usernames:
            return f"Error: '{username}' is already taken."
        self.taken_usernames.add(username)
        return f"Success: '{username}' registered successfully."

    # --- 2. AMAZON SUPPORT TICKET METHODS ---
    def add_support_ticket(self, ticket_id: str) -> None:
        self.support_queue.append(ticket_id)
        print(f"Ticket '{ticket_id}' added to the queue.")

    def process_support_ticket(self) -> str:
        if self.support_queue:
            return f"Processing ticket: {self.support_queue.popleft()}"
        return "No tickets left in the queue."

    # --- 3. MICROSOFT WORD UNDO METHODS ---
    def perform_action(self, action: str) -> None:
        self.undo_stack.append(action)
        print(f"Action performed: '{action}'")

    def trigger_undo(self) -> str:
        if self.undo_stack:
            return f"Undo successful! Reverted: '{self.undo_stack.pop()}'"
        return "Nothing to undo."

    # --- 4. MIT STUDENT LOOKUP METHODS ---
    def add_student(self, student_id: int, name: str, major: str) -> None:
        self.student_records[student_id] = {"name": name, "major": major}
        print(f"Student ID {student_id} added.")

    def lookup_student(self, student_id: int) -> str:
        student = self.student_records.get(student_id)
        if student:
            return f"Found: ID {student_id} -> Name: {student['name']}, Major: {student['major']}"
        return f"Student with ID {student_id} not found."


# Run the script with real scenarios
if __name__ == "__main__":
    manager = RealWorldSystemManager()

    print("--- 1. Instagram Username Check ---")
    print(manager.register_username("travel_guru"))
    print(manager.register_username("travel_guru")) # Testing duplicate check
    
    print("\n--- 2. Amazon Support Ticket Queue ---")
    manager.add_support_ticket("Order #5541-Delayed")
    manager.add_support_ticket("Order #1102-Damaged Item")
    print(manager.process_support_ticket()) # Processes first item to arrive
    print(manager.process_support_ticket()) # Processes next item

    print("\n--- 3. Microsoft Word Undo Feature ---")
    manager.perform_action("Typed: Hello World")
    manager.perform_action("Changed Font to Arial")
    print(manager.trigger_undo()) # Reverts most recent change first
    print(manager.trigger_undo()) # Reverts previous change

    print("\n--- 4. University Database Lookup ---")
    manager.add_student(884392, "Emily Watson", "Data Science")
    print(manager.lookup_student(884392)) # Fast lookup
    print(manager.lookup_student(123456)) # Missing record test
