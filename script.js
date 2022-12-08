
let round = 1;
let column = 0;
let theSecretWord;
let theSecretWordArray;
const theSecretObj = {};
const guess = [];
let didYouWin = false;
let inputs = document.getElementsByTagName('input');

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

    inputs[round*5-5 + guess.length].focus()
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
  if (round === 7 && didYouWin === false) youLost();
  inputs[round*5-5].focus();
}

function charCheck() {
  let goodGuess = 0;
  let secLetter = theSecretWordArray

  for (let i = 0; i < 5; i++){
    if (guess[i] === secLetter[i]) {
      inputs[round*5-5 + i].style.backgroundColor = 'green';
      inputs[round*5-5 + i].style.color = 'white';
      goodGuess++;
    }
    else if (theSecretObj[guess[i]]) {
      inputs[round*5-5 + i].style.backgroundColor = 'yellow';
    }
  }

  if (goodGuess === 5) youWin();

};

function youWin() {
  didYouWin = true;
  document.getElementById("header").innerHTML = "YOU WIN!";
  for (let i = 0; i < 5; i++) {
    inputs[round*5-5 + i].style.backgroundColor = 'green';
    inputs[round*5-5 + i].style.color = 'white';
  }
}

function youLost() {
  document.getElementById("header").innerHTML = "Better Luck Tomorrow!";
  document.getElementById("theWord").innerHTML = theSecretWord.toUpperCase();
  theWord.style.backgroundColor = 'red';

  for (let i = 0; i < 30; i++) {
    inputs[i].style.backgroundColor = 'red';
    inputs[i].style.color = 'white';
  }
}

