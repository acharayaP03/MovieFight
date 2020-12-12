
import Axios from 'axios';
import fetchMovie from './API/fetchAPI';

import {   debounce  } from "./Utils/utils";


const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For A Movie </b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
`;


const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
    const movies = await fetchMovie(event.target.value);

    //if there is no results, dont add is-acitve at all.
    // and retrurn, which will exit the execution of rest of the function.
    if(!movies.length){
        dropdown.classList.remove('is-active');
        return;
    }
    //this will clear out the html elements below when another search is performed.
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');
    for(let movie of movies){

        const options = document.createElement('a');

        options.classList.add('dropdown-item');

        options.innerHTML = `
            <img src="${movie.Poster === 'N/A' ?  '' : movie.Poster}" />
            ${movie.Title}
        `;

        options.addEventListener('click', () =>{
             dropdown.classList.remove('is-active');
             input.value = movie.Title;
             onMovieSelect(movie);
        })

        resultsWrapper.appendChild(options);
    }

};

input.addEventListener("input", debounce(onInput, 500));

// close drop down menu if the click is outside.

document.addEventListener('click', event =>{
    //root is where the dropdwon will be rendered. 
    //event.target will have all the reference of the element when cliked. 
    //removing is-acitve will remove the element. 
    //console.log(event.target)
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active');
    }
})


const onMovieSelect = async movie =>{
    const response = await Axios.get('http://www.omdbapi.com/', {
        params: {
            apiKey: '4fd8b060',
            i: movie.imdbID
        }
            
     })

    console.log(response.data);
    document.querySelector('#target').innerHTML = movieTemplate(response.data);
}

const movieTemplate = (movieDetail) =>{
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
}