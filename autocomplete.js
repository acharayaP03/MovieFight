import { debounce } from "./Utils/utils";
const createAutoComplete = ({ root, renderOptions, onSelectOption, inputValue, fetchMovie }) => {
  root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results">
                </div>
            </div>
        </div>
    `;

  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const items = await fetchMovie(event.target.value);

    //if there is no results, dont add is-acitve at all.
    // and retrurn, which will exit the execution of rest of the function.
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    //this will clear out the html elements below when another search is performed.
    resultsWrapper.innerHTML = "";
    dropdown.classList.add("is-active");
    for (let item of items) {
      const options = document.createElement("a");

      options.classList.add("dropdown-item");

      options.innerHTML = renderOptions(item);

      options.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item);
        onSelectOption(item);
      });

      resultsWrapper.appendChild(options);
    }
  };

  input.addEventListener("input", debounce(onInput, 500));

  // close drop down menu if the click is outside.

  document.addEventListener("click", (event) => {
    //root is where the dropdwon will be rendered.
    //event.target will have all the reference of the element when cliked.
    //removing is-acitve will remove the element.
    //console.log(event.target)
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};

export default createAutoComplete;
