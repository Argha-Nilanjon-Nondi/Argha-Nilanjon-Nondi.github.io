var slideIndex = 1;
show_slide(slideIndex);

// Next/previous controls
function go_slide(n) {
    show_slide(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    show_slide(slideIndex = n);
}

function show_slide(n) {
    var i;
    var slides = document.getElementsByClassName("slider-item");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function show_by_drop(film_type){
    const movie_box=document.getElementsByClassName("movie-item");
    if(film_type=="all"){
      for(i=0;i<movie_box.length;i++){
          movie_box[i].style.display="block";
      }
    }

    else{
        for(i=0;i<movie_box.length;i++){
            if(movie_box[i].getAttribute("filmtype")!=film_type){
            movie_box[i].style.display="none";
            }

            if(movie_box[i].getAttribute("filmtype")==film_type){
                movie_box[i].style.display="block";
                }
        }

    }
}

function show_by_input(certain_text,film_type){
    const movie_box=document.getElementsByClassName("movie-item");
    const movie_name=document.querySelectorAll(".movie-info>h4");
    show_by_drop(film_type);
    if(certain_text==""){
      for(i=0;i<movie_box.length;i++){
          movie_box[i].style.display="none";
      }
    }

    else{
        for(i=0;i<movie_box.length;i++){
            let movie_name_text=(movie_name[i].innerHTML).toUpperCase()
            if(movie_name_text.includes(certain_text.toUpperCase())==false){
            movie_box[i].style.display="none";
            }

            if(movie_name_text.includes(certain_text.toUpperCase())==true){
                movie_box[i].style.display="block";
                }
        }

    }

    
}

function check_for_empty(){
    let movie_list=document.querySelector(".movie-list");
    const movie_box=document.getElementsByClassName("movie-item");
    for(i=0;i<movie_box.length;i++){
        if(movie_box[i].style.display=="block"){
            return false;
        }
    }

    movie_list.innerHTML=`
    <p style="font-size:2rem;color:white;">no result found</p>
    `;

}

/*search engine start*/
let search_drop=document.getElementById("search-type");
search_drop.addEventListener("change",function (){
   show_by_drop(search_drop.value);
});

let search_in=document.getElementById("search-name");
let search_btn=document.getElementById("search-btn");
search_btn.addEventListener("click",function (){
    show_by_input(search_in.value,search_drop.value);
    check_for_empty();
});
/*search engine end*/