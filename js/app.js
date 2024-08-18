const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2
  },
  {
    question: "How many planets are in our solar system?",
    choices: ["7", "8", "9", "10"],
    correctAnswer: 1
  },
  {
    question: "What is the name of Earth's natural satellite?",
    choices: ["Sun", "Moon", "Mars", "Venus"],
    correctAnswer: 1
  },
  {
    question: "Which galaxy is the Milky Way's nearest neighbor?",
    choices: ["Andromeda", "Triangulum", "Centaurus A", "Messier 87"],
    correctAnswer: 0
  }
];


let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const landingPage = document.getElementById("landing-page");
const quizContainer = document.getElementById("quiz-container");
const finalScore = document.getElementById("final-score");
const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const finalScoreValue = document.getElementById("final-score-value");
const restartBtn = document.getElementById("restart-btn");


startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
restartBtn.addEventListener("click", restartQuiz);

function startQuiz() {
  landingPage.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const question = quizData[currentQuestion];
  questionEl.textContent = question.question;

  choicesEl.innerHTML = "";
  for (let i = 0; i < question.choices.length; i++) {
    const choice = question.choices[i];
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => selectChoice(i));
    choicesEl.appendChild(button);
  }

  submitBtn.style.display = "none";
  resultEl.textContent = "";
  timeLeft = 15;
  timerEl.textContent = timeLeft;
  clearInterval(timer);
  startTimer();
  updateProgressBar();
}

function selectChoice(index) {
  const buttons = choicesEl.getElementsByTagName("button");
  for (let button of buttons) {
    button.classList.remove("selected");
  }
  buttons[index].classList.add("selected");
  submitBtn.style.display = "block";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer();
    }
  }, 1000);
}

function checkAnswer() {
  clearInterval(timer);
  const selectedButton = choicesEl.querySelector(".selected");

  const selectedAnswer = selectedButton ? Array.from(choicesEl.children).indexOf(selectedButton) : -1;
  const question = quizData[currentQuestion];

  if (selectedAnswer === question.correctAnswer) {
    score++;
    resultEl.textContent = "Correct!";
  } else {
    resultEl.textContent = `Incorrect answer. The correct answer was: ${question.choices[question.correctAnswer]}`;
  }

  scoreEl.textContent = score;
  submitBtn.style.display = "none";

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    setTimeout(loadQuestion, 1000);
  } else {
    setTimeout(showFinalScore, 1000);
  }
}

function updateProgressBar() {
  const progress = (currentQuestion / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function showFinalScore() {
  quizContainer.style.display = "none";
  finalScore.style.display = "block";
  feedbackContainer.style.display = "block";
  finalScoreValue.textContent = `${score} out of ${quizData.length}`;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  finalScore.style.display = "none";
  feedbackContainer.style.display = "none";
  landingPage.style.display = "block";
}
