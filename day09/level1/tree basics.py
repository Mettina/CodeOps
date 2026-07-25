class TreeNode:
    def __init__(self, position_name: str, employee_name: str = "Vacant"):
        self.position_name = position_name
        self.employee_name = employee_name
        self.children = []  # Holds child sub-branches or positions

    def add_child(self, child_node: "TreeNode") -> None:
        self.children.append(child_node)


def print_bank_hierarchy(node: TreeNode, depth: int = 0) -> None:
    # Set up visual structural alignment markers
    indentation = "    " * depth
    prefix = "└── " if depth > 0 else ""
    
    # Print the current node structural details
    print(f"{indentation}{prefix}{node.position_name} ({node.employee_name})")
    
    # Recursively traverse down through children branches
    for child in node.children:
        print_bank_hierarchy(child, depth + 1)



# EXECUTABLE DEMONSTRATION

if __name__ == "__main__":
    # Create the root node
    head_office = TreeNode("Head Office", "Abebe Kebede")

    # Create the branches
    bole_branch = TreeNode("Bole Branch", "Aster Assefa")
    piassa_branch = TreeNode("Piassa Branch", "Dawit Tadesse")

    # Create employees under the Bole Branch
    teller = TreeNode("Teller", "Marta Alemayehu")
    loan_officer = TreeNode("Loan Officer", "Yonas Berhanu")

    # Assemble the tree hierarchy
    head_office.add_child(bole_branch)
    head_office.add_child(piassa_branch)
    
    bole_branch.add_child(teller)
    bole_branch.add_child(loan_officer)

    # Output the hierarchy model layout
    print("--- Commercial Bank Organizational Hierarchy ---")
    print_bank_hierarchy(head_office)
