window.addEventListener('DOMContentLoaded',function(){  
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);
});

const apiKey = "1bfdbff05c2698dc917dd28c08d41096";
const baseURL = "https://api.themoviedb.org/3/movie/upcoming?api_key=";
const searchUrl = "https://api.themoviedb.org/3/search/movie?api_key=1bfdbff05c2698dc917dd28c08d41096&query=";
const imgBaseURL = "http://image.tmdb.org/t/p/w500";
var remove_Tv_Shows = 0;
async function fetchMovies() {
    const apiUrl = `${baseURL}${apiKey}`;

    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        return response.json();
      })
      .then(data => data.results)
      .catch(error => {
        console.error(error);
      });
  }

  fetchMovies()
    .then(movies => {
   
      movies.forEach(movie => {
            Movie(movie.poster_path, movie.id,movie.title);
            console.log(movie.poster_path)
      });
    })
    .catch(error => {
      console.error(error);
    });

    function Movie(poster_path, id,MovieTitile) {
        const div = document.createElement("div");
        div.classList.add("grid-item");
      
        const img = document.createElement("img");
        img.src = `${imgBaseURL}${poster_path}`;
        
        const title = document.createElement("p");
        title.textContent= `${MovieTitile}`;

        const grid = document.querySelector("#movies");
        div.appendChild(img);
        div.appendChild(title);
        grid.appendChild(div);

        div.setAttribute("id", id);
        let red = document.getElementById(id);
       
        red.addEventListener("click", () => {
          window.location ="detail.html?val=1&movieId=" + id;
        });
      }

// ====================================== search ==================================================

function searhMovies() {
    document.getElementById("movies").innerHTML = "";
    document.getElementById("tv-series-list").innerHTML = "";
    let search = document.querySelector("#search").value;
  
    //Search for movies API
    function MovieSearch() {
        const apiUrl = `${searchUrl}${search}`;
    
        return fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch movies');
            }
            return response.json();
          })
          .then(data => data.results)
          .catch(error => {
            console.error(error);
          });
      }
      MovieSearch()
      .then(movies => {
         if(movies.length == 0){
          const div = document.createElement('div');
          div.classList.add('nofound')
          const No_found = document.createElement('h1');
          No_found.textContent = "No movies found";
          No_found.classList.add('no')
          div.appendChild(No_found);
          document.getElementById("movies").appendChild(div);
         }
         else{
        movies.forEach((movie,i) => {
          if(!movie.poster_path){
            movie.splice(i,1);
          }
              MovieResult(movie.poster_path, movie.id,movie.title);
        });
      }
      })
      .catch(error => {
        console.error(error);
      });
  }
  function MovieResult(poster_path, id,MovieTitile) {
    const div = document.createElement("div");
    div.classList.add("grid-item");
  
    const img = document.createElement("img");
    img.src = `${imgBaseURL}${poster_path}`;
    
    const title = document.createElement("p");
    title.textContent= `${MovieTitile}`;

    const grid = document.querySelector("#movies");
    div.appendChild(img);
    div.appendChild(title);
    grid.appendChild(div);

    div.setAttribute("id", id);
    let red = document.getElementById(id);
   
    red.addEventListener("click", () => {
      window.location ="detail.html?val=1&movieId=" + id;
    });
  }

  // ============================== series showes ==============================================

  const SeriesbaseURL = 'https://api.themoviedb.org/3/tv/popular?api_key=';

   function fetchSeries() {
  const apiUrl = `${SeriesbaseURL}${apiKey}`;

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      return response.json();
    })
    .then(data => data.results)
    .catch(error => {
      console.error(error);
    });
}


fetchSeries()
      .then(tvShows => {
        tvShows.forEach((tvShow,i) => {
          if(!tvShow.poster_path){
            tvShow.splice(i,1);
          }
          seriesMoveis(tvShow.name,tvShow.poster_path,tvShow.id);
        });
      })
      .catch(error => {
         console.error(error);
      });
 
      function seriesMoveis(names,poster,id){
      const div = document.createElement("div");
      div.classList.add("grids");
    
      const img = document.createElement("img");
      img.src = `${imgBaseURL}${poster}`;
      
      const title = document.createElement("p");
      title.textContent= `${names}`;
       
      const grid = document.querySelector(".seriesgrid");
      div.appendChild(img);
      div.appendChild(title);
      grid.appendChild(div);


      div.setAttribute("id", id);
      let redirect = document.getElementById(id);
     
      redirect.addEventListener("click", () => {
        window.location ="seriesDetail.html?val=0&seriesId=" + id;
      });
      }
  