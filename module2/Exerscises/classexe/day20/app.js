// Exercise 1
// Fetch USD to ETB exchange rate

async function getUsdToEtbRate() {

    const res = await fetch("https://open.er-api.com/v6/latest/USD");

    if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
    }

    const data = await res.json();

    return data.rates.ETB;
}

getUsdToEtbRate()
    .then((rate) => {
        console.log(`1 USD = ${rate} ETB`);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    });


// Exercise 2
// Rewrite fetch -> json -> render using async/await

async function fetchAndRenderPosts() {

    try {

        const res = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        console.log("Post:", data);

    } catch (error) {

        console.error("Error:", error.message);

    }
}

fetchAndRenderPosts();


// Exercise 3
// Wrong URL and 404 response

async function testWrongUrl() {

    try {

        const res = await fetch(
            "https://jsonplaceholder.typicode.com/wrong-page"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        console.log(data);

    } catch (error) {

        console.log("Wrong URL caught:", error.message);

    }
}

testWrongUrl();


async function test404() {

    try {

        const res = await fetch(
            "https://jsonplaceholder.typicode.com/posts/999999"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();

        console.log(data);

    } catch (error) {

        console.log("404 caught:", error.message);

    }
}

test404();


// Exercise 4
// Promise.all - fetch first two users in parallel

async function fetchUsers() {

    try {

        const res = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const users = await res.json();

        const firstTwo = users.slice(0, 2);

        const details = await Promise.all(

            firstTwo.map(async (user) => {

                const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users/${user.id}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                return response.json();

            })

        );

        console.log("First two user details:", details);

    } catch (error) {

        console.error("Error:", error.message);

    }
}

fetchUsers();


// Exercise 5
// Loading -> Data -> Error

const statusEl = document.querySelector("#status");
const dataEl = document.querySelector("#data");

async function loadData() {

    statusEl.textContent = "Loading...";

    try {

        const res = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const users = await res.json();

        dataEl.innerHTML = "";

        users.slice(0, 5).forEach((user) => {

            const div = document.createElement("div");

            div.classList.add("user");

            div.textContent = `${user.name} - ${user.email}`;

            dataEl.append(div);

        });

        statusEl.textContent = "Data loaded successfully.";

    } catch (error) {

        statusEl.textContent = `Error: ${error.message}`;

    }
}

loadData();