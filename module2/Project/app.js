// --- 1. State: Variables to keep track of our money ---
// Get values from localStorage on page load, default to 0 if not found
let totalIncome = parseFloat(localStorage.getItem('income')) || 0;
let totalExpense = parseFloat(localStorage.getItem('expense')) || 0;
let balance = parseFloat(localStorage.getItem('balance')) || 0;

// --- 2. Select HTML Elements ---
const transactionForm = document.getElementById('transactionForm');
const typeInput = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const transactionList = document.getElementById('transactionList');

// New: Select the display elements we just added IDs to!
const incomeDisplay = document.getElementById('incomeDisplay');
const expenseDisplay = document.getElementById('expenseDisplay');
const balanceDisplay = document.getElementById('balanceDisplay');

// --- 3. Handle Form Submission ---
transactionForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page refresh

    const type = typeInput.value;
    const amount = parseFloat(amountInput.value); 
    const date= dateInput.value;
    const descriptionText = descriptionInput.value;

    // --- 4. The Logic (Math!) ---
    if (type === 'income') {
        totalIncome = totalIncome + amount; // Add to income
    } else if (type === 'expense') {
        totalExpense = totalExpense + amount; // Add to expense
    }

    // Calculate new balance
    balance = totalIncome - totalExpense;

    // save to local storage
    localStorage.setItem('income', totalIncome);
    localStorage.setItem('expense', totalExpense);
    localStorage.setItem('balance', balance);

    // --- 5. Update the HTML on the screen ---
    updateUI();
    recentTransaction(type, descriptionText, amount,date);

    // --- 6. Clear inputs ---
    descriptionInput.value = '';
    amountInput.value = '';
});

// --- Function to update the HTML on the screen ---
function updateUI() {
    // The .toFixed(2) forces the number to always show 2 decimal places (e.g., 50.00)
    incomeDisplay.textContent = "$" + totalIncome.toFixed(2);
    expenseDisplay.textContent = "$" + totalExpense.toFixed(2);
    balanceDisplay.textContent = "$" + balance.toFixed(2);
}

// Call updateUI once when the script loads to display saved values
updateUI();

function recentTransaction(type, description, amount, date){
    const transactionList = document.getElementById('transactionList');
    const transaction = document.createElement('li');
    transaction.innerHTML = `
        <div class="transaction-list-item">
            <div class="transaction-list-item-left">
                <h3>${type}</h3>
                <p>${description}</p>
            </div>
            <div class="transaction-list-item-right">
                <p>$${amount}</p>
            </div>
            <div class="transaction-list-item-right">
                <p>${date}</p>
            </div>
        </div>
    `;
    transactionList.appendChild(transaction);
}



    
