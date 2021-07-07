let mainContentEl = document.querySelector("#main-content");
let questionsEl = document.querySelector("#questions");
let choicesEl = document.querySelector("#choices");
let answerEl = document.querySelector("#answer");
let btnTimer = document.querySelector("#start-timer");
let result = document.querySelector("#results");
let highScoreEl = document.querySelector("#highscore");

let startBtn = document.createElement("button");
startBtn.innerHTML = "Start Quiz";
startBtn.type = "button";
startBtn.name = "startBtn";
startBtn.style.textAlign = "center";
btnTimer.appendChild(startBtn);



let submitScore = document.createElement("button");
submitScore.textContent = "Submit";

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
  // {
  //   question: "Arrays is Javascript can be used to store _____.",
  //   choices: {
  //     1: "numbers and strings",
  //     2: "other arrays",
  //     3: "booleans",
  //     4: "all of the above",
  //   },
  //   answer: "4",
  // },
  // {
  //   question:
  //     "String variables must be enclosed within _____ when being assigned to variables.",
  //   choices: {
  //     1: "commas",
  //     2: "quotes",
  //     3: "curly brackets",
  //     4: "parentheses",
  //   },
  //   answer: "2",
  // },
];

const lastQuestion = questionsObj.length - 1;
let questionsCtr = 0;
let totalTime = 100;
let score = 0;
let deductPoint = 0;

// This function starts the timer countdown
function startTimer() {
  let displayTimer = document.getElementById("timer");

  const timer = setInterval(() => {
    totalTime = totalTime - (1 + deductPoint);
    deductPoint = 0;

    timePassed = deductPoint + 1;
    score = totalTime;
    displayTimer.innerHTML = "Time Remaining: " + totalTime;

    if (totalTime < 1) {
      clearInterval(timer);
      score = 0;
    }
  }, 1000);
}

// This function displays all the questions
function displayQuestions() {
  //Element for holding the result of answer

  //hide Start button
  startBtn.style.display = "none";

  // variable to store the Questions output
  const output = [];

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
   
      `
  );

  // finally combine our output list into one string of HTML and put it on the page
  mainContentEl.innerHTML = output.join("");
}

function checkAnswer(answer) {
  deductPoint = 0;
  if (answer === parseInt(questionsObj[questionsCtr].answer)) {
    displayResult("CORRECT");
    // answerDisplay.textContent = "WRONG";
  } else {
    displayResult("WRONG");
    deductPoint = 10;
  }

  if (questionsCtr < lastQuestion) {
    questionsCtr++;
    displayQuestions();
  } else {
    //clearInterval(startTimer);
    showScore(score);
    console.log("End of Code Quiz");

    //displayFinalScore();
  }
}

function displayResult(result) {
  //alert(result);
  let answerDisplay = document.createElement("h4");
  answerDisplay.textContent = result;
  answerEl.appendChild(answerDisplay);
}

function showScore(score) {
  questionsEl.style.display = "none";
  choicesEl.style.display = "none";
  //startBtn.style.display = "block";
  // let hideQ = document.getElementById("questions");
  // hideQ.style.display = "none";

  let scoreDiv = document.createElement("div");
  let scoreH1El = document.createElement("h1");
  scoreH1El.innerHTML = "All done!";

  let scoreResult = document.createElement("p");
  scoreResult.textContent = `Your final score is ${score}`;

  let nameLabel = document.createElement("span");
  nameLabel.textContent = "Enter your initials: ";

  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id","nameId")


  scoreDiv.appendChild(scoreH1El);
  scoreDiv.appendChild(scoreResult);
  scoreDiv.appendChild(nameLabel);
  scoreDiv.appendChild(nameInput);
  scoreDiv.appendChild(submitScore);
  result.appendChild(scoreDiv);
}

// Function to save the score
function saveScore() {
  let initials = document.getElementById('nameId').value;
  
  let existingData = localStorage.getItem('highscore');
  let existing = existingData ? JSON.parse(existingData) : [];  
  let newData = {score:score, name:initials}
 
  
	// Add new data to localStorage Array
	existing.push(newData);
  
	// Save back to localStorage
  localStorage.setItem('highscore', JSON.stringify(existing));
  showHighScores();
}

//Function to show High Scores
function showHighScores(){
  let scoreH1El = document.createElement("h1");
  let scoreList = document.createElement("div");

  scoreH1El.textContent = 'High Score';

  highScoreEl.appendChild(scoreH1El);
  //highScoreEl.appendChild(scoreList);

  let existingData = localStorage.getItem('highscore');
  console.log(JSON.stringify(existingData));
//   !existingData ? '' : existingData.forEach(element => {
    
//   });
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", displayQuestions);
submitScore.addEventListener("click", saveScore);
