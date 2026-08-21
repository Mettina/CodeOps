const PHONE = /^(?:\+251|0)[79]\d{8}$/;

const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorMessage = document.getElementById("errorMessage");
const userList = document.getElementById("userList");

function validate(name, phone) {
    if (name.length < 2) {
        return "Enter your full name.";
    }

    if (!PHONE.test(phone)) {
        return "Enter a valid Ethiopian phone number.";
    }

    return "";
}

function getSavedUsers() {
    const savedData = localStorage.getItem("users");

    if (savedData === null) {
        return [];
    }

    try {
        const users = JSON.parse(savedData);

        if (!Array.isArray(users)) {
            return [];
        }

        return users;
    } catch (error) {
        return [];
    }
}

function displayUsers() {
    userList.textContent = "";

    const users = getSavedUsers();

    users.forEach(function(user) {
        const li = document.createElement("li");

        li.textContent = `${user.name} - ${user.phone}`;

        userList.appendChild(li);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    const error = validate(name, phone);

    errorMessage.textContent = error;

    if (error !== "") {
        return;
    }

    const users = getSavedUsers();

    const phoneExists = users.some(function(user) {
        return user.phone === phone;
    });

    if (phoneExists) {
        errorMessage.textContent = "This phone number is already registered.";
        return;
    }

    const newUser = {
        name: name,
        phone: phone
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    form.reset();

    errorMessage.textContent = "Signup successful!";

    displayUsers();
});

displayUsers();