const state = {
  shows: [],
  favorites: [],
  search: "",
};

const showsEl = document.querySelector("#shows");
const favoritesEl = document.querySelector("#favorites");
const searchEl = document.querySelector("#searchInput");
const formEl = document.querySelector("#searchForm");
const messageEl = document.querySelector("#message");

function render() {
  const term = state.search.toLowerCase();

  const shown = state.shows.filter((item) =>
    item.show.name.toLowerCase().includes(term),
  );

  showsEl.innerHTML = shown.map((item) => createCard(item.show)).join("");

  favoritesEl.innerHTML = state.favorites
    .map((show) => createCard(show))
    .join("");
}

function createCard(show) {
  const image = show.image?.medium;

  const saved = state.favorites.some((favorite) => favorite.id === show.id);

  return `
        <article class="card">

            <img
                src="${image}"
                alt="${show.name}"
            >

            <div class="card-content">

                <h3>${show.name}</h3>

                <p>
                    ${show.rating?.average || "N/A"}
                </p>

                <button
                    onclick="addOrRemove(${show.id})"
                >
                    ${saved ? "Remove" : "Favorite"}
                </button>

            </div>

        </article>
    `;
}

async function loadShows(query) {
  messageEl.textContent = "Loading...";

  try {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${query}`,
    );

    if (!response.ok) {
      throw new Error("Failed to load shows");
    }

    state.shows = await response.json();

    messageEl.textContent = "";

    render();
  } catch (error) {
    messageEl.textContent = "Could not load shows.";

    console.log(error);
  }
}

function addOrRemove(id) {
  const exists = state.favorites.find((favorite) => favorite.id === id);

  if (exists) {
    state.favorites = state.favorites.filter((favorite) => favorite.id !== id);
  } else {
    const item = state.shows.find((item) => item.show.id === id);

    if (item) {
      state.favorites.push(item.show);
    }
  }

  saveFavorites();

  render();
}

function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(state.favorites));
}

function loadFavorites() {
  state.favorites = JSON.parse(localStorage.getItem("favorites")) || [];
}

formEl.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = searchEl.value.trim();

  if (!query) {
    return;
  }

  state.search = "";

  loadShows(query);
});

function init() {
  loadFavorites();

  loadShows("friends");

  render();
}

init();
