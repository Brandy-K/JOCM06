//Constants per definir la dinàmica del joc.
const NUM_JUGADES = 10;
const RUTA_IMG = "img";
const IMG = "penjat_X.jpg";

const PUNT_JOC_FINAL = 5;
const PUNT_ENCERTADA = 2;
const PUNT_NO_ENCERTADA = 1;

//Constants per definir els objectes HTML
const secretWordInput = document.getElementById("paraulaSecreta");
const secretWordObj = document.getElementById("paraula");
const imgPenjat = document.getElementById("imgPenjat");
const seccioParaulaObj = document.getElementById("seccio-paraula");
const btnComPartida = document.getElementById("comencar-partida");

const puntsPartidaActualObj = document.getElementById("punts-actuals");
const partidesGuanyadesObj = document.getElementById("partides-guanyades");
const totalPartidesObj = document.getElementById("total-partides");
const partidaMesPuntsObj = document.getElementById("partida-mes-punts");

//Variables del joc
let paraulaSecretaArray = [];
let paraulaSecretaActual = [];
let numJugadesActuals = 0;
let numJugadesEncertades = 0;

let puntsPartidaActual;
let partidesGuanyades = 0;
let totalPartides = 0;
let partidaMesPunts = 0;


/*
  Funció que servirà per validar si la paraula introduïda té numbers
*/
function esParaulaSenseNumber(paraula) {
  for (let i = 0; i < paraula.length; i++) {
      if (!isNaN(paraula[i])) {
          return false;
      }
  }
  return true;
}

/*
  Reiniciem les variables amb els valors inicials de la partida.
  Canviem la imatge i el color de fons de la pantalla.
*/
function reiniciarValorsInicialsPartida(){
  numJugadesEncertades = 0;
  paraulaSecretaActual = [];
  numJugadesActuals = 0;
  puntsPartidaActual = 0;
  puntsPartidaActualObj.textContent = puntsPartidaActual;
  const nomImg = RUTA_IMG + "/" + IMG.replace("X", numJugadesActuals);
  imgPenjat.src = nomImg;
  seccioParaulaObj.style.backgroundColor = "rgb(200, 209, 243)";
}

//Pintarem la paraula actual
function pintarParaula() {
  secretWordObj.textContent = paraulaSecretaActual
    .toString()
    .replaceAll(",", "");
}

//Guardem a la paraula tants '_' com caracters té la paraula secreta
function inicialitzarParaula() {
  for (let i = 0; i < paraulaSecretaArray.length; i++) {
    paraulaSecretaActual.push("_");
  }
}

//Funció on actualitzem tots els caràctes de la paraula
function actualitzarTotsCaracters() {
  for (let i = 0; i < paraulaSecretaArray.length; i++) {
    paraulaSecretaActual[i] = paraulaSecretaArray[i];
  }
}

//Funció on actualitzem el color de fons segons el paràmetre d'entrada.
function canviarFons(color){
  seccioParaulaObj.style.backgroundColor = color;
}

/*
Funció per habilitar tots els botons.
S'aplica un color negre pel text i el border.
*/
function reiniciarButons() {
  let boto = "boto_";
  for (let i = 1; i < 27; i++) {
    let idBoto = boto + i;
    let botoObj = document.getElementById(idBoto);
    botoObj.style.color = "black";
    botoObj.style.border = "1px solid black";
    botoObj.disabled = false;
  }
}

/*
Funció per deshabilitar tots els botons.
S'aplica un color vermell pel text i el border.
*/
function bloquejarButons() {
  let boto = "boto_";
  for (let i = 1; i < 27; i++) {
    let idBoto = boto + i;
    let botoObj = document.getElementById(idBoto);
    botoObj.style.color = "red";
    botoObj.style.border = "1px solid red";
    botoObj.disabled = true;
  }
}

/*
Funció per deshabilitar el botó que se li passa per paràmetre.
*/
function bloquejarBoto(obj){
  obj.style.color = "red";
  obj.style.border = "1px solid red";
  obj.disabled = true;
}

/*
Funció per canviar el formulari de tipus password a tipus text. 
Ens servirà per poder visualitzar la paraula.
*/
function mostrarParaula() {
  const form = document.getElementById("paraulaSecreta");
  form.type = "text";
}

/*
Funció per canviar el formulari de tipus text a tipus password. 
Ens servirà per poder ocular la paraula.
*/
function ocultarParaula() {
  const form = document.getElementById("paraulaSecreta");
  form.type = "password";
}

