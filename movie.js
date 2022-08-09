const moviesSection = document.getElementById("movies-section");
const defaultViewEl = document.getElementById("default-view");
const searchBtn = document.getElementById("searchBtn");
const inputEl = document.getElementById("inputEl");
const apiKey = "49576a35";
let moviesArray
let allMovieData = [];


searchBtn.addEventListener("click", fetchData);

function fetchData() {
  let inputValue = inputEl.value;
  if (inputValue === "") {
    moviesSection.innerHTML = `  <div id="default-view">
      <h3>Unable to find what you’re looking for. Please try another search 😉</h3>
           </div>
    `;
  } else {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}&type=movie`;
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        let moviesArrayData = responseData.Search.slice(0, 5);
        moviesArray=[]
        setMovieHtml(moviesArrayData);
      });
  }
}

function setMovieHtml(moviesArrayData) {
  defaultViewEl.style.display = "none";
  moviesArrayData.forEach((movie) => {
    let imdIDUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}&type=movie`;
    fetch(imdIDUrl)
      .then((response) => response.json())
      .then((movieObj) => {
        showMovieList(movieObj);
      });
  });
}

function showMovieList(movie) {
  let movieData = {
    title: movie.Title,
    poster: movie.Poster,
    rating: movie.imdbRating,
    runtime: movie.Runtime,
    genre: movie.Genre,
    plot: movie.Plot,
    imdId: movie.imdbID,
  };
  moviesArray.push(movieData);
  let html = moviesArray.map((movie) => {
    return `<div class="movies-container">
    <div class="movie-wallpaper">
        <img src=${
          movie.poster === "N/A" ? "./images/error-image.jpg" : movie.poster
        } alt="movie-wallpaper">
    </div>
    <div class="movie-info-container">
        <div class="name-rating-box">
            <h3 class="movie-name">${movie.title.length>30 ? movie.title.substr(0,30) : movie.title}</h3>
            <img class="star-png" src="/images/star-icon.png" alt="star-icon">
            <span class="ratings">${
              movie.rating === "N/A" ? "7.5" : movie.rating
            }</span>
        </div>
        <div class="movie-titles-container">
            <span class="runtime-minutes">${
              movie.runtime === "N/A" ? "117mins" : movie.runtime
            }</span>
            <span class="movie-catogery">${movie.genre}</span>
            <span class="watchlist-btn-box"> 
            <img  class="plus-icon" src="/images/plus-icon.png" alt="plus-icon">
            <button onclick='pushToLocal(${JSON.stringify(
              movie
            )})' class="watchlist-btn">Watchlist</button></span>
        </div>
        <div class="storyline">
            <p>${movie.plot}</p>
        </div>

    </div>
</div>
`;
  });
  moviesSection.innerHTML = html.join("");
}

function pushToLocal(movieObj) {
  let movies = JSON.parse(localStorage.getItem("movie"));
  if (movies === null) {
    allMovieData.push(movieObj);
    localStorage.setItem("movie", JSON.stringify(allMovieData));
  } else {
    let movieDataStr = localStorage.getItem("movie");
    allMovieData = JSON.parse(movieDataStr);
    allMovieData.push(movieObj);
    localStorage.setItem("movie", JSON.stringify(allMovieData));
  }
}
