
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


// Declaration of Questions
const questionsObj = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: { 1: "alerts", 2: "booleans", 3: "numbers", 4: "strings" },
    answer: "1",
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
  {
    question: "Arrays is Javascript can be used to store _____.",
    choices: {
      1: "numbers and strings",
      2: "other arrays",
      3: "booleans",
      4: "all of the above",
    },
    answer: "4",
  },
  {
    question: "String variables must be enclosed within _____ when being assigned to variables.",
    choices: {
      1: "commas",
      2: "quotes",
      3: "curly brackets",
      4: "parentheses",
    },
    answer: "2",
  },
];

const lastQuestion = questionsObj.length - 1;
let questionsCtr = 0;
let score = 0;

// This function starts the timer countdown
var startTimer = function timer() {
  let displayTimer = document.getElementById("timer");
  const totalTime = 100;
  let timeLeft = totalTime;
  let timePassed = 0;

  const timer = setInterval(() => {
    timeLeft = totalTime - timePassed;
    timePassed += 1;
    displayTimer.innerHTML = "Time Remaining: " + timeLeft;
    if (timeLeft < 1) {
      clearInterval(timer);
      score = 0;
    }
  }, 1000);
  score = timeLeft;
};



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
  console.log(lastQuestion);
  if(answer === parseInt(questionsObj[questionsCtr].answer)){
    alert('correct');
  }else{
    alert('wrong');
    displayScore();
  }

  
  if(questionsCtr <= lastQuestion){
    questionsCtr++;
    displayQuestions();
  }
 
}

function displayScore(){
  let result = document.getElementById('results');
  result.innerHTML=`${score}`;
}





startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", displayQuestions);

