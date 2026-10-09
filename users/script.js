const state = {
  users: [],
  favorites: [],
  search: ""
};

const userList = document.getElementById("userList");
const favoriteList = document.getElementById("favoriteList");
const favCount = document.getElementById("favCount");
const status = document.getElementById("status");
const searchInput = document.getElementById("searchInput");
const headerFavorites = document.getElementById("headerFavorites");
const favoritesPanel = document.getElementById("favoritesPanel");

async function fetchUsers() {
  status.textContent = "Loading...";
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) throw new Error("Bad response");
    const data = await response.json();
    state.users = data.users;
    status.textContent = "";
  } catch (error) {
    status.textContent = "Error: could not load users.";
  }
}

function card(user) {
  const isFav = state.favorites.some((f) => f.id === user.id);
  return `
    <article class="card">
      <img src="${user.image}" alt="${user.firstName}" />
      <h3>${user.firstName} ${user.lastName}</h3>
      <p>${user.email}</p>
      <p>${user.company.name}</p>
      <button onclick="toggleFavorite(${user.id})">
        ${isFav ? "♡" : "♥️"}
      </button>
    </article>
  `;
}

function render() {
  const filtered = state.users.filter((user) =>
    user.firstName.toLowerCase().includes(state.search.toLowerCase())
  );

  userList.innerHTML = filtered.length
    ? filtered.map(card).join("")
    : "<p>No users found.</p>";

  favoriteList.innerHTML = state.favorites.length
    ? state.favorites.map(card).join("")
    : "<p>No favorites yet.</p>";

  favCount.textContent = state.favorites.length;
}

function toggleFavorite(id) {
  const exists = state.favorites.some((f) => f.id === id);
  if (exists) {
    state.favorites = state.favorites.filter((f) => f.id !== id);
  } else {
    state.favorites.push(state.users.find((u) => u.id === id));
  }
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
  render();
}

searchInput.addEventListener("input", (e) => {
  state.search = e.target.value;
  render();
});

headerFavorites.addEventListener("click", () => {
  favoritesPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

async function init() {
  state.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  await fetchUsers();
  render();
}

init();