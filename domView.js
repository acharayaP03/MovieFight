import Axios from "axios";

let leftMovie;
let rightMovie;

export const onMovieSelect = async (movie, element, side) => {
  const response = await Axios.get("http://www.omdbapi.com/", {
    params: {
      apiKey: "4fd8b060",
      i: movie.imdbID,
    },
  });

  console.log(response.data);
  element.innerHTML = movieTemplate(response.data);

  // compare if both sides are defined

  if (side === "left") {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparison();
  }
};

// now define a helper function for runComparison

const runComparison = () => {
  console.log("Time for comparison.");
};

const movieTemplate = (movieDetail) => {
  return `
        <article class="media">
            <figure class="media-left">
                <p class="image"><img src="${movieDetail.Poster}" /></p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1> ${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Ratings</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};
