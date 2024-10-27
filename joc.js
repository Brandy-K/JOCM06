//DOM elements
const inputObj = document.getElementById("paraulaSecret");
const paraulaactualObj = document.getElementById("paraulaactual");
const buttonObj = document.getElementById("comencaPartida");
const titolObj = document.getElementById("titol");
const jocImatgeObj = document.getElementById("Imatgesjoc");
const botonsObj = document.getElementById("Botons");
const letterButtons = botonsObj.querySelectorAll(".letter-button"); 
//variables
let paraulaSecreta;
let paraulaactual = [];
let jugadafallada = 0;
const maxAttempts = 10;
let currentPoints = 0;
let totalGames = 0;
let gamesWon = 0;
let highestScore = { points: 0, date: '' };
let consecutiveCorrectGuesses = 0; //how many letters have been guessed correctly consecutely

// Player Info DOM Elements
const pointsCurrentGame = document.getElementById("PuntsPartidesActuals");
const totalGamesPlayed = document.getElementById("TotalPartides");
const gamesWonInfo = document.getElementById("PartidesGuanyades");
const highestScoreInfo = document.getElementById("PartidaAmbMésPunts");


// Function to enable/disable letter buttons with styling
function disableLetterButtons(disable = true, borderColor = 'red', textColor = 'red') {
    letterButtons.forEach(button => {
        button.disabled = disable;
        button.style.border = `1px solid ${borderColor}`;
        button.style.color = textColor;
    });
}

// Disable letter buttons by default with red border and text
window.addEventListener('DOMContentLoaded', () => {
    disableLetterButtons(true);
});

// para comenca partida
function ComencaPartida() {    
    reiniciarElJoc();
    paraulaSecreta = inputObj.value.toLowerCase(); // Paraula secreta

    if (!paraulaSecreta) {
        alert("Has d’afegir una paraula per poder començar a jugar");
    } else if (paraulaSecreta.length < 4) {
        alert("La paraula ha de contenir més de 3 caràcters");
    } else if (!isNaN(paraulaSecreta)) {
        alert("La paraula no pot contenir números");
    } else {
        disableLetterButtons(false);
        actualitzaParaulaActual(); // crear els --
        mostrarParaulapantalla(); // Display els --

        currentPoints = 0; //reiniciar els puntas
        pointsCurrentGame.textContent = currentPoints;         
        // Disable the input and the button when the comenca button is clicked
        inputObj.disabled = true;
        buttonObj.disabled = true;
        inputObj.value = "";
        titolObj.style.backgroundColor = "";
        titolObj.value= "";        
        jocImatgeObj.src =  "Imatgesjoc/penjat_0.jpg";
        disableLetterButtons(true); //disable the letters.
        
    }
}
function mostrarParaula() {
    const inputObj = document.getElementById("paraulaSecret"); // To get the input word
    const iconObj = document.getElementById("mostrar"); // To get the icon

    if (inputObj.type === "password") {
        inputObj.type = "text"; // mostrar el password
        iconObj.classList.remove("fa-eye"); // per cambiar el icon
        iconObj.classList.add("fa-eye-slash");
    } else {
        inputObj.type = "password"; // Hide the password
        iconObj.classList.remove("fa-eye-slash"); // tornar el icon to its original form
        iconObj.classList.add("fa-eye");
    }
}

// Create an array of -- to match the length of the secret word
function actualitzaParaulaActual() {
    paraulaactual = []; //guarda la paraula actual en un array
    for (let i = 0; i < paraulaSecreta.length; i++) {
        paraulaactual[i] = "-"; // Create --
    }
}

// Display the current guessed state of the word on the screen
function mostrarParaulapantalla() {
    titolObj.textContent = paraulaactual.join("");
    //titolObj.textContent = paraulaactual.toString.replaceAll(",", " "); //no funciona
    
}

