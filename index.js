import axios from "axios";
import { onMovieSelect } from "./domView";
import createAutoComplete from "./autocomplete";

const autocompleteConfig = {
  renderOptions(movie) {
    return `
        <img src="${movie.Poster === "N/A" ? "" : movie.Poster}" />
        ${movie.Title} (${movie.Year})
    `;
  },
  inputValue(item) {
    return item.Title;
  },
  onSelectOption(item) {
    return onMovieSelect(item);
  },
  async fetchMovie(searchTerm) {
    const response = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey: "4fd8b060",
        s: searchTerm,
      },
    });
    if (response.data.Error) {
      return [];
    }
    return response.data.Search;
  },
};
createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector("#left-autocomplete"),
});
createAutoComplete({
  ...autocompleteConfig,
  root: document.querySelector("#right-autocomplete"),
});
