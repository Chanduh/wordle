
let round = 1;
let column = 0;
let theSecretWord;
let theSecretWordArray;
const theSecretObj = {};
const guess = [];
const letterBoxes = document.getElementsByClassName('inputs');

async function getWord() {                // GET WORD
  const secretWord = await fetch("https://words.dev-apis.com/word-of-the-day");
  const processedResponse = await secretWord.json();
  theSecretWord = processedResponse.word;
  theSecretWordArray = theSecretWord.split('');

  for (const char of theSecretWord){
    if (!theSecretObj[char]) theSecretObj[char] = 1;
    else { theSecretObj[char]++ }
  }
}


document.addEventListener                 // HANDLE INPUT
("keydown", function handleKeyPress(event) { 

    const action = event.key;

    if (action === "Enter") {               // SUBMIT
      submitWord();
    } 
    else if (action === "Backspace") {      // DELETE
      backspace(guess.length);
    }
    else if (isLetter(action)){             // ENTERED A LETTER
        addLetter(action);
        // alert('its a letter!');
    }
});

window.onload = function() {             // AUTO FOCUS ON BOX 1 w/o CLICKING
    // letter1.focus();
    getWord();
  };

function autoTab(original,destination) {    // AUTOTAB TO NEXT BOX
  if (original.getAttribute && original.value.length == original.getAttribute("maxlength")){
  destination.focus()};
  column++;
}

function isLetter(letter) {                 // IS IT A LETTER CHECKER
    return /^[a-zA-Z]$/.test(letter);
}

function backspace (x) {                    // DELETE LAST CHARACTER
    guess.pop();
    column--;

    if (round === 1){
      if (guess.length === 0) letter11.focus();
      else if (guess.length === 1) letter12.focus();
      else if (guess.length === 2) letter13.focus();
      else if (guess.length === 3) letter14.focus();
      else if (guess.length === 4) letter15.focus();
    }
    if (round === 2){
      if (guess.length === 0) letter21.focus();
      else if (guess.length === 1) letter22.focus();
      else if (guess.length === 2) letter23.focus();
      else if (guess.length === 3) letter24.focus();
      else if (guess.length === 4) letter25.focus();
    }
    if (round === 3){
      if (guess.length === 0) letter31.focus();
      else if (guess.length === 1) letter32.focus();
      else if (guess.length === 2) letter33.focus();
      else if (guess.length === 3) letter34.focus();
      else if (guess.length === 4) letter35.focus();
    }
    if (round === 4){
      if (guess.length === 0) letter41.focus();
      else if (guess.length === 1) letter42.focus();
      else if (guess.length === 2) letter43.focus();
      else if (guess.length === 3) letter44.focus();
      else if (guess.length === 4) letter45.focus();
    }
    if (round === 5){
      if (guess.length === 0) letter51.focus();
      else if (guess.length === 1) letter52.focus();
      else if (guess.length === 2) letter53.focus();
      else if (guess.length === 3) letter54.focus();
      else if (guess.length === 4) letter55.focus();
    }
    if (round === 6){
      if (guess.length === 0) letter61.focus();
      else if (guess.length === 1) letter62.focus();
      else if (guess.length === 2) letter63.focus();
      else if (guess.length === 3) letter64.focus();
      else if (guess.length === 4) letter65.focus();
    }

    
};                                       

const addLetter = (char) => {               // ADD LETTER TO GUESS WORD ARRAY
    if (guess.length < 5){
    guess.push(char);
  }
};

 function submitWord() {

  if (guess.length < 5) return;
  if (guess.length === 5) {
      validWordCheck();
    }
}

async function validWordCheck() {      // VALIDATE WORD IN DICTIONARY
    let guessString = guess.join('');

    const response = await fetch(`https://words.dev-apis.com/validate-word`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ word: guessString }),
    });
    const verdict = await response.json();

    if (verdict.validWord === true){
    charCheck();
    round++;
    column = 0;
    nextRow();
  }

    return verdict;
}

const nextRow = () => {
  while (guess[0]){guess.pop();}
  if (round === 2) letter21.focus();
  if (round === 3) letter31.focus();
  if (round === 4) letter41.focus();
  if (round === 5) letter51.focus();
  if (round === 6) letter61.focus();


}



function charCheck() {
  let goodGuess = 0;
  let tester = theSecretWordArray

  for (let i = 0; i < 5; i++){
    if (guess[i] === tester[i]) {
      goodGuess++;
    }
    if (guess[i] !== tester[i] && theSecretObj[tester]) {
      
    }
  }

  if (goodGuess === 5) youWin();

};

function youWin() {
  document.getElementById("header").innerHTML = "YOU WIN!";
  let inputs = document.getElementsByTagName('input');
  for (let i = 0; i < 5; i++) {
    inputs[round*5-5 + i].style.backgroundColor = 'green';
    inputs[round*5-5 + i].style.color = 'white';

  }



}



