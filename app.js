const API_URL = "https://ghibliapi.vercel.app/films/";

const fetchMovies = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error, status code: ${response.status}`);
        }
        const movies = await response.json();
        addLikedKeyToMovie(movies);
    } catch (error) {
        console.error("An error came up: ", error);
    }
};

const addLikedKeyToMovie = (movies) => {
    movies.map((movie) => movie.liked = false);
    localStorage.setItem("movies", JSON.stringify(movies));
    renderMoviesToUI();
};

const renderMoviesToUI = () => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    console.log(movies);
    const moviesContainerEl = document.getElementById("movies-container");
    // lägga in filmerna som element i vårt UI
    movies.forEach(movie => {
        // skapa själva elementet för article för filmen
        const movieEl = document.createElement("article");
        movieEl.innerHTML = `
                            <figure style="background-image: url(${movie.image})">
                                <input class="like-checkbox" id="${movie.id}" type="checkbox" ${movie.liked ? "checked" : ""}>
                            </figure>
                            <h4 class="movie-container__title">${movie.title}</h4>
                            <p class="movie-container__releaseDate">${movie.release_date}</p>
                            `;
        moviesContainerEl.appendChild(movieEl);
    });
};

const initApp = () => {
    if (localStorage.getItem("movies")) {
        renderMoviesToUI();
    } else {
        fetchMovies();
    }
};

initApp();