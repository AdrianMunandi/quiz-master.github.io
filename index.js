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

// Display quiz result and congratulations message
function showResult() {
  const resultElement = document.getElementById('result');
  const congratulationsElement = document.getElementById('congratulations');

  const scorePercentage = (score / totalQuestions) * 100;
  const resultText = `You answered ${score} out of ${totalQuestions} questions correctly. (${scorePercentage}%)`;

  resultElement.textContent = resultText;
  resultElement.style.display = 'block';

  congratulationsElement.textContent = getCongratulationsMessage(scorePercentage);
  congratulationsElement.style.display = 'block';
}

// Get congratulations message based on the score percentage
function getCongratulationsMessage(scorePercentage) {
  if (scorePercentage === 100) {
    return 'Congratulations! You scored a perfect 100%!';
  } else if (scorePercentage >= 70) {
    return 'Congratulations! You passed the quiz.';
  } else {
    return 'Good effort! Keep practicing to improve your score.';
  }
}

// Reset quiz and go back to the first question
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion(questions[currentQuestionIndex]);

  const resultElement = document.getElementById('result');
  const congratulationsElement = document.getElementById('congratulations');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');

  resultElement.style.display = 'none';
  congratulationsElement.style.display = 'none';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
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

