const quizData = [
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Saturn", "Jupiter", "Mars"],
    correctAnswer: 3
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 2
  },
  {
    question: "What is the name of Earth's natural satellite?",
    choices: ["Sun", "Moon", "Mars", "Venus"],
    correctAnswer: 1
  },
  {
    question: "How many planets are in our solar system?",
    choices: ["7", "9", "8", "10"],
    correctAnswer: 2
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
feedbackContainer = document.getElementById("feedback-container");
const feedbackText = document.getElementById("feedback-text");
const ratingStars = document.querySelectorAll(".rating-star");
const submitFeedbackBtn = document.getElementById("submit-feedback-btn");


startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", checkAnswer);
restartBtn.addEventListener("click", restartQuiz);
ratingStars.forEach(star => {
  star.addEventListener("click", () => setRating(star.dataset.rating));
});
submitFeedbackBtn.addEventListener("click", submitFeedback);


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

function setRating(rating) {
  ratingStars.forEach(star => {
    star.classList.toggle("active", star.dataset.rating <= rating);
  });
}

function submitFeedback() {
  const rating = document.querySelectorAll(".rating-star.active").length;
  const feedback = feedbackText.value;

  console.log("Feedback submitted:", { rating, feedback });

  feedbackText.value = "";
  ratingStars.forEach(star => star.classList.remove("active"));

  feedbackContainer.style.display = "none";

  alert("Thank you for your feedback!");
}
