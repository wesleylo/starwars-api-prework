var curr_film = 0;

document.getElementById("btn-next").addEventListener("click", next);
document.getElementById("btn-prev").addEventListener("click", prev);

fetchFilm(curr_film);

function prev() {
  curr_film--;
  if(curr_film < 0) curr_film = 0;
  console.log(curr_film);
  fetchFilm(curr_film);
}
function next() {
  curr_film++;
  if(curr_film > 5) curr_film = 5;
  console.log(curr_film);
  fetchFilm(curr_film);
}

function fetchFilm(film_id) {
  console.log(film_id);
  fetch('https://swapi.dev/api/films')
  .then(data => {
    return data.json();
  })
  .then(films => {
    films.results.sort(function(a, b) {
        return parseFloat(a.episode_id) - parseFloat(b.episode_id); // compare and sort films by ascending episode_id
    });
    console.log(films.results[film_id]);
    document.querySelector('#episode_id').innerHTML = films.results[film_id].episode_id;
    document.querySelector('#episode_title').innerHTML = films.results[film_id].title;
    document.querySelector('#director').innerHTML = films.results[film_id].director;
    document.querySelector('#producer').innerHTML = films.results[film_id].producer;
    document.querySelector('#release_date').innerHTML = films.results[film_id].release_date;
    document.querySelector('#opening_crawl').innerHTML = films.results[film_id].opening_crawl;
  });
}
