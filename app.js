let musics = [];
let id;
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

document.querySelector("#search").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    Search();
  }
});

document.querySelector("#buttonSearch").addEventListener("click", Search);

function Search() {
  document.querySelector("#favorites").style.display = "none";

  document.querySelector("#results").style.display = "flex";

  document.querySelectorAll("#results > div").forEach((div) => div.remove());

  const music = document.querySelector("#search").value;

  const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${music}`;
  const headers = {
    "X-RapidAPI-Key": "3d18fadb96mshfdcba924e6d39f5p136872jsn47e833abda1a",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  };

  fetch(url, { method: "GET", headers })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const results = data.data;

      if (!results || results.length === 0) {
        const noResults = document.createElement("div");
        noResults.className = "noResults";
        noResults.textContent = "No results found.";
        document.querySelector("#results").appendChild(noResults);
      } else {
        const setResult = new Set();
        const filterResults = results.filter((result) => {
          const duplicated = setResult.has(result.title);
          setResult.add(result.title);
          return !duplicated;
        });

        filterResults.forEach((music, index) => {
          musics[index] = music;
          const resultDiv = document.createElement("div");
          resultDiv.id = music.id;
          resultDiv.className = "result";
          resultDiv.innerHTML = `
                        <img src="${music.album.cover_big}" alt="Artist image">
                        <h3 id="title${index}" class="title">${music.title}</h3>
                        <div class="autor">${music.artist.name}</div>
                        <div class="fav">
                            <button onclick="addToFavorites(${index})">Add to Favorites</button>
                        </div>
                        <div id="content${music.id}" class="content"></div>
                    `;
          document.querySelector("#results").appendChild(resultDiv);

          resultDiv.addEventListener("click", function () {
            document
              .querySelectorAll(".content")
              .forEach((content) => (content.innerHTML = ""));
            document.querySelector("#selected")?.setAttribute("id", id);
            id = this.id;
            this.id = "selected";
            const selectedMusic = musics.find((m) => m.id === parseInt(id));
            const contentDiv = document.querySelector(`#content${id}`);
            contentDiv.innerHTML = `
                            <audio src="${selectedMusic.preview}" controls></audio>`;
          });
        });
      }
    })
    .catch((error) => console.error(error));
}


function addToFavorites(index) {
  const music = musics[index];
  if (!favorites.some((fav) => fav.id === music.id)) {
    favorites.push(music);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
}

function removeFromFavorites(index) {
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

document.querySelector("#favorites").style.display = "none";


document.querySelector("#buttonFav").addEventListener("click", function () {
  const favoritesSection = document.querySelector("#favorites");
  const resultsSection = document.querySelector("#results");

  if (favoritesSection.style.display === "none") {
    favoritesSection.style.display = "block";
    resultsSection.style.display = "none";
  } else {
    favoritesSection.style.display = "none";
    resultsSection.style.display = "flex";
  }
});


function renderFavorites() {
  const favoriteResults = document.querySelector("#favoriteResults");
  favoriteResults.innerHTML = "";

  if (favorites.length === 0) {
    const noFavoritesMessage = document.createElement("h3");
    noFavoritesMessage.className = "no-favorites-message";
    noFavoritesMessage.textContent = "You do not have favourites yet";
    document.querySelector("#favoriteResults").appendChild(noFavoritesMessage);
  } else {
    const noFavoritesMessage = document.querySelector(".no-favorites-message");
    if (noFavoritesMessage) {
      noFavoritesMessage.remove();
    }

    favorites.forEach((music, index) => {
      const favoriteDiv = document.createElement("div");
      favoriteDiv.className = "favorite-song";
      favoriteDiv.innerHTML = `
        <img src="${music.album.cover_big}" alt="Artist image">
        <h3 class="title">${music.title}</h3>
        <div class="autor">${music.artist.name}</div>
        <audio src="${music.preview}" controls></audio>
        <div class="fav">
          <button onclick="removeFromFavorites(${index})">Remove from Favorites</button>
        </div>
      `;
      favoriteResults.appendChild(favoriteDiv);
    });
  }
}

renderFavorites();
