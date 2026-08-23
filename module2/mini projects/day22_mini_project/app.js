const state = {
    base: "ETB",
    rates: {},
    watchlist: [],
    amount: "",
    currency: "USD",
    error: null,
    loading: false
};

const API = "https://api.exchangerate-api.com/v4/latest/ETB";

const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const result = document.querySelector("#result");
const addBtn = document.querySelector("#watch");
const watchUl = document.querySelector("#watchlist");

const KEY = "birrwatch";


function save() {

    localStorage.setItem(
        KEY,
        JSON.stringify({
            watchlist: state.watchlist,
            currency: state.currency
        })
    );
}


function load() {

    const saved = localStorage.getItem(KEY);

    if (!saved) {
        return;
    }

    try {

        const data = JSON.parse(saved);

        if (Array.isArray(data.watchlist)) {
            state.watchlist = data.watchlist;
        }

        if (typeof data.currency === "string") {
            state.currency = data.currency;
        }

    } catch (error) {

        console.error("Could not load saved data.");

        state.watchlist = [];
        state.currency = "USD";
    }
}


function render() {

    const codes = Object.keys(state.rates);

    select.innerHTML = codes
        .map(currency => `
            <option value="${currency}">
                ${currency}
            </option>
        `)
        .join("");

    if (state.currency && codes.includes(state.currency)) {
        select.value = state.currency;
    }

    if (state.loading) {

        status.textContent = "Loading rates...";
        status.className = "";

    } else if (state.error) {

        status.textContent = state.error;
        status.className = "error";

    } else {

        status.textContent = "Live ETB exchange rates loaded.";
        status.className = "success";
    }

    renderWatchlist();
}


async function loadRates() {

    state.loading = true;
    state.error = null;

    render();

    try {

        const res = await fetch(API);

        if (!res.ok) {
            throw new Error("HTTP " + res.status);
        }

        const data = await res.json();

        if (!data.rates) {
            throw new Error("Rates not found.");
        }

        state.rates = data.rates;

        state.error = null;

    } catch (error) {

        console.error(error);

        state.error =
            "Could not load rates. Please check your internet connection.";

    } finally {

        state.loading = false;

        render();
    }
}


function renderWatchlist() {

    if (state.watchlist.length === 0) {

        watchUl.innerHTML = `
            <li>No currencies yet</li>
        `;

        return;
    }

    watchUl.innerHTML = state.watchlist
        .map(currency => {

            const rate = state.rates[currency];

            if (rate === undefined) {
                return `
                    <li data-c="${currency}">
                        ${currency}
                        <button
                            type="button"
                            class="rm"
                        >
                            ×
                        </button>
                    </li>
                `;
            }

            return `
                <li data-c="${currency}">
                    1 ETB = ${rate} ${currency}

                    <button
                        type="button"
                        class="rm"
                    >
                        ×
                    </button>
                </li>
            `;
        })
        .join("");
}


select.addEventListener("change", () => {

    state.currency = select.value;

    save();

    render();
});


form.addEventListener("submit", (event) => {

    event.preventDefault();

    const amt = Number(amountInput.value);

    if (!Number.isFinite(amt) || amt <= 0) {

        result.textContent =
            "Enter a valid amount greater than 0.";

        result.className = "error";

        return;
    }

    state.amount = amt;

    state.currency = select.value;

    const rate = state.rates[state.currency];

    if (typeof rate !== "number") {

        result.textContent =
            "Exchange rate is not available.";

        result.className = "error";

        return;
    }

    const output = (amt * rate).toFixed(2);

    result.textContent =
        `${amt} ETB = ${output} ${state.currency}`;

    result.className = "success";

    save();

    render();
});


addBtn.addEventListener("click", () => {

    const currency = select.value;

    if (!currency) {
        return;
    }

    if (state.watchlist.includes(currency)) {

        result.textContent =
            `${currency} is already in your watchlist.`;

        result.className = "error";

        return;
    }

    state.watchlist.push(currency);

    save();

    render();

    result.textContent =
        `${currency} added to your watchlist.`;

    result.className = "success";
});


watchUl.addEventListener("click", (event) => {

    if (!event.target.matches(".rm")) {
        return;
    }

    const li = event.target.closest("li");

    const currency = li.dataset.c;

    state.watchlist =
        state.watchlist.filter(item => item !== currency);

    save();

    render();

    result.textContent =
        `${currency} removed from your watchlist.`;

    result.className = "success";
});


async function init() {

    load();

    render();

    await loadRates();
}


init();