/*
Funció per borrar la paraula del formulari 
Ens servirà per habilitar/deshabilitar el boto 'començar partida' segons 
el paràmetre d'entrada desHabilitar.
*/
function deshabilitarControlPrincipal(desHabilitar){
  secretWordInput.value = "";
  btnComPartida.disabled = desHabilitar;
}

/*
Funció associada amb el botó 'Començar partida'.
Agafarem el valor de l'input, el passem a majuscules (toUpperCase())
i el guardem en un array(split("")).
*/
function comencarPartida() {
  reiniciarValorsInicialsPartida();
  const paraulaSecreta = secretWordInput.value;
  if (paraulaSecreta) {
    if(paraulaSecreta.length > 3){
      if (!Number(paraulaSecreta)) {
        if(esParaulaSenseNumber(paraulaSecreta)){
          paraulaSecretaArray = paraulaSecreta.toUpperCase().split("");
          inicialitzarParaula();
          pintarParaula();
          reiniciarButons();
          deshabilitarControlPrincipal(true);
        }
        else{
          alert("La paraula no pot contenir valors numèric");
        }
      } else {
        alert("La paraula no pot ser numèric");
      }
    }
    else{
      alert("La paraula no pot ser inferior a 4 caràcters");
    }
  } else {
    alert("Has d'afegir una paraula per poder començar");
  }
}

/*
Funció associada amb als botons de les lletres.
Tindrà tota la dinàmica del joc.
El paràmetre d'entrada és l'objecte que s'ha seleccionat.
*/
function jugar(obj) {
  const charSelected = obj.textContent;

  if (paraulaSecretaArray.indexOf(charSelected) != -1) {
    //Has encertat la lletra
    numJugadesEncertades++;
    let puntsJugadaActual = 0;
    for (let i = 0; i < paraulaSecretaArray.length; i++) {
      if (paraulaSecretaArray[i] === charSelected) {
        paraulaSecretaActual[i] = charSelected;
        puntsJugadaActual++;
      }
    }
    pintarParaula();

    puntsPartidaActual += puntsJugadaActual * numJugadesEncertades;
    puntsPartidaActualObj.textContent = puntsPartidaActual;

    if (paraulaSecretaActual.indexOf("_") === -1) {
      //Has encertat la paraula
      totalPartides++;
      totalPartidesObj.textContent = totalPartides;
      partidesGuanyades++;
      const pcGuanyat = Math.round((partidesGuanyades * 100) / totalPartides);
      partidesGuanyadesObj.textContent = partidesGuanyades + "(" + pcGuanyat + "%)";

      if (puntsPartidaActual >= partidaMesPunts) {
        partidaMesPunts = puntsPartidaActual;
        const currentData = new Date();

        const data = currentData.toLocaleDateString();
        const time = currentData.toLocaleTimeString();
        partidaMesPuntsObj.textContent = data + " " + time + " - " + partidaMesPunts + " punts";
      }
      canviarFons("rgba(197, 246, 106, 0.6)");
      bloquejarButons();
      deshabilitarControlPrincipal(false);
    }
  } else {
    numJugadesEncertades = 0;
    numJugadesActuals++;
    puntsPartidaActual = puntsPartidaActual > 0 ? --puntsPartidaActual : 0;

    puntsPartidaActualObj.textContent = puntsPartidaActual;
    //Si el caràcter no existeix
    if (numJugadesActuals < NUM_JUGADES) {
      //Podem continuar jugant però canviem la imatge
      const nomImg = RUTA_IMG + "/" + IMG.replace("X", numJugadesActuals);
      imgPenjat.src = nomImg;
    } else {
      //S'ha acabat la partida
      const nomImg = RUTA_IMG + "/" + IMG.replace("X", numJugadesActuals);
      imgPenjat.src = nomImg;
      actualitzarTotsCaracters();
      pintarParaula();
      canviarFons("red");
      bloquejarButons();
      deshabilitarControlPrincipal(false);
      totalPartides++;
      totalPartidesObj.textContent = totalPartides;
      const pcGuanyat = Math.round((partidesGuanyades * 100) / totalPartides);
      partidesGuanyadesObj.textContent = partidesGuanyades + "(" + pcGuanyat + "%)";
    }
  }
  bloquejarBoto(obj);
}

// Crida de la funció per deshabilitar inicialment el botons del joc.
bloquejarButons();