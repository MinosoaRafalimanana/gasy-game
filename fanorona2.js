let position = document.querySelectorAll(".pos");

//micible an'ireo balise en fonction de l'ID
//const message = document.getElementById("message");
let fini = document.getElementById("fini");
let restartBtn = document.getElementById("btn-restart");
let quitBtn = document.getElementById("btn-quit");
let clickAudio = document.getElementById("click");
let gameoverAudio = document.getElementById("gameover");
let tour = "Mpilalao 01";
let wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let wonArr;

position.forEach((pos) => {
  pos.addEventListener("mouseenter", hoverIn);
  pos.addEventListener("mouseleave", hoverOut);
  pos.addEventListener("click", action, { once: true });
});

//Control ilay boutton restart na Hamerina ilalao
restartBtn.addEventListener("click", restart);

//Pas encore fonctionnelle, En cours...
quitBtn.addEventListener("click", quit);

function restart() {
  message.innerText = "Mpilalao 01 zao";
  //supprime la couverture gameover (fini), ilay apres partie
  fini.classList.remove("active");

    /*const img1= URL("pj1.jpg");
    const img2=URL("pj2.jpg");*/

  //supprime touts les contenus dans le grid afin de permettre un relancement du jeu
  position.forEach((pos) => {
    pos.addEventListener("mouseenter", hoverIn);
    pos.addEventListener("mouseleave", hoverOut);
    pos.classList.remove("img1");
    pos.classList.remove("img1-hover");
    pos.classList.remove("img2");
    pos.classList.remove("img2-hover");
    pos.classList.remove("highlight");
    pos.removeEventListener("click", action);
    pos.addEventListener("click", action, { once: true });
    pos.style.cursor = "pointer";
  });
}

//Pas encore fonctionnelle
function quit() {
  window.close();
}

//Action: Algo principale qui gere le jeu,
function action() {
  let ClassTour = tour === "Mpilalao 01" ? "img1" : "img2";
  this.classList.remove(`${ ClassTour}-hover`);
  this.classList.add( ClassTour);
  clickAudio.play();

  //Affichage du resultat apres une partie
  if (isWinner( ClassTour)) {
    message.innerText = `${tour} no mpandresy`;

    //Css apres victoire, micouvre anle croix telo na le cercle telo
    wonArr.forEach( (i) => cages[i].classList.add("highlight") );
    reset();
    return;
  } else {
    const res = Array.from(cages).every((pos) => {
      return cage.classList.length === 2;
    });
    if (res) {
      message.innerText = `Sahala !!!`;
      //couvre toutes les cages si sahala
      cages.forEach((pos)=> {
        cage.classList.add("highlight");
      });
      reset();
      return;
    }
  }
  //Gestion du tour
  tour === "Mpilalao 01"
    ? (tour = "Mpilalao 02")
    : (tour = "Mpilalao 01");

  message.innerText = `${tour} zao!`;
}


function isWinner(curClass) {
  return wins.some( (win) => {
    const res = win.every( (i) => position[i].classList.contains(curClass) );
    if (res) {
      wonArr = win;
    }
    return res;
  });
}

function hoverIn() {
  let currentClass = tour === "Mpilalao 01" ? "img1" : "img2";
  if (this.classList.contains("img1") || this.classList.contains("img2")) {
    this.style.cursor = "not-allowed";
  } else {
    this.classList.add(`${currentClass}-hover`);
  }
}

function hoverOut() {
  if (
    this.classList.contains("img1-hover") ||
    this.classList.contains("img2-hover")
  ) {
    this.classList.remove("img1-hover");
    this.classList.remove("img2-hover");
  }
}

//Annulation des evenements encores activés
function reset() {
  cages.forEach((cage) => {
    cage.removeEventListener("mouseenter", hoverIn);
    cage.removeEventListener("mouseleave", hoverOut);
    cage.removeEventListener("click", action);
    cage.style.cursor = "not-allowed";
  });

  gameoverAudio.play();

//TEMPS D'apparition de la couverture Gameover
  setTimeout(() => {
    fini.classList.add("active");
  }, 100);
}

