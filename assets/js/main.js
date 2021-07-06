let score = 0;
let mainContentEl = document.querySelector("#main-content");
let questionsEl = document.querySelector("#questions");
let choicesEl = document.querySelector("#choices");
let btnTimer = document.querySelector("#start-timer");

let startBtn = document.createElement("button");
startBtn.innerHTML = "Start Quiz";
startBtn.type = "button";
startBtn.name = "startBtn";
startBtn.style.textAlign = "center";
btnTimer.appendChild(startBtn);

let questionsCtr = 0;

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
    choices: { 1: "strings", 2: "booleans", 3: "numbers", 4: "alerts" },
    answer: "4",
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

// This function displays all the questions
function displayQuestions() {
  //hide Start button
  startBtn.style.display = 'none';

  
  // variable to store the HTML output
  const output = [];

  //questionsObj.forEach((currQuestion, index) => {
    // variable to store the list of choices
    const choices = [];

    let q = questionsObj[questionsCtr];
  
    for (choice in q.choices) {
    
      choices.push(
        `<div>
          <button name="question${questionsCtr}" onclick='checkAnswer(${choice})'>${choice} ${q.choices[choice]}</button>           
        </div>
        `
      );
    }
    // add this question and its answers to the output 
    output.push(
      `
        <div class="questions"> ${q.question} </div>
        <div class="choices"> ${choices.join("")} </div>
   
      `);
 // });
  // finally combine our output list into one string of HTML and put it on the page
  
  mainContentEl.innerHTML = output.join("");

}

function checkAnswer(answer){
  //console.log(questionsObj[questionsCtr].answer)
  if(answer === parseInt(questionsObj[questionsCtr].answer)){
    alert('correct');
  }else{
    alert('wrong');
  }
}





//timerBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", displayQuestions);

