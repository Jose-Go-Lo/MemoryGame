const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let nothingClicked = false;

const COLORS = [
  "Crimson",
  "LightPink",
  "DarkOrange",
  "Gold",
  "DarkMagenta",
  "DarkCyan",
  "DarkTurquoise",
  "Sienna",
  "White",
  "Silver",
  "Crimson",
  "LightPink",
  "DarkOrange",
  "Gold",
  "DarkMagenta",
  "DarkCyan",
  "DarkTurquoise",
  "Sienna",
  "White",
  "Silver",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
    // TODO: Implement this function!
  }
}

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
  if (nothingClicked) return;
  if (event.target.classList.contains("flipped")) return;

  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if (!card1 || !card2) {
    clickedCard.classList.add("flipped");
    card1 = card1 || clickedCard;
    card2 = clickedCard === card1 ? null : clickedCard;
  }

  if (card1 && card2) {
    nothingClicked = true;
    let face1 = card1.className;
    let face2 = card2.className;

    if (face1 === face2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      nothingClicked = false;
    } else {
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        nothingClicked = false;
      }, 750);
    }
  }
  if (cardsFlipped === COLORS.length) alert("YOU WIN!");
}
// when the DOM loads
createDivsForColors(shuffledColors);

function randomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

const letters = document.querySelectorAll(".letter");
const intervalId = setInterval(function () {
  for (let letter of letters) {
    letter.style.color = randomRGB();
  }
}, 1000);
