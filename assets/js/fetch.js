var curr_film = 0;
var appears_in = '';

document.getElementById("btn-prev").addEventListener("click", prev);
document.getElementById("btn-next").addEventListener("click", next);

fetchFilm(curr_film);

function prev() {
  curr_film--;
  if(curr_film < 0) curr_film = 0;
  // console.log(curr_film);
  fetchFilm(curr_film);
}
function next() {
  curr_film++;
  if(curr_film > 5) curr_film = 5;
  // console.log(curr_film);
  fetchFilm(curr_film);
}

function search(id) {
  curr_film = id
  fetchFilm(curr_film);
}

function fetchFilm(film_id) {
  // console.log(film_id);


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

    for(let i=0; i<4; i++) { // add first four characters
      fetch(films.results[film_id].characters[i])
      .then(data => {
        return data.json();
      })
      .then(person => {
        console.log(person);
        appears_in = '';
        for(let i=0; i<3; i++) {
           appears_in = appears_in + '<a href="#" onclick="clickLink(this)" class="episode_link" id="' + person.name + i + '">Episode '; // add onclick get link text
           appears_in += person.films[i][person.films[i].length -2]; // get second to last char of film link

           if(i!=2) appears_in = appears_in + '</a>, ';
           console.log(person.films[i]);

        }
        console.log(appears_in);
        document.querySelector('#character-films'.concat(i)).innerHTML = appears_in;

        document.querySelector('#name'.concat(i)).innerHTML = person.name;
      })
    }

  });
}
function clickLink(link) {
  var t = link.innerText;
  // alert(t[t.length - 1]);
  // alert(parseInt(t[t.length - 1])-1); // get film index
  search(parseInt(t[t.length - 1])-1);
}
