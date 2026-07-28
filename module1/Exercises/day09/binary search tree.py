class BSTNode:
    def __init__(self, key: int):
        self.key = key
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, key: int) -> None:
        if not self.root:
            self.root = BSTNode(key)
        else:
            self._insert_recursive(self.root, key)

    def _insert_recursive(self, node: BSTNode, key: int) -> None:
        if key < node.key:
            if not node.left:
                node.left = BSTNode(key)
            else:
                self._insert_recursive(node.left, key)
        else:
            if not node.right:
                node.right = BSTNode(key)
            else:
                self._insert_recursive(node.right, key)

    def search(self, key: int) -> bool:
        return self._search_recursive(self.root, key)

    def _search_recursive(self, node: BSTNode, key: int) -> bool:
        # Base Cases: root is null or key is present at root
        if not node:
            return False
        if node.key == key:
            return True
        
        # Key is smaller than root's key
        if key < node.key:
            return self._search_recursive(node.left, key)
        
        # Key is greater than root's key
        return self._search_recursive(node.right, key)



# EXECUTABLE DEMONSTRATION

if __name__ == "__main__":
    bst = BinarySearchTree()
    values_to_insert = [50, 30, 70, 20, 40, 60]
    
    print(f"Inserting values into BST: {values_to_insert}\n")
    for value in values_to_insert:
        bst.insert(value)
        
    # Test searches
    targets = [40, 100]
    print("--- Search Results ---")
    for target in targets:
        exists = bst.search(target)
        status = "Exists" if exists else "Does Not Exist"
        print(f"Searching for {target}: {status}")
