#9.Tip Calculator (Full Program) 
def calculate_tip(bill, tip_percentage, payers):
    #Calculates the tip, total bill, and individual share
    tip_amount = bill * (tip_percentage / 100)
    total_amount = bill + tip_amount
    amount_per_person = total_amount / payers
    
    return tip_amount, total_amount, amount_per_person


def main():
    #Handles user input and prints the formatted results.
    print("Welcome to the Tip Calculator!")
    
    # Get user inputs
    bill = float(input("Enter the total bill amount: "))
    tip_percentage = int(input("Enter tip percentage (10, 15, or 20): "))
    payers = int(input("Enter the number of people splitting the bill: "))
    
    # Perform calculations using the function
    tip, total, individual_share = calculate_tip(bill, tip_percentage, payers)
    
    # Display results formatted to two decimal places
    print("\n--- Bill Details ---")
    print(f"Tip Amount: {tip:.2f}$")
    print(f"Total Amount: {total:.2f}$")
    print(f"Each Person Pays: {individual_share:.2f}ETB")


# 10.Run the program
if __name__ == "__main__":
    main()

#Simple Quiz Game 
def get_quiz_questions():
    #Returns a list of dictionaries containing questions, choices, and answers.
    return [
        {
            "question": "What is the capital city of Ethiopia?",
            "choices": ["A) Gondar", "B) Addis Ababa", "C) Lalibela", "D) Awasa"],
            "answer": "B"
        },

        {
            "question": "Which coffee species originated in Ethiopia?",
            "choices": ["A) Arabica", "B) Robusta", "C) Liberica", "D) Excelsa"],
            "answer": "A"
        },

        {
            "question": "Ethiopia is located in which region of Africa?",
            "choices": ["A) North Africa", "B) West Africa", "C) Horn of Africa", "D) South Africa"],
            "answer": "C"
        },

        {
            "question": "What is the currency of Ethiopia?",
            "choices": ["A) Dollar", "B) Shilling", "C) Birr", "D) Franc"],
            "answer": "C"
        },

        {
            "question": "Which historical Ethiopian site is famous for its rock-hewn churches?",
            "choices": ["A) Aksum", "B) Lalibela", "C) Harar", "D) Tiya"],
            "answer": "B"
        }
    ]


def display_results(score, total_questions):
    #Prints the final score and a performance message based on the score.
    print("\n--- Quiz Finished! ---")
    print(f"Your final score: {score} out of {total_questions}")
    
    # Performance messaging logic
    if score == total_questions:
        print("Perfect score! You are an expert on Ethiopia! ")
    elif score >= 3:
        print("Great job! You know your facts well.")
    else:
        print("Good effort! Try again to see if you can improve your score.")


def run_quiz():
    #Main function to run the quiz game.
    print("Welcome to the Ethiopia Simple Quiz!\n")
    questions = get_quiz_questions()
    score = 0
    
    # Loop through each question
    for i, q in enumerate(questions, 1):
        print(f"Question {i}: {q['question']}")
        for choice in q["choices"]:
            print(choice)
            
        # Get user answer and convert to uppercase
        user_answer = input("Please Enter your answer (A, B, C, or D): ")
        
        # Check if the answer is correct
        if user_answer == q["answer"]:
            print("You are correct!\n")
            score += 1
        else:
            print(f"Wrong. The correct answer was {q['answer']}.\n")
            
    # Display the final results
    display_results(score, len(questions))


# Start the game(Calling the function)
if __name__ == "__main__":
    run_quiz()

#11.Function with Default & Return

def calculate_final_price(price, tax_rate=0.15, discount=0):
    #Calculates the final price after applying a discount and adding tax.
    
    # Apply the discount amount
    discounted_price = price - discount
    
    # Calculate tax based on the discounted price
    tax_amount = discounted_price * tax_rate
    
    # Calculate final total
    final_price = discounted_price + tax_amount
    
    return final_price


def run_tests():
    #Tests the calculate_final_price function with various argument scenarios.
    print("--- Testing calculate_final_price ---")
    
    # Test 1: Using only the required price (uses default 15% tax and 0 discount)
    # Calculation: 100 - 0 = 100 -> 100 + (100 * 0.15) = 115.00
    test1 = calculate_final_price(100)
    print(f"Test 1 (Only Price $100)      -> Final Price: ${test1:.2f}")
    
    # Test 2: Overriding the tax rate, no discount (uses 5% tax)
    # Calculation: 200 - 0 = 200 -> 200 + (200 * 0.05) = 210.00
    test2 = calculate_final_price(200, tax_rate=0.05)
    print(f"Test 2 (Price $200, 5% Tax)   -> Final Price: ${test2:.2f}")
    
    # Test 3: Overriding both tax rate (10%) and discount ($20)
    # Calculation: 150 - 20 = 130 -> 130 + (130 * 0.10) = 143.00
    test3 = calculate_final_price(150, tax_rate=0.10, discount=20)
    print(f"Test 3 (All arguments given)  -> Final Price: ${test3:.2f}")
    
    # Test 4: Using default tax rate (15%) but providing a discount ($15)
    # Calculation: 80 - 15 = 65 -> 65 + (65 * 0.15) = 74.75
    test4 = calculate_final_price(80, discount=15)
    print(f"Test 4 (Price $80, $15 Disc)  -> Final Price: ${test4:.2f}")


# Execute the tests
if __name__ == "__main__":
    run_tests()
