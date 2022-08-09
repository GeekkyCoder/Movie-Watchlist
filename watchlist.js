const moviesSection = document.getElementById("movies-section");

watchlistedMovies();

function watchlistedMovies() {
  let movies = JSON.parse(localStorage.getItem("movie"));
  if (movies === null || movies.length === 0) {
    moviesSection.innerHTML = `
        <div class="default-view">
        <h3>Your watchlist is looking a little empty...</h3>
        <div class='d-flex'>
        <a href="movies.html"><img src='./images/plus-icon.png' alt='plus-icon'></a> 
        <p>Let’s add some movies!</p>
        <div>
        </div>
        `;
  } else {
    let html = movies.map((movie, index) => {
      return `
        <div class="movies-container">
    <div class="movie-wallpaper">
        <img src=${
          movie.poster === "N/A" ? "./images/error-image.jpg" : movie.poster
        } alt="movie-wallpaper">
    </div>
    <div class="movie-info-container">
        <div class="name-rating-box">
            <h3 class="movie-name">${movie.title}</h3>
            <img class="star-png" src="/images/star-icon.png" alt="star-icon">
            <span class="ratings">${
              movie.rating === "N/A" ? "7.4" : movie.rating
            }</span>
        </div>
        <div class="movie-titles-container">
            <span class="runtime-minutes">${
              movie.runtime === "N/A" ? "117mins" : movie.runtime
            }</span>
            <span class="movie-catogery">${movie.genre}</span>
            <span class="watchlist-btn-box"> 
            <img  class="minus-icon" src="/images/minus-icon.png" alt="minus-icon">
            <button onclick='deleteMovie(${JSON.stringify(
              movie.imdId
            )})' class="watchlist-btn">Remove</button></span>
        </div>
        <div class="storyline">
            <p>${movie.plot}</p>
        </div>

    </div>
</div>
        
        `;
    });
    moviesSection.innerHTML = html;
  }
}

function deleteMovie(id) {
  let movies = JSON.parse(localStorage.getItem("movie"));
  let deletdMovie = movies.filter((movie) => movie.imdId != id);
  localStorage.setItem("movie", JSON.stringify(deletdMovie));
  watchlistedMovies();
}
