
const popular = document.querySelector(".frames");
const drama = document.querySelector(".Drama");
const acao = document.querySelector(".acao");
const aventura = document.querySelector(".aventura");

/* resumindo as chmadas para key e axios */
const key = () => {
  return "?api_key=bca1246da75f747a821602efcbca943d&language=pt-BR";
};

const Api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const imgurl = (keyImg) => {
  return `https://image.tmdb.org/t/p/w500${keyImg}`;
};


/* gerando número de 1 a 3 randomicamente para a random baner */ 
const randomPages = () => {
  const numeros = [1, 2];
  const numero = Math.floor(Math.random() * numeros.length);
  return numeros[numero];
};

/* fazendo CRUD dos dados da api externa */
Api(`/discover/movie/${key()}&sort_by=popularity.desc&page=${randomPages()}&year=2022`)
.then((resposta) => RandomBaner(resposta.data.results));

Api(`/discover/movie/${key()}&sort_by=popularity.desc&page=1&year=2022`)
.then((resposta) => moviespage1(resposta.data.results));

Api(`/discover/movie/${key()}&sort_by=popularity.desc&page=2&year=2022`)
.then((resposta) => moviespage2(resposta.data.results));

Api(`/discover/movie/${key()}&sort_by=popularity.desc&page=3&year=2022`)
.then((resposta) => moviespage3(resposta.data.results));

Api(`/discover/movie/${key()}&sort_by=popularity.desc&page=4&year=2022`)
.then((resposta) => moviespage4(resposta.data.results));

/* caso o overview não existir o codigo substituir por um Lorem ipsum */

function text(data) {
  if (data == "") {
    return "Lorem ipsum dolor sit amet consectetur adipiscing elit volutpat, duis rhoncus phasellus at integer elementum fermentum id, nostra sodales tincidunt eros gravida eleifend pulvinar. Donec morbi ";
  } else {
    return data;
  }
}
/* play de videos usando a api do youtube */

$(".playeryt").addClass("showoff");

let tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";

let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

/* universalizando as chamadas para poster e banner  */

const universalPlayer = (id) => {
  $(".playeryt").removeClass("showoff").addClass("show");
  Api(`/movie/${id}/videos${key()}`).then((video) =>
    keyvideo(video.data.results)
  );
  function keyvideo(data) {
    for (let video of [data]) {
      player = new YT.Player("player", {
        height: "100%",
        width: "100%",
        playerVars: { autoplay: 1, controls: 0 },
        videoId: video[0].key,
        events: {
          onReady: onPlayerReady,
        },
      });
    }

    $(".closebtn").click(function () {
      $(".playeryt").removeClass("show"),
      $(".playeryt").addClass("showoff"),
      player.destroy()
    });
  }
};

const universalPoster = (data, consdata, namebtn) => {

  for (let movies of [data]) {
    movies.map((data) => {
      consdata.innerHTML += `
      <div class="frame">
      <img src="${imgurl(data.poster_path)}" 
      style="border-radius:20px; height:225px ;width: 150px;">
      <div id='container_poster'>
          <button class="click_btn ${namebtn}" id='${data.id}'></button>
          <div class='Container'>
              <div class="row p-3 justify-content-center">
                  <div class="col-auto py-4">
                      <span class="material-symbols-outlined play-fs-1">play_arrow</span>
                  </div>
                  <div class="col-auto">
                      <p class='incurtador fs-5 text-break'> ${data.title} </p>
                      <p>Ano de lançamento: ${data.release_date}</p>
                      <p>Nota MDB: ${data.vote_average}</p>
                  </div>
              </div>
            </div>
          </div>
        </div>
    `;
    });
  }

}

const universalBanerSelect = (id, grede, close) =>{
  Api(`/movie/${id + key()}`).then((resposta) =>
      selectmovie([resposta.data])
    );

    function selectmovie(data) {
      for (let movie of [data]) {
        /* console.log(movie[0]) */
        movie.map((resp) => {
          console.log(movie);
          grede.innerHTML = `
          <div class="container-fd">
            <div class="row">
              <div class="col-12 bannermovie" style="background-image:url(${imgurl(
                resp.backdrop_path
              )});">
                  <div class="col-12 backgroudmovie">
                      <div class="close_baner">
                          <span class="material-symbols-outlined"> close </span>
                      </div>
                      <div class="control-info row align-items-center p-5 flex-nowrap">
  
                          <div class="banner-size-responsive col-12">
                              <h1>${resp.title}</h1>
                              <p>Nota: ${resp.vote_average} > ${resp.genres.map(
            (gen) => gen.name
          )} > ${resp.release_date}
                              </p>
                              <div class="responsive-text-select">
                                  <p class="fs-6 text-break characterlimit">${text(
                                    resp.overview
                                  )}</p>
                              </div>
                          </div>
                          <div class="button-responsive-play">
                            <div>
                            <button type="button" class="btn btn_baner startmovie ">Assitir</button>
                            <button type="button" class="btn btn_up">
                               <span class="material-symbols-outlined up">thumb_up</span>
                            </button>
                           <button type="button" class="btn btn_down">
                             <span class="material-symbols-outlined down">thumb_downs</span>
                           </button>
                            </div>
                          </div>
                          
                      </div>
                   </div>
                </div>
              </div>
           </div> `;
        });

        $(".close_baner").click(function () {
          $(`.${close}`).addClass("showoff");
        });

        $(".startmovie").click(function () {
          universalPlayer(id);
        });
      }
    }
}

