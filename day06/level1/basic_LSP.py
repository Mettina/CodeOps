#  Liskov Substitution Principle (LSP) Correction

# Base Bird class representing common characteristics for ALL birds
class Bird:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating.")


#  Subclass specifically for birds that are physically able to fly
class FlyingBird(Bird):
    def fly(self):
        print(f"{self.name} is soaring high through the air!")


#  Sparrow inherits from FlyingBird because it can fly
class Sparrow(FlyingBird):
    pass


#  Penguin inherits from the base Bird because it eats, but cannot fly
class Penguin(Bird):
    def swim(self):
        print(f"{self.name} is swimming fast in cold water.")


# This function follows LSP because it specifies it only accepts flying birds
def make_bird_fly(flying_bird_object):
    flying_bird_object.fly()


# --- Execution Test ---
if __name__ == "__main__":
    print("--- Testing LSP Compliant Design ---")
    
    # Instantiate our bird objects
    bird1 = Sparrow("Sparrow")
    bird2 = Penguin("Penguin")

    # Both birds can perform basic base actions safely
    bird1.eat()
    bird2.eat()
    
    print("\n--- Testing Flight Behavior ---")
    # This works cleanly and safely because Sparrow belongs to FlyingBird
    make_bird_fly(bird1)
    
    # We no longer pass bird2 (Penguin) into make_bird_fly. 
    # Instead, we handle its unique native behavior cleanly:
    bird2.swim()
