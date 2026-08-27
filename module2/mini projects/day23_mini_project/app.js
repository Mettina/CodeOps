// --- 1. State: Variables to keep track of our money ---
let totalIncome = parseFloat(localStorage.getItem('income')) || 0;
let totalExpense = parseFloat(localStorage.getItem('expense')) || 0;
let balance = parseFloat(localStorage.getItem('balance')) || 0;
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// --- 2. Select HTML Elements ---
const transactionModal = document.getElementById('transactionModal');
const transactionForm = document.getElementById('transactionForm');
const typeInput = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const transactionList = document.getElementById('transactionList');
const formNotification = document.getElementById('formNotification');
const closeFormBtn = document.getElementById('closeFormBtn');

const getStartedBtn = document.getElementById('getStartedBtn');
const heroGetStartedBtn = document.getElementById('heroGetStartedBtn');
const heroAddBtn = document.getElementById('heroAddBtn');

const incomeDisplay = document.getElementById('incomeDisplay');
const expenseDisplay = document.getElementById('expenseDisplay');
const balanceDisplay = document.getElementById('balanceDisplay');
const savingRateDisplay = document.getElementById('savingRateDisplay');

// Unified Currency Constant
const CURRENCY = 'ETB '; 

// --- 3. Functions to Show/Hide Modal Pop-up and Messages ---
function openTransactionForm() {
    if (transactionModal) {
        transactionModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 
        setTimeout(() => {
            if (typeInput) typeInput.focus();
        }, 150);
    }
}

function closeTransactionForm() {
    if (transactionModal) {
        transactionModal.style.display = 'none';
        document.body.style.overflow = ''; 
    }
}

let notificationTimeout;
function showMessage(text, type = 'success') {
    if (!formNotification) return;
    formNotification.textContent = text;
    formNotification.className = `notification-box notification-${type}`;
    formNotification.style.display = 'block';

    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
        formNotification.style.display = 'none';
    }, 4000);
}

// Attach Event Listeners
if (getStartedBtn) getStartedBtn.addEventListener('click', openTransactionForm);
if (heroGetStartedBtn) heroGetStartedBtn.addEventListener('click', openTransactionForm);
if (heroAddBtn) heroAddBtn.addEventListener('click', openTransactionForm);
if (closeFormBtn) closeFormBtn.addEventListener('click', closeTransactionForm);

if (transactionModal) {
    transactionModal.addEventListener('click', function(e) {
        if (e.target === transactionModal) {
            closeTransactionForm();
        }
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && transactionModal && transactionModal.style.display === 'flex') {
        closeTransactionForm();
    }
});

// Set default input date
if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
}

// --- 4. Handle Form Submission ---
if (transactionForm) {
    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const type = typeInput.value;
        const amount = parseFloat(amountInput.value); 
        const date = dateInput.value;
        const descriptionText = descriptionInput.value.trim();

        if (!type) {
            showMessage('Please select a transaction type.', 'error');
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            showMessage('Please enter a valid positive amount.', 'error');
            return;
        }

        // --- Correct Math Operations ---
        if (type === 'income') {
            totalIncome += amount;
        } else if (type === 'expense') {
            totalExpense += amount;
        }

        balance = totalIncome - totalExpense;

        const transaction = { type, description: descriptionText, amount, date };
        transactions.unshift(transaction); 

        // Update local storage
        localStorage.setItem('income', totalIncome);
        localStorage.setItem('expense', totalExpense);
        localStorage.setItem('balance', balance);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        updateUI();
        renderTransactions();

        const formattedAmount = CURRENCY + amount.toFixed(2);
        showMessage(`Transaction added successfully! (${type.toUpperCase()}: ${formattedAmount} - ${descriptionText})`, 'success');

        // Form Resets
        descriptionInput.value = '';
        amountInput.value = '';
        typeInput.value = ''; 
    });
}

// --- 5. Function to update overview displays ---
function updateUI() {
    if (incomeDisplay) incomeDisplay.textContent = CURRENCY + totalIncome.toFixed(2);
    if (expenseDisplay) expenseDisplay.textContent = CURRENCY + totalExpense.toFixed(2);
    if (balanceDisplay) balanceDisplay.textContent = CURRENCY + balance.toFixed(2);

    if (savingRateDisplay) {
        if (totalIncome > 0) {
            const rate = ((balance / totalIncome) * 100).toFixed(0);
            savingRateDisplay.textContent = Math.max(0, rate) + "%";
        } else {
            savingRateDisplay.textContent = "0%";
        }
    }
}

// --- 6. Function to render transactions table Securely (Anti-XSS) ---
function renderTransactions() {
    if (!transactionList) return;
    transactionList.innerHTML = ''; 

    if (transactions.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="4" style="text-align: center; color: #888; padding: 2rem;">No transactions yet. Click "+ Add Transaction" to get started!</td>`;
        transactionList.appendChild(tr);
        return;
    }

    transactions.forEach(t => {
        const tr = document.createElement('tr');

        // Column 1: Type Badge
        const typeTd = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = `badge badge-${t.type}`;
        badge.textContent = t.type;
        typeTd.appendChild(badge);

        // Column 2: Description (Safe TextContent)
        const descTd = document.createElement('td');
        descTd.textContent = t.description || '-';

        // Column 3: Amount (Safe TextContent)
        const amountTd = document.createElement('td');
        amountTd.className = t.type === 'income' ? 'income-amount' : 'expense-amount';
        amountTd.textContent = `${t.type === 'income' ? '+' : '-'}${CURRENCY}${t.amount.toFixed(2)}`;

        // Column 4: Date
        const dateTd = document.createElement('td');
        dateTd.textContent = t.date || '-';

        // Securely append columns to row
        tr.appendChild(typeTd);
        tr.appendChild(descTd);
        tr.appendChild(amountTd);
        tr.appendChild(dateTd);

        transactionList.appendChild(tr);
    });
}

// Execute initial load updates
updateUI();
renderTransactions();