function onPlayerReady(event) {
  event.target.playVideo();
}

/* Baner randomico dos filmes no topo da pagina */

const RandomBaner = (data) => {
  for (let dataid of [data]) {
    const numeros = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ];
    const numero = Math.floor(Math.random() * numeros.length);
    const random = numeros[numero]; // resultado aleatório
    const idmovie = dataid[random].id;

    console.log(idmovie);

    Api(`/movie/${idmovie + key()}`).then((resp) => Banner([resp.data]));

    const Banner = (data) => {
      const baner = document.querySelector(".baner");
      data.map((resp) => {
        baner.innerHTML = `
        <div class="row baner_size" style="background-image:url(${imgurl(
          resp.backdrop_path
        )})">
          <div class="gradient_baner col-12">
            <div class="d-flex py-5 col-12 responsive-baner" style=" margin: 0 0 0 5%;">
                <div>
                    <img src="${imgurl(
                      resp.poster_path
                    )}" style="height: 298px;width: 185px;">
                </div>

                <div class="row align-self-end col-7 ps-4 responsive-info-baner">
                   <div class="text-movie">
                      <h1 class="text-movie-h1">${resp.title}</h1>
                      <div>
                          <p class="text-movie-p">Nota: ${
                            resp.vote_average
                          } > ${resp.genres.map((gen) => gen.name)} > ${
          resp.release_date
        }</p>
                      </div>
                    </div>

                    <div class="overview">
                      <p class="text-break characterlimit">
                        ${text(resp.overview)}
                      </p>
                    </div>

                    <div class="col-5 d-flex justify-content-between responsive-btn">
                        <button type="button" class="btn btn_baner">Assitir</button>
                        <button type="button" class="btn btn_up">
                            <span class="material-symbols-outlined up">thumb_up</span>
                        </button>
                        <button type="button" class="btn btn_down">
                            <span class="material-symbols-outlined down">thumb_downs</span>
                        </button>
                    </div>
                </div>

             </div>
           </div>
        </div>
        `;
      });

      $(".btn_baner").click(function () {
        $(".playeryt").removeClass("showoff").addClass("show");
          universalPlayer(data[0].id)
      });
    };
  }
};

/* Filmes populares */

function moviespage1(data) {

   universalPoster(data, popular, "button-popular")
 
  $(".button-popular").click(function (event) {
    $(".moviegrede").addClass("show").removeClass("showoff");
    const grede = document.querySelector(".moviegrede ");
    const el = event.target || event.srcElement;
    const id = el.id;
    universalBanerSelect(id, grede,"moviegrede")
  });
}

/* Filmes de drama */

function moviespage2(data) {

   universalPoster(data, drama, "button-drama")
   
  $(".button-drama").click(function (event) {
    $(".moviegadrade-drama").addClass("show").removeClass("showoff");
    const gadrade = document.querySelector(".moviegadrade-drama ");
    const el = event.target || event.srcElement;
    const id = el.id;
    universalBanerSelect(id, gadrade,"moviegadrade-drama")
  });
}

/* Filmes de Ação */

function moviespage3(data) {
   
  universalPoster(data, acao, "button-acao")

  $(".button-acao").click(function (event) {
    $(".moviegadrade-acao").addClass("show").removeClass("showoff");
    const gadrade = document.querySelector(".moviegadrade-acao ");
    const el = event.target || event.srcElement;
    const id = el.id;
    universalBanerSelect(id, gadrade,"moviegadrade-acao")
  });
}

/* Filmes de Aventura */

function moviespage4(data) {
   
  universalPoster(data, aventura, "button-aventura")

  $(".button-aventura").click(function (event) {
    $(".moviegadrade-aventura").addClass("show").removeClass("showoff");
    const gadrade = document.querySelector(".moviegadrade-aventura ");
    const el = event.target || event.srcElement;
    const id = el.id;
    universalBanerSelect(id, gadrade,"moviegadrade-aventura")
  });
}