// Function for the guessed letters
function mostrarContingutBoto(buttonElement) {
    let paraulaInsertada = buttonElement.innerText.toLowerCase();
    let trobat = false;  // Flag to track if the letter is in the word
    let letterOccurrences = 0;  // Counter for occurrences of the guessed letter

    // Check if the guessed letter is in the secret word
    for (let i = 0; i < paraulaSecreta.length; i++) {
        if (paraulaSecreta[i] === paraulaInsertada) {
            paraulaactual[i] = paraulaSecreta[i];  // Replace placeholder with correct letter
            trobat = true;
            letterOccurrences++;  // Increment occurrences counter
        }
    }
   
    // Disable the button and turn text and border red
    buttonElement.disabled = true;
    buttonElement.style.border = "1px solid red";
    buttonElement.style.color = "red";

    if (trobat) {
        consecutiveCorrectGuesses++;  // Increase consecutive correct guesses
        // Add points based on consecutive correct guesses, multiplied by letter occurrences
        currentPoints += consecutiveCorrectGuesses * letterOccurrences;        
        mostrarParaulapantalla();  // Update displayed word

        // Check if the word is completely guessed
        if (!paraulaactual.includes("-")) {            
            updatePlayerInfo(true); //
            // enable the input and button
            inputObj.disabled = false;
            buttonObj.disabled = false;
            titolObj.style.backgroundColor = "green";  //if the letter is guessed correctly, set the background to green.
            setTimeout(function() { //to delay alert and update the last letter
                console.log("Has guanyat!");                
                reiniciarElJoc();
                  // Reset game after winning
            }, 100);
            
        }
        
    } else {
        jugadafallada++;
        currentPoints = Math.max(0, currentPoints - 1); // Deduct 1 point but prevent negative
        jocImatgeObj.src = `Imatgesjoc/penjat_${jugadafallada}.jpg`;  //when the player guesses the wrong letter, the image is updated

        if (jugadafallada >= maxAttempts) {
            titolObj.style.backgroundColor = "red"; //background color changes to red if the player loses.        
            alert("You've lost.La paraulaSecreta es:"+ paraulaSecreta);
            mostrarParaulaCompleta(); // Reveal the word
            inputObj.disabled = false;    //torna a activa el boto i el input when you lose the game.
            buttonObj.disabled = false;
            inputObj.value = "";
            //reiniciarElJoc();  // reiniciar el joc
                        
        }
          
    }
      pointsCurrentGame.textContent = `Punts partida actuals: ${currentPoints}`;
  
}


// Mostra la paraula secreta when the player loses
function mostrarParaulaCompleta() {
    titolObj.textContent = paraulaSecreta.split("").join(" ");
}


// reiniciar el Joc
function reiniciarElJoc() {    
    // Clear the input and game state
    paraulaactual = [];
    jugadafallada = 0;

    // Reset the title and image back to the original
    titolObj.textContent = "Començar partida";
    titolObj.style.backgroundColor = "";
    jocImatgeObj.src =  "Imatgesjoc/penjat_0.jpg";
    disableLetterButtons(true);
}

// Update player info after the game ends
function updatePlayerInfo(won) {
    totalGames++;  // Increment total games by 1
    totalGamesPlayed.textContent = `Total Partides: ${totalGames}`;
    if (won) {
        gamesWon++;
        gamesWonInfo.textContent = `Partides Guanyades: ${gamesWon} (${((gamesWon / totalGames) * 100).toFixed(2)}%)`;
        // Check for highest score
        if (currentPoints > highestScore.points) {
            const currentDate = new Date().toLocaleString();
            highestScore.points = currentPoints;
            highestScore.date = currentDate;
            highestScoreInfo.textContent = `Partida amb més punts: ${currentDate} - ${currentPoints} punts`;
        }
    } else {
        gamesWonInfo.textContent = `Partides Guanyades: ${gamesWon} (${((gamesWon / totalGames) * 100).toFixed(2)}%)`;
    }

    // Update current points for the current game
    pointsCurrentGame.textContent = `Punts partida actuals: ${currentPoints}`;
}
