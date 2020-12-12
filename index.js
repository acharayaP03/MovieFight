import createAutoComplete from "./autocomplete";

createAutoComplete({
  root: document.querySelector(".autocomplete"),
  renderOptions(movie) {
    return `
        <img src="${movie.Poster === "N/A" ? "" : movie.Poster}" />
        ${movie.Title} (${movie.Year})
    `;
  },
});
