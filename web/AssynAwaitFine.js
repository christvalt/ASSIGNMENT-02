const axios = require('axios');
const fs = require('fs').promises;

async function saveMovies() {
    let response = await axios.get('https://ghibliapi.herokuapp.com/films');
    let movieList = '';
    response.data.forEach(movie => {
        movieList += `${movie['title']}, ${movie['release_date']}\n`;
    });
	console.log("test"+movieList);
}
saveMovies();