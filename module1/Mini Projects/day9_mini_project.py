import sys
import heapq

# ==========================================
# 1. TREE COMPONENTS (Hierarchy)
# ==========================================
class BankTreeNode:
    def __init__(self, name, role=""):
        self.name = name
        self.role = role
        self.children = []

    def add_child(self, child_node):
        self.children.append(child_node)

def print_tree_recursive(node, level=0):
    indent = "    " * level
    if node.role:
        print(f"{indent}- {node.name} ({node.role})")
    else:
        print(f"{indent}- {node.name}")
    for child in node.children:
        print_tree_recursive(child, level + 1)


# ==========================================
# 2. GRAPH COMPONENTS (Transfer Network)
# ==========================================
class TransferNetworkGraph:
    def __init__(self):
        self.adj_list = {}

    def add_account(self, acc_num):
        if acc_num not in self.adj_list:
            self.adj_list[acc_num] = []

    def add_transfer_link(self, acc1, acc2):
        self.add_account(acc1)
        self.add_account(acc2)
        if acc2 not in self.adj_list[acc1]:
            self.adj_list[acc1].append(acc2)
        if acc1 not in self.adj_list[acc2]:
            self.adj_list[acc2].append(acc1)

    def bfs_traversal(self, start_acc):
        """
        Traverses connected customers using Breadth-First Search (BFS).
        Time Complexity: O(V + E) where V = Vertices (accounts), E = Edges (links).
        """
        if start_acc not in self.adj_list:
            return []
        visited = set([start_acc])
        queue = [start_acc]
        result = []
        
        while queue:
            current = queue.pop(0)
            result.append(current)
            for neighbor in self.adj_list[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return result


# ==========================================
# 3. BINARY SEARCH TREE (Fast Search Database)
# ==========================================
class BSTNode:
    def __init__(self, acc_num, holder_name):
        self.acc_num = acc_num
        self.holder_name = holder_name
        self.left = None
        self.right = None

class CustomerBST:
    def __init__(self):
        self.root = None

    def insert(self, acc_num, holder_name):
        """Time Complexity: O(log n) average, O(n) worst case."""
        new_node = BSTNode(acc_num, holder_name)
        if self.root is None:
            self.root = new_node
            return
        
        current = self.root
        while True:
            if acc_num < current.acc_num:
                if current.left is None:
                    current.left = new_node
                    break
                current = current.left
            elif acc_num > current.acc_num:
                if current.right is None:
                    current.right = new_node
                    break
                current = current.right
            else:
                break # Account already exists

    def search(self, acc_num):
        """Time Complexity: O(log n) average, O(n) worst case."""
        current = self.root
        while current:
            if acc_num == current.acc_num:
                return current.holder_name
            elif acc_num < current.acc_num:
                current = current.left
            else:
                current = current.right
        return None


# ==========================================
# SYSTEM SETUP & INITIAL VALUES
# ==========================================

# Initialize Tree Hierarchy
bank_hierarchy_root = BankTreeNode("Head Office")
bole_branch = BankTreeNode("Bole Branch")
piassa_branch = BankTreeNode("Piassa Branch")
bank_hierarchy_root.add_child(bole_branch)
bank_hierarchy_root.add_child(piassa_branch)
bole_branch.add_child(BankTreeNode("Teller", "Customer Service"))

# Initialize Graph Network
transfer_network = TransferNetworkGraph()
transfer_network.add_transfer_link("1001", "1002")
transfer_network.add_transfer_link("1002", "1003")

# Initialize Priority Queue Heap
# Python's heapq is a min-heap. To create a priority system where priority 1 
# is handled first, we can push items directly as (priority_integer, description)
transaction_heap = []
heapq.heappush(transaction_heap, (2, "Standard Wire Transfer - 45,000 ETB"))
heapq.heappush(transaction_heap, (1, "CRITICAL: Corporate Liquidity Adjustment"))

# Initialize Search Database BST
customer_database = CustomerBST()
customer_database.insert("1001", "Almaz Ayana")
customer_database.insert("1002", "Bekele Gerba")
customer_database.insert("1003", "Chala Shiferaw")


# ==========================================
# INTERFACE IMPLEMENTATION
# ==========================================

def menu_add_tree():
    """Time Complexity: O(1) direct insertion once location node is chosen."""
    print("\n--- Add New Branch / Employee (Tree) ---")
    print("1. Add under Head Office")
    print("2. Add under Bole Branch")
    sub_choice = input("Select target parent node (1-2): ").strip()
    name = input("Enter name of new entry: ").strip()
    role = input("Enter role designation (leave blank if branch node): ").strip()
    
    new_node = BankTreeNode(name, role)
    if sub_choice == "1":
        bank_hierarchy_root.add_child(new_node)
        print(f"Success: Added '{name}' under Head Office.")
    elif sub_choice == "2":
        bole_branch.add_child(new_node)
        print(f"Success: Added '{name}' under Bole Branch.")
    else:
        print("Invalid allocation target selected.")

def menu_add_graph():
    """Time Complexity: O(1) list appending."""
    print("\n--- Add Money Transfer Connection (Graph) ---")
    acc1 = input("Enter sender account number: ").strip()
    acc2 = input("Enter receiver account number: ").strip()
    transfer_network.add_transfer_link(acc1, acc2)
    print(f"Success: Linked account {acc1} and account {acc2} in network database.")

def menu_show_graph():
    """Time Complexity: O(V + E) network scan mapping."""
    print("\n--- Show Connected Customers using BFS ---")
    start = input("Enter starting account number for trace lookup: ").strip()
    connected = transfer_network.bfs_traversal(start)
    if connected:
        print(f"Accessible account network path from {start}:")
        print(" -> ".join(connected))
    else:
        print("Account sequence not found or has no network connections.")

def menu_add_heap():
    """Time Complexity: O(log n) structural bubble-up operation."""
    print("\n--- Add Urgent Transaction (Heap) ---")
    try:
        priority = int(input("Enter urgency level priority (1=Highest, 5=Lowest): ").strip())
    except ValueError:
        print("Error: Priority validation score must be integer base numerals.")
        return
    details = input("Enter transaction processing details (e.g. amount, customer): ").strip()
    heapq.heappush(transaction_heap, (priority, details))
    print(f"Success: Logged urgent transaction onto high-priority processing queue.")

def menu_process_heap():
    """Time Complexity: O(log n) restructuring extraction sift-down operational loop."""
    print("\n--- Process Highest Priority Transaction ---")
    if not transaction_heap:
        print("System notice: Transaction priority queue is entirely empty.")
        return
    priority, details = heapq.heappop(transaction_heap)
    print("Dispatch processing target pipeline active:")
    print(f"Priority Level: {priority}")
    print(f"Task Details  : {details}")

def menu_search_bst():
    """Time Complexity: O(log n) tree traversal split paths."""
    print("\n--- Search for Customer Account in BST ---")
    acc = input("Enter account number to locate: ").strip()
    name = customer_database.search(acc)
    if name:
        print(f"Match Discovered! Account: {acc} | Registered Holder: {name}")
    else:
        print("Zero record entries found matching that account inside data index structures.")


def main():
    while True:
        print("\n==============================================")
        print("  ADDIS BANK NETWORK & PRIORITY SYSTEM CENTRAL ")
        print("==============================================")
        print("1. Add New Branch / Employee (Tree Hierarchy)")
        print("2. Add Money Transfer Connection (Network Graph)")
        print("3. Show Connected Customers Path (BFS Mapping)")
        print("4. Add Urgent Transaction (Priority Heap Queue)")
        print("5. Process Highest Priority Transaction (Heap Extraction)")
        print("6. Search for Customer Account (Binary Search Tree)")
        print("7. View Operational Hierarchy Map (Debug View)")
        print("8. Shutdown Application Terminal")
        
        choice = input("Select operation interface code (1-8): ").strip()
        
        if choice == "1": menu_add_tree()
        elif choice == "2": menu_add_graph()
        elif choice == "3": menu_show_graph()
        elif choice == "4": menu_add_heap()
        elif choice == "5": menu_process_heap()
        elif choice == "6": menu_search_bst()
        elif choice == "7":
            print("\n--- Present Corporate Hierarchy State ---")
            print_tree_recursive(bank_hierarchy_root)
        elif choice == "8":
            print("\nShutting down Addis Bank Central Terminal modules. Secure session closed.")
            sys.exit()
        else:
            print("System Error: Unrecognized interaction context parameters.")

if __name__ == "__main__":
    main()
