const main=document.getElementById("main")
const API_URL="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b0b8b985be49d14633bb29e82768f11d&page=1"
const IMG_PATH="https://image.tmdb.org/t/p/w1280"
const SEARCH_API='https://api.themoviedb.org/3/search/movie?api_key=b0b8b985be49d14633bb29e82768f11d&query="'
const form=document.getElementById("form")
const butEl=document.querySelector(".filter")
const search=document.getElementById("search")
const header=document.getElementById("header")
const filterEl=document.getElementById("filter-submit")
const MOST_POPULAR_URL="https://api.themoviedb.org/3/discover/movie?api_key=b0b8b985be49d14633bb29e82768f11d&&certification_country=US&certification=R&sort_by=popularity.desc"
const RECENT_URL="https://api.themoviedb.org/3/discover/movie?api_key=b0b8b985be49d14633bb29e82768f11d&primary_release_year=2021&2022&sort_by=vote_average.desc"


getMovies(API_URL)
const homeEl=document.querySelector(".home")
homeEl.addEventListener("click",()=>{
    getMovies(API_URL);
})



async function getMovies(url){
    const res=await fetch(url);
    const data=await res.json()

    showMovies(data.results)

}
function showMovies(movies){
    main.innerHTML=""

    movies.forEach((movie) => {
        const { title,poster_path,vote_average,overview }=movie
        const movieEl=document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML=` 
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>Movie Title</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
        <h3>Overview</h3>
        ${overview}
    </div>`
    main.appendChild(movieEl)
        
    });
}
function getClassByRate(vote){
    if(vote>=8){
        return "green";
    }
    else if(vote>=5)
    {
        return "orange"
    }
    else{
        return "red"
    }
}
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const searchTerm=search.value

    if(searchTerm&&searchTerm!=='')
    {
        getMovies(SEARCH_API+searchTerm)

        search.value=""
    }
    else{
        window.location.reload()
    }
})


butEl.addEventListener("click", ()=>{
  const menu=document.createElement("div")
  menu.classList.add("menu")
  menu.classList.toggle("active")
  menu.innerHTML=`
  <div id="ratinginput">
  <div class="part">
      <h3>By Popularity: </h3>
      <input type="checkbox" id="rating" name="rating" class="check" value="Most Popular" unchecked >
      <label>Most Popular</label><br><br>
    </div>

    <div class="part">
    <h3>By Time:</h3>
        <input type="checkbox" id="month"class="check"  name="Recent" value="This Year"unchecked>
        <label>This Year</label><br><br>
        <button  class="submitt" id="filter-submit" onclick="fun()">Search</button>
        </div>
</div> 
  `
  main.appendChild(menu);
})

function fun()
{
    let searchData=""
    let data=new FormData()
    let all=document.querySelectorAll(".check")
    for(let field of all){
        if(field.type!=="submit" && field.type!=="button"){
            if(field.type=="checkbox"){
                if(field.checked){
                    data.append(field.name,field.value);
                    if(field.name==="rating"&&field.value!="")
                    {

                        searchData=MOST_POPULAR_URL;
                            getMovies(searchData)
            
                    }
                    else{
                        window.location.reload()
                    }

                    searchData=""
                    if(field.name==="Recent"&&field.value!="")
                    {
                        searchData=RECENT_URL;
                        getMovies(searchData)
                    }
                    else{
                        window.location.reload()
                    }
                }
                }
            }
        }
        
}

 
    
    