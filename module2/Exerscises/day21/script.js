// --- Exercise 1: Theme Toggle Persistence ---
const toggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('app_theme') || 'light';
document.body.className = savedTheme;

toggleBtn.addEventListener('click', () => {
  const newTheme = document.body.className === 'dark' ? 'light' : 'dark';
  document.body.className = newTheme;
  localStorage.setItem('app_theme', newTheme);
});

// --- Exercise 2: Safe Save and Load Helpers ---
function save(key, arr) {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

function load(key) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return [];
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Corrupt or invalid JSON found in localStorage, resetting to empty array:", e);
    return [];
  }
}

// --- Exercise 4, 5 & 6: Form Handling & Validation ---
const STORAGE_KEY = 'signup_entries';
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const errorArea = document.getElementById('error-area');
const counterArea = document.getElementById('counter-area');

// Ethiopian Phone Regex Validation
// Matches +2519..., +2517..., 09..., or 07... followed by 8 trailing digits
const ethiopianPhoneRegex = /^(?:\+251|09|07)\d{8}$/;

// Exercise 6: Show count on load
function updateCounter() {
  const entries = load(STORAGE_KEY);
  counterArea.textContent = `Total people signed up: ${entries.length}`;
}

// Initialize layout state
updateCounter();

form.addEventListener('submit', (e) => {
  // Exercise 4: Prevent default browser submission behavior
  e.preventDefault();
  
  // Clear any existing errors
  errorArea.textContent = ''; 

  // Exercise 4: Read trimmed values
  const nameVal = nameInput.value.trim();
  const phoneVal = phoneInput.value.trim();

  // Exercise 4 & 5: Name minimum length validation
  if (nameVal.length < 2) {
    errorArea.textContent = 'Name must be at least two characters long.';
    return;
  }

  // Exercise 4 & 5: Ethiopian Phone format validation
  if (!ethiopianPhoneRegex.test(phoneVal)) {
    errorArea.textContent = 'Please enter a valid Ethiopian phone number (e.g., 0911223344 or +251911223344).';
    return;
  }

  // Exercise 6: Success workflow
  const entries = load(STORAGE_KEY);
  entries.push({ 
    name: nameVal, 
    phone: phoneVal, 
    timestamp: new Date().toISOString() 
  });
  save(STORAGE_KEY, entries);

  // Reset inputs and update UI counter
  form.reset();
  updateCounter();
});
