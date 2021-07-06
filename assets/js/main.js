let body = document.body;
let mainContentEl = document.querySelector("#main-content");
let questionsEl = document.querySelector("#questions");
let choicesEl = document.querySelector("#choices");
let btnTimer = document.getElementById("start-timer");

let timerBtn = document.createElement("button");
timerBtn.innerHTML = "Start Quiz";
timerBtn.type = "button";
timerBtn.name = "timerBtn";
timerBtn.style.textAlign = "center";
document.body.appendChild(timerBtn);

// This function starts the timer countdown
var startTimer = function timer() {
  let displayTimer = document.getElementById("timer");
  const totalTime = 5;
  let timeLeft = totalTime;
  let timePassed = 0;

  const timer = setInterval(() => {
    timeLeft = totalTime - timePassed;
    timePassed += 1;
    displayTimer.innerHTML = "Time Remaining: " + timeLeft;
    if (timeLeft < 1) {
      clearInterval(timer);
    }
  }, 1000);
};

// Declaration of Questions
const questionsObj = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: { 1: "strings", 2: "booleans", 3: "alerts", 4: "numbers" },
    answer: "3",
  },
  {
    question: "The condition in an if / else statement in enclosed with _____.",
    choices: {
      1: "quotes",
      2: "curly brackets",
      3: "parentheses",
      4: "square brackets",
    },
    answer: "3",
  },
];

//This function creates a choices
var createChoices = function (obj) {};
// This function displays all the questions
function displayQuestions() {
  // variable to store the HTML output
  const output = [];

  questionsObj.forEach((currQuestion, index) => {
    // variable to store the list of choices
    const choices = [];

    // ...add an HTML radio button

    for (number in currQuestion.choices) {
      choices.push(
        `<div>
          <button name="question${index}" >${number} ${currQuestion.choices[number]}</button>           
        </div>
     `
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="questions"> ${currQuestion.question} </div>
      <div class="choices"> ${choices.join("")} </div>`
    );
  });
  // finally combine our output list into one string of HTML and put it on the page
  mainContentEl.innerHTML = output.join("");
}

//timerBtn.addEventListener("click", startTimer);
timerBtn.addEventListener("click", displayQuestions);
