// document.addEventListener("DOMContentLoaded", () => {
const qwerty = document.getElementById('qwerty');
const ul = document.querySelector('#phrase ul');
const overlay = document.getElementById('overlay');
let missed = 0;
// Start the Game
overlay.addEventListener('click', (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const action = button.className;

    const nameAction = {
      start: () => {
        overlay.style.display = "none";
      },
      restart: () => {
        window.location.reload();
      },
    };
    nameAction[action]();
  }

});

// Return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  // Generates a random value taking the length of the given array as max value
  const i = Math.floor(Math.random() * arr.length);
  // Stores array in a constant taking random number as the array index value
  const array = arr[i];

  // Returns a new created array of characters
  return array.split("");
};

// Add an array of strings to the display
const addPhraseToDisplay = (array) => {
// Loop through the array for each character in the array
  for (let i = 0; i < array.length; i++) {
    // Create a LI element
    const li = document.createElement('li');
    // Pass array current index value as li text content
    li.textContent = array[i];

    //if LI text content is strictly equal to a space
    if (li.textContent === ' ') {
      // LI class equal to "space"
      li.className = 'space';
    }
    else {
      // LI class equal to "letter"
      li.className = 'letter';
    }
    // Appends LI element to UL node
    ul.appendChild(li);
  }
};
// Stores generated array in a new constant
const phraseArray = getRandomPhraseAsArray(test);
// Calls addPhraseToDisplay function and passes phraseArray as parameter
addPhraseToDisplay(phraseArray);
console.log(phraseArray);

// Check if the letter is in the phrase
const checkLetter = (btn) => {
  const lettersArray = document.querySelectorAll('.letter');
  let matched = null;

  for (let i = 0; i < lettersArray.length; i++) {
    if (lettersArray[i].textContent.includes(btn.textContent)) {
      matched = [];
      lettersArray[i].className = 'show';
      matched.push(lettersArray[i]);
    }
  }
  return matched;
};

// check if the game has been won or lost
const checkWin = () => {
  const liLetter = document.getElementsByClassName('letter');
  const btnReset = document.querySelector('#btn__reset');
  const banner = document.querySelector('.title');
  // const li = document.getElementsByTagName('li');
  
  //TODO: cleanup code, DRY
  if (liLetter.length === 0) {
    ul.style.display = 'none'
    overlay.className = 'win';
    overlay.style.display = 'flex';
    banner.textContent = "YOU WIN!";
    btnReset.textContent = 'Restart Game';
    btnReset.className = 'restart';
  }
  if (missed >= 5) {
    ul.style.display = 'none'
    overlay.className = 'lose';
    overlay.style.display = 'flex';
    banner.textContent = "GAME OVER!";
    btnReset.textContent = 'Restart Game';
    btnReset.className = 'restart';
  }
};

// Listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const letterFound = checkLetter(button);

    button.className = "chosen";
    button.disabled = true;

    if (letterFound === null) {
      const hearts = document.querySelectorAll('.tries img');
      button.style.backgroundColor = '#D94545';
      hearts[missed].src = 'images/lostHeart.png';
      missed++;
    }
    checkWin();
  }
});

// });