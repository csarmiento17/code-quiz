let containerEl = document.querySelector("#container");
let mainContentEl = document.querySelector("#main-content");
let welcomeEl = document.querySelector("#welcome-screen");
let questionsEl = document.querySelector("#questions");
let choicesEl = document.querySelector("#choices");
let answerEl = document.querySelector("#answer");
let btnTimer = document.querySelector("#start-timer");
let result = document.querySelector("#results");
let highScoreEl = document.querySelector("#highscore");
let displayHighScoreEl = document.querySelector("#display-highscore");
let timerEl = document.querySelector("#timer");

let startBtn = document.createElement("button");
startBtn.innerHTML = "Start Quiz";
startBtn.type = "button";
startBtn.name = "startBtn";
startBtn.style.textAlign = "center";
btnTimer.appendChild(startBtn);

function displayMainScreen() {
  console.log("displayMainScreen called");
  let welcomeScreen = document.createElement("h1");
  welcomeScreen.textContent = "Coding Quiz Challenge";

  let descriptionScreen = document.createElement("p");
  descriptionScreen.textContent = `Try to answer the following code-related questions within the time
  limit. Keep in mind that incorrect answers will penalize your score
  time by tem seconds!`;

  welcomeEl.appendChild(welcomeScreen);
  welcomeEl.appendChild(descriptionScreen);
}

let submitScore = document.createElement("button");
submitScore.textContent = "Submit";

let goBack = document.createElement("button");
goBack.textContent = "Go Back";
goBack.className = "btn edit-btn";
goBack.setAttribute("id", "goback");

let clearScore = document.createElement("button");
clearScore.textContent = "Clear High Scores";
clearScore.className = "btn edit-btn";
clearScore.setAttribute("id", "clearscore");

displayMainScreen();

// Declaration of Questions
const questionsObj = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: { 1: "alerts", 2: "booleans", 3: "numbers", 4: "strings" },
    answer: "1",
  },
  // {
  //   question: "The condition in an if / else statement in enclosed with _____.",
  //   choices: {
  //     1: "quotes",
  //     2: "curly brackets",
  //     3: "parentheses",
  //     4: "square brackets",
  //   },
  //   answer: "3",
  // },
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
let timer;

// This function starts the timer countdown
function startTimer() {
  timer = setInterval(() => {
    totalTime -= 1;
    timerEl.innerHTML = `Time: ${totalTime}`;
    score = totalTime;
    if (totalTime < 1) {
      clearInterval(timer);
      showScore();
      score = totalTime;
    }
  }, 1000);
}

// This function displays all the questions
function displayQuestions() {
  //hide Start button
  startBtn.style.display = "none";

  // variable to store the Questions output
  const output = [];

  // variable to store the list of choices
  const choices = [];

  let question = questionsObj[questionsCtr];

  for (choice in question.choices) {
    choices.push(
      `<div>
          <button name="question${questionsCtr}" onclick='checkAnswer(${choice})'>${choice} ${question.choices[choice]}</button>           
        </div>
        `
    );
  }
  // add this question and its answers to the output
  output.push(
    `   <div id="questions"> ${question.question} </div>
        <div id="choices"> ${choices.join("")} </div>
      `
  );

  // finally combine our output list into one string of HTML and put it on the page
  mainContentEl.innerHTML = output.join("");
}

function checkAnswer(answer) {
  if (answer === parseInt(questionsObj[questionsCtr].answer)) {
    displayResult("CORRECT");
  } else {
    displayResult("WRONG");
    totalTime -= 10;
    score = totalTime;
    timerEl.innerHTML = `Time: ${totalTime}`;
  }

  if (questionsCtr < lastQuestion) {
    questionsCtr++;
    displayQuestions();
  } else {
    clearTimeout(timer);
    showScore(score);
  }
}

function displayResult(ans) {
  console.log("Display result " + ans);
  answerEl.innerHTML = ans;
  setInterval(() => {
    answerEl.innerHTML = "";
  }, 1000);
  containerEl.appendChild(answerEl);
}

function showScore(score) {
  document.getElementById("questions").style.display = "none";
  document.getElementById("choices").style.display = "none";

  let scoreDiv = document.createElement("div");
  let scoreH1El = document.createElement("h1");
  scoreH1El.innerHTML = "All done!";

  let scoreResult = document.createElement("p");
  scoreResult.textContent = `Your final score is ${score}`;

  let nameLabel = document.createElement("span");
  nameLabel.textContent = "Enter your initials: ";

  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "nameId");

  scoreDiv.appendChild(scoreH1El);
  scoreDiv.appendChild(scoreResult);
  scoreDiv.appendChild(nameLabel);
  scoreDiv.appendChild(nameInput);
  scoreDiv.appendChild(submitScore);
  result.appendChild(scoreDiv);
  containerEl.appendChild(result);
}

// Function to save the score to local storage
function saveScore() {
  let initials = document.getElementById("nameId").value;

  let existingData = localStorage.getItem("highscore");
  //console.log(JSON.parse(existingData));
  let existing = existingData ? JSON.parse(existingData) : [];
  let newData = { score: score, name: initials };

  // Add new data to localStorage Array
  existing.push(newData);

  // Save back to localStorage
  localStorage.setItem("highscore", JSON.stringify(existing));
  showHighScores();
}

function clearHighScore() {
  localStorage.setItem("highscore", []);
  showHighScores();
}
//Function to show High Scores
function showHighScores() {
  // Hide result div
  result.style.display = "none";

  let output = [];
  let scoreH1El = document.createElement("h1");
  let scoreList = document.createElement("div");
  let tempList = [];
  scoreH1El.textContent = "High Score";
  highScoreEl.appendChild(scoreH1El);
  highScoreEl.appendChild(scoreList);

  let scores = JSON.parse(localStorage.getItem("highscore"));

  for (list in scores) {
    //console.log(scores[list].name);
    // tempList.push(`
    //   <div>${parseInt(list) + 1}. ${scores[list].name} - ${
    //   scores[list].score
    // }</div>
    // `);
  }
  console.log(tempList);
  //tempList.sort((a, b) => a.score - b.score);
  highScoreEl.innerHTML = tempList.join("");

  // Create Go Back button
  let goBack = document.createElement("button");
  goBack.textContent = "Go Back";
  goBack.className = "btn edit-btn";
  goBack.setAttribute("id", "goback");
  //goBack.setAttribute("click", "displayMainScreen");

  highScoreEl.appendChild(goBack);

  highScoreEl.appendChild(clearScore);
  //highScoreEl.appendChild(scoreList);
  mainContentEl.appendChild(highScoreEl);
}

// Event Listeners
startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", displayQuestions);
submitScore.addEventListener("click", saveScore);
clearScore.addEventListener("click", clearHighScore);
goBack.addEventListener("click", displayMainScreen);
