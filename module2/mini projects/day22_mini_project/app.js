const state = {
  base: "ETB",
  rates: {},        
  watchlist: [],    
  amount: "",       
  currency: "USD",  
  outputMessage: "" 
};

const API = "https://exchangerate-api.com";
const KEY = "birrwatch";

const statusEl = document.querySelector("#status");
const selectEl = document.querySelector("#currency");
const formEl = document.querySelector("#convert-form");
const amountEl = document.querySelector("#amount");
const resultEl = document.querySelector("#result");
const watchlistEl = document.querySelector("#watchlist");
const addBtn = document.querySelector("#watch");

async function loadRates() {
  statusEl.textContent = "Loading rates…";
  statusEl.style.color = "#6c757d"; 
  
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP Status Error: " + res.status);
    
    const data = await res.json();
    state.rates = data.rates;
    statusEl.textContent = ""; 
    render();
  } catch (err) {
    statusEl.textContent = "Could not load rates. Please check your network connection.";
    statusEl.style.color = "#e53e3e"; 
    console.warn("Handled application connection block: ", err.message);
  }
}

function render() {
  const codes = Object.keys(state.rates);
  if (codes.length > 0 && selectEl.children.length === 0) {
    selectEl.innerHTML = codes.map(c => `<option value="${c}">${c}</option>`).join("");
  }
  selectEl.value = state.currency;

  amountEl.value = state.amount;

  resultEl.textContent = state.outputMessage;

  if (state.watchlist.length === 0) {
    watchlistEl.innerHTML = "<li>No currencies yet</li>";
  } else {
    watchlistEl.innerHTML = state.watchlist.map(c => {
      const rateValue = state.rates[c] ? state.rates[c] : "N/A";
      return `<li data-c="${c}">1 ETB = ${rateValue} ${c} <button class="rm">&times;</button></li>`;
    }).join("");
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputAmt = Number(amountEl.value);

  if (!inputAmt || inputAmt <= 0 || isNaN(inputAmt)) {
    state.outputMessage = "Enter a valid amount.";
    render();
    return;
  }

  state.amount = amountEl.value;
  state.currency = selectEl.value;
  
  const currentRate = state.rates[state.currency];
  if (currentRate) {
    const outValue = (inputAmt * currentRate).toFixed(2);
    state.outputMessage = `${inputAmt} ETB = ${outValue} ${state.currency}`;
  } else {
    state.outputMessage = "Rate calculation unavailable.";
  }
  render();
});

selectEl.addEventListener("change", () => {
  state.currency = selectEl.value;
  saveToStorage();
});

addBtn.addEventListener("click", () => {
  const currentTarget = selectEl.value;
  if (!currentTarget || state.watchlist.includes(currentTarget)) return;

  state.watchlist.push(currentTarget);
  saveToStorage();
  render();
});

watchlistEl.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const targetCode = e.target.closest("li").dataset.c;
  
  state.watchlist = state.watchlist.filter(item => item !== targetCode);
  saveToStorage();
  render();
});

function saveToStorage() {
  localStorage.setItem(KEY, JSON.stringify({
    watchlist: state.watchlist,
    currency: state.currency
  }));
}

function loadFromStorage() {
  const savedData = localStorage.getItem(KEY);
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      if (parsed.watchlist) state.watchlist = parsed.watchlist;
      if (parsed.currency) state.currency = parsed.currency;
    } catch (e) {
      console.error("Failed to parse cached payload configuration values:", e);
    }
  }
}

async function init() {
  loadFromStorage(); 
  await loadRates();   
}

init();
