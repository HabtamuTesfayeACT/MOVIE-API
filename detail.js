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

var link = window.location.href;
var newLink = new URL(link);
const movieId = newLink.searchParams.get("movieId");
const val = newLink.searchParams.get("val");
const seriesId = newLink.searchParams.get("seriesId");
//API key
const apiKey = "1bfdbff05c2698dc917dd28c08d41096";
//API to fetch image
const imgBaseURL = "http://image.tmdb.org/t/p/w500";
if(val == 1){
//API link about the movies detail 
const detailMovie =
  "https://api.themoviedb.org/3/movie/" +
  movieId +
  "?api_key=" +
  apiKey +
  "&language=en-US";
//API link for similar movies
const relatedUrl =
  "https://api.themoviedb.org/3/movie/" +
  movieId +
  "/similar?api_key=" +
  apiKey +
  "&language=en-US&page=1";

  const credits =
  "https://api.themoviedb.org/3/movie/" +
  movieId +
  "/credits?api_key=" +
  apiKey +
  "&language=en-US&page=1";
// detail Movie API
fetch(detailMovie)
	.then(response => response.json())
	.then(response => {
  document.getElementById("myImageID").src = `${imgBaseURL}${response.poster_path}`;
  document.getElementById("original_title").innerHTML = response.original_title;
  document.getElementById("overview").innerHTML = response.overview;
  document.getElementById("release_date").innerHTML = response.release_date;})
	.catch(err => console.error(err));
  
  function fetchcasts() {

    return fetch(credits)
      .then(response => {
        if (!response.ok) {
          key = 1;
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => data.cast)
      .catch(error => {
        console.error(error);
      });
  }
fetchcasts()
.then(casts => {
  casts.forEach(cast => {
    castappend(cast.name,cast.profile_path);
  })
})
function castappend(names,poster){
  const div = document.createElement("div");
  div.classList.add("grid-item");

  const img = document.createElement("img");
  img.src = `${imgBaseURL}${poster}`;
  
  const title = document.createElement("p");
  title.textContent= `${names}`;
   
  const grid = document.querySelector(".grids");
  div.appendChild(img);
  div.appendChild(title);
  grid.appendChild(div);
}
console.log('1');
  //Movie Related Movie API
  async function fetchRelatedMovies() {

    return fetch(relatedUrl)
      .then(response => {
        if (!response.ok) {
          key = 1;
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => data.results)
      .catch(error => {
        console.error(error);
      });
  }

   fetchRelatedMovies()
    .then(movies => {
      if(movies.length == 0){
        const div = document.createElement('div');
        div.classList.add('nofound')
        const No_found = document.createElement('h1');
        No_found.textContent = "No Related movies found";
        No_found.classList.add('no')
        div.appendChild(No_found);
        document.getElementById("movies").appendChild(div);
       }
       else{
      movies.forEach((movie,i) => {
        if(!movie.poster_path){
          movie.splice(i,1);
        }
            Movie(movie.poster_path, movie.id,movie.title);
      });
    }
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

      const grid = document.querySelector(".grid");
      div.appendChild(img);
      div.appendChild(title);
      grid.appendChild(div);
    
      div.setAttribute("id", id);
      let red = document.getElementById(id);
    
      red.addEventListener("click", () => {
        window.location ="detail.html?val=1&movieId=" + id;
      });
    }
  }
    //==================================  Detail and related for series ===================================  
    if(val == 0){     
   //API key
   //API link about the movies detail 
   const detailseries =
     "https://api.themoviedb.org/3/tv/" +
     seriesId +
     "?api_key=" +
     apiKey +
     "&language=en-US";
   //API link for similar movies
   const relatedSeriesUrl =
     "https://api.themoviedb.org/3/tv/" +
     seriesId +
     "/similar?api_key=" +
     apiKey +
     "&language=en-US&page=1";
   
   // detail series API
   fetch(detailseries)
     .then(response => response.json())
     .then(response => {
     document.getElementById("myImageID").src = `${imgBaseURL}${response.poster_path}`;
     document.getElementById("original_title").innerHTML = response.original_name;
     document.getElementById("overview").innerHTML = response.overview;
     document.getElementById("release_date").innerHTML = response.first_air_date;
     document.getElementById("last").innerHTML = response.number_of_episodes;
     document.getElementById("sesons").innerHTML = response.number_of_seasons; })
     .catch(err => console.error(err));
   
     //Movie series Movie API
     function fetchRelatedseries() {
   
       return fetch(relatedSeriesUrl)
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
   
     fetchRelatedseries()
       .then(movies => {
        if(movies.length == 0){
          const div = document.createElement('div');
          div.classList.add('nofound')
          const No_found = document.createElement('h1');
          No_found.textContent = "No Related Series found";
          No_found.classList.add('no')
          div.appendChild(No_found);
          document.getElementById("movies").appendChild(div);
         }
         else{
         movies.forEach((series,i) => {
            if(!series.poster_path){
              series.splice(i,1);
            }
               Movie(series.poster_path, series.id,series.name);
         });
        }
       })
       .catch(error => {
         console.error(error);
       });
   
       function Movie(poster_path, id,seriesTitile) {
         const div = document.createElement("div");
         div.classList.add("grid-item");
       
         const img = document.createElement("img");
         img.src = `${imgBaseURL}${poster_path}`;
         
         const title = document.createElement("p");
         title.textContent= `${seriesTitile}`;
   
         const grid = document.querySelector(".grid");
         div.appendChild(img);
         div.appendChild(title);
         grid.appendChild(div);

         div.setAttribute("id", id);
         let redirect = document.getElementById(id);
        
         redirect.addEventListener("click", () => {
           window.location ="seriesDetail.html?val=0&seriesId=" + id;
         });
       }
      }
 