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
const apiKey = "k_zgx7ylrn";
//API to fetch image
const imgBaseURL = "http://image.tmdb.org/t/p/w500";
if(val == 1){
//API link about the movies detail 
const detailMovie =
 'https://imdb-api.com/en/API/Title/'+ apiKey +'/'+ movieId ;

// detail Movie API
fetch(detailMovie)
	.then(response => {
    if (!response.ok) {
      key = 1;
      throw new Error('Failed to fetch movies');
    }
   return response.json()})
	.then(response => {
    console.log(response);
  document.getElementById("myImageID").src = response.image;
  console.log(response.fullTitle);
  console.log(response.plotLocal);
  console.log(response.releaseDate);
  console.log(movieId);
  document.getElementById("original_title").innerHTML = response.fullTitle;
  document.getElementById("overview").innerHTML = response.plot;
  document.getElementById("release_date").innerHTML = response.releaseDate;})
	.catch(err => console.error(err));

  function fetchcasts() {

    return fetch(detailMovie)
      .then(response => {
        if (!response.ok) {
          key = 1;
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => data.actorList)
      .catch(error => {
        console.error(error);
      });
  }
fetchcasts()
.then(casts => {
  casts.forEach(cast => {
    castappend(cast.name,cast.image);
  })
})
function castappend(names,poster){
  const div = document.createElement("div");
  div.classList.add("grid-item");

  const img = document.createElement("img");
  img.src = poster;
  
  const title = document.createElement("p");
  title.textContent= `${names}`;
   
  const grid = document.querySelector(".grids");
  div.appendChild(img);
  div.appendChild(title);
  grid.appendChild(div);
}

  //Movie Related Movie API
  async function fetchRelatedMovies() {

    return fetch(detailMovie)
      .then(response => {
        if (!response.ok) {
          key = 1;
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => data.similars)
      .catch(error => {
        console.error(error);
      });
  }

   fetchRelatedMovies()
    .then(movies => {
      movies.forEach((movie,i) => {
            Movie(movie.image, movie.id,movie.title);
      });
    })
    .catch(error => {
      console.error(error);
    });

    function Movie(poster_path, id,MovieTitile) {
      const div = document.createElement("div");
      div.classList.add("grid-item");
    
      const img = document.createElement("img");
      img.src = poster_path;
      
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
   const detailseries = 'https://imdb-api.com/en/API/Title/'+apiKey+'/'+seriesId;
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
     document.getElementById("myImageID").src = response.image;
     document.getElementById("original_title").innerHTML = response.fullTitle;
     document.getElementById("overview").innerHTML = response.plot;
     document.getElementById("release_date").innerHTML = response.releaseDate;
     document.getElementById("last").innerHTML = response.type;
     document.getElementById("sesons").innerHTML = response.stars; })
     .catch(err => console.error(err));
   
     //Movie series Movie API
     function fetchRelatedseries() {
   
       return fetch(detailseries)
         .then(response => {
           if (!response.ok) {
             throw new Error('Failed to fetch movies');
           }
   
           return response.json();
         })
         .then(data => data.similars)
         .catch(error => {
           console.error(error);
         });
     }
   
     fetchRelatedseries()
       .then(movies => {
         movies.forEach((series,i) => {
               Movie(series.image, series.id,series.title);
         })
       })
       .catch(error => {
         console.error(error);
       });
   
       function Movie(poster_path, id,seriesTitile) {
         const div = document.createElement("div");
         div.classList.add("grid-item");
       
         const img = document.createElement("img");
         img.src = poster_path;
         
         const title = document.createElement("p");
         title.textContent= seriesTitile;
   
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
 