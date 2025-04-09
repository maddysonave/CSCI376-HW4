// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Scripts", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false }
    ]
  },
  {
    question: "In which movie did Jodie Foster play a young FBI trainee named Clarice Starling??",
    answers: [
      { text: "Panic Room", correct: false },
      { text: "Flightplan", correct: false },
      { text: "The Silence of the Lambs", correct: true },
      { text: "Contact", correct: false }
    ]
  }
];

// 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
// We want to find an HTML element with matching HTML id attributes, which are specified in the body of index.html
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const hintButton = document.getElementById("hint-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
    // The JavaScript code allows for the creation of buttons based on quiz data. This dynamic coding makes it easier for us to 
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    // 4. What is the line below doing? 
    // Adds each new answer button created to the page
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "block";
  answerButtonsElement.innerHTML = "";
  hintButton.disabled = false;
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
  // This makes sure that the button actually shows up on the screen. If there was no "block" then the button might stay invisible
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Restart";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

hintButton.addEventListener("click", () => { 
  const answerButtons = document.querySelectorAll("#answer-buttons .btn");
  const incorrectAnswers = [];

  answerButtons.forEach(button => {
    if (button.dataset.correct !== "true") {
      incorrectAnswers.push(button);
    }
  });

  if (incorrectAnswers.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
    const wrongButton = incorrectAnswers[randomIndex];
    wrongButton.style.backgroundColor = "red"; // Highlight wrong answer
    wrongButton.disabled = true; // (Optional) Make it unclickable
  }

  hintButton.disabled = true; // Only allow one hint per question
});

// 6. Summarize in your own words what you think this block of code is doing. 
// This block of code listens for a click on the "next" button. When the button is clicked, it checks if there are still more questions left in the quiz. If there are, it moves to the next question by calling handleNextButton(). If there are no more questions (meaning the user finished the quiz), it restarts the quiz by calling startQuiz().
nextButton.addEventListener("click", () => { 
  if (currentQuestionIndex < questions.length) {
    handleNextButton();

  } else {
    startQuiz();
  }
});

startQuiz();




