// Cache elements
const form = document.querySelector("#add-form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

// Add a row
function addRow(itemName, itemPrice) {

    const li = document.createElement("li");

    const itemText = document.createElement("span");
    itemText.textContent = `${itemName} - ${itemPrice} ETB`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("del");

    li.append(itemText, deleteButton);

    list.append(li);
}

// Update total
function updateTotal() {

    let total = 0;

    const rows = list.querySelectorAll("li");

    rows.forEach((row) => {

        const text = row.querySelector("span").textContent;

        const price = Number(text.split("-")[1].replace("ETB", "").trim());

        total += price;
    });

    totalEl.textContent = total;
}

// Form submit
form.addEventListener("submit", (event) => {

    event.preventDefault();

    const itemName = name.value.trim();
    const itemPrice = Number(price.value);

    // Validate both fields
    if (!itemName || !itemPrice) {
        alert("Please enter an item name and price.");
        return;
    }

    addRow(itemName, itemPrice);

    form.reset();

    updateTotal();
});

// Event delegation
list.addEventListener("click", (event) => {

    // Delete item
    if (event.target.matches(".del")) {

        event.target.closest("li").remove();

        updateTotal();
    }

    // Toggle bought state
    else if (event.target.closest("li")) {

        event.target.closest("li").classList.toggle("bought");
    }
});