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
  // here we will extract all the statistic and parse it to appropriete value
  const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g, ""));
  const metascore = parseInt(movieDetail.Metascore);
  // since ratings is on float string
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ""));
  // since the Awards and nomination is a long string, we wil split it to an array and only work with the actule value.

  let count = 0;
  const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
    const value = parseInt(word);
    //award string contains a words, when parsing word to int, will give us NaN.
    if (isNaN(value)) {
      //skip if nan occurs else add to the running total.
      return prev;
    } else {
      return prev + value;
    }
  }, 0);

  console.log(awards);
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
