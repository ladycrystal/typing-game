// all quotes
const quotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
  "The world is full of obvious things which nobody by any chance ever observes.",
  "I am not a great believer in luck, and I have never known anyone who was a great believer in luck who was not an active agent in his own fortune.",
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let currentWordIndex = 0;
// store the starting time of the game
let startTime = Date.now();
// page elements from html
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

//Start logic
// Add an event listener to the start button
document.getElementById("start").addEventListener("click", startGame);
function startGame() {
  //get a quote from the quotes array
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // split the quote into words and store them in the words array
  words = quote.split(" ");
  // reset the current word index for tracking
  currentWordIndex = 0;

  //updating the UI with the quote
  //create an array of spans, each containing a word from the quote so we can set a class
  const spanWords = words.map(function (word) {
    return `<span class="word">${word}</span>`;
  });
  quoteElement.innerHTML = spanWords.join(" ");
  //highlight the first word
  quoteElement.querySelector(".word").classList.add("highlight");
  //clear any previous messages
  messageElement.textContent = "";

  // Setup the textbox
  //clear the typed value input
  typedValueElement.value = "";
  //focus on the input field
  typedValueElement.focus();
  // set the event handler

  //start the timer
  startTime = Date.now().getTime();
}

//Adding typing logic
typedValueElement.addEventListener("input", typeLogic);
function typeLogic() {
  //get the current value of the input field
  const typedValue = typedValueElement.value;
  //get the current word from the words array
  const currentWord = words[currentWordIndex];
  //check if the typed value matches the current word
  if (typedValue === currentWord) {
    //if it matches, move to the next word
    currentWordIndex++;
    //clear the input field
    typedValueElement.value = "";
    //remove the highlight from the previous word
    quoteElement.querySelector(".highlight").classList.remove("highlight");
    //highlight the next word
    if (currentWordIndex < words.length) {
      quoteElement
        .querySelectorAll(".word")
        [currentWordIndex].classList.add("highlight");
    } else {
      const elapsedTime = new Date().getTime() - startTime;
      const message = `Congratulations! You finished in ${
        elapsedTime / 1000
      } seconds.`;
      //display the message
      messageElement.textContent = message;
    }
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    //end of word
    //clear the input field for the new word
    typedValueElement.value = "";
    //move to the next word
    currentWordIndex++;
    //reset the class name for all elements in quote
    quoteElement.querySelectorAll(".word").forEach(function (wordElement) {
      wordElement.className = " ";
    });
    //highlight the next word
    quoteElement
      .querySelectorAll(".word")
      [currentWordIndex].classList.add("highlight");
    //   //if there are no more words, end the game
    //   endGame();
  } else if (currentWord.startsWith(typedValue)) {
    //if the typed value is a prefix of the current word, do nothing
    //this allows the user to continue typing without any feedback
    typedValueElement.className = " ";
    //clear any error messages when typing correctly
    messageElement.textContent = "";
  } else {
    //if the typed value does not match the current word, show an error
    typedValueElement.className = "error";
    //display a message to the user
    messageElement.textContent = "Incorrect! Keep trying.";
  }
}

//reset the game
document.getElementById("reset").addEventListener("click", resetGame);
function resetGame() {
  //clear the input field
  typedValueElement.value = "";
  //clear the quote element
  quoteElement.innerHTML = "";
  //clear the message element
  messageElement.textContent = "";
  //reset the words array and current word index
  words = [];
  currentWordIndex = 0;
  //reset the start time
  startTime = Date.now();

  //
}
