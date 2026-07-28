# ==========================================
# 1. TREE NODE CLASS DEFINITION
# ==========================================
class TreeNode:
    def __init__(self, name, role=""):
        self.name = name          # Stores node identity text
        self.role = role          # Stores optional professional role title
        self.children = []        # Dynamic list storing internal child nodes

    def add_child(self, child_node):
        """Appends an independent child node object onto this node's reference tracker."""
        self.children.append(child_node)


# ==========================================
# 2. RECURSIVE HIERARCHAL PRINTING FUNCTION
# ==========================================
def print_bank_tree(node, level=0):
    """
    Traverses the organizational structure from top to bottom.
    Applies custom indentation to visually map parent-child connections.
    """
    # Generates 4 spaces per level of depth inside the structure
    indentation = "    " * level
    
    # Conditional text string output formatting
    if node.role:
        print(f"{indentation}- {node.name} ({node.role})")
    else:
        print(f"{indentation}- {node.name}")
        
    # Loops recursively through every child associated with the node
    for child in node.children:
        print_bank_tree(child, level + 1)


# ==========================================
# 3. CONSTRUCTING THE ADDIS BANK HIERARCHY
# ==========================================
if __name__ == "__main__":
    print("--- Addis Bank Hierarchy Mapping ---")
    print("-" * 36)

    # Instantiate the supreme root system hub node
    head_office = TreeNode("Head Office")

    # Instantiate regional branching divisions
    bole_branch = TreeNode("Bole Branch")
    piassa_branch = TreeNode("Piassa Branch")

    # Instantiate individual structural operation assets
    teller = TreeNode("Teller", role="Customer Service")
    loan_officer = TreeNode("Loan Officer", role="Credit Approval")

    # Build organizational structural pathways (Parent -> Children links)
    head_office.add_child(bole_branch)
    head_office.add_child(piassa_branch)

    bole_branch.add_child(teller)
    bole_branch.add_child(loan_officer)

    # Execute depth-first parsing visual mapping command
    print_bank_tree(head_office)
