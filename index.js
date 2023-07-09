// Fetch questions from the server
function fetchQuestions() {
  return fetch('db.json')
    .then(response => response.json())
    .then(data => data.questions);
}

// Display question and options
function displayQuestion(question) {
  const questionTextElement = document.getElementById('questions');
  const optionsListElement = document.querySelector('ul');

  questionTextElement.textContent = question.question;

  const options = ['a', 'b', 'c', 'd'];

  options.forEach((option, index) => {
    const optionInputElement = document.getElementById(option);
    const optionLabelElement = document.getElementById(`${option}_text`);
    optionInputElement.checked = false;
    optionLabelElement.textContent = question.answers[option];
  });
}

// Submit quiz answers
function submitAnswers() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    const selectedAnswerId = selectedOption.id;
    const selectedAnswer = selectedAnswerId.charAt(selectedAnswerId.length - 1);
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct) {
      score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
      displayQuestion(questions[currentQuestionIndex]);
    } else {
      showResult();
    }
  }
}

// Display quiz result
function showResult() {
  const resultElement = document.getElementById('result');
  resultElement.textContent = `You answered ${score} out of ${totalQuestions} questions correctly.`;
  resultElement.style.display = 'block';
}

// Fetch questions and start the quiz
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = 0;

fetchQuestions()
  .then(data => {
    questions = data;
    totalQuestions = questions.length;
    displayQuestion(questions[currentQuestionIndex]);
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', submitAnswers);
  })
  .catch(error => console.error('Error fetching quiz questions:', error));

