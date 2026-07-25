class CustomerGraph:
    def __init__(self):
        # Using an adjacency list (dictionary of sets) to store connections
        self.graph = {}

    def add_customer(self, name: str) -> None:
        if name not in self.graph:
            self.graph[name] = set()

    def add_transfer(self, sender: str, receiver: str) -> None:
        # Ensure both customers exist in our network graph
        self.add_customer(sender)
        self.add_customer(receiver)
        
        # Add a directed edge indicating money transfers from sender to receiver
        self.graph[sender].add(receiver)

    def print_network(self) -> None:
        for customer, recipients in self.graph.items():
            if recipients:
                # Convert the recipient set to a clean, comma-separated string
                transfer_list = ", ".join(recipients)
                print(f"Customer {customer} sent money to -> [{transfer_list}]")
            else:
                print(f"Customer {customer} has not sent money to anyone.")



# EXECUTABLE DEMONSTRATION

if __name__ == "__main__":
    banking_network = CustomerGraph()
    
    # Initialize the specific local client nodes
    customers = ["Almaz", "Dawit", "Tigist", "Hanna"]
    for person in customers:
        banking_network.add_customer(person)
        
    # Simulate various peer-to-peer transfer pathways
    banking_network.add_transfer("Almaz", "Dawit")
    banking_network.add_transfer("Almaz", "Tigist")
    banking_network.add_transfer("Dawit", "Hanna")
    banking_network.add_transfer("Tigist", "Almaz")
    banking_network.add_transfer("Hanna", "Tigist")

    print("--- Peer-to-Peer Transfer Network Layout ---")
    banking_network.print_network()
