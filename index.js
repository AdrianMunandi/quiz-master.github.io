// index.js

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
      optionLabelElement.textContent = question.options[index];
    });
  }

  // Submit quiz answers
  function submitAnswers() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
      const selectedAnswerIndex = parseInt(selectedOption.value);
      const currentQuestion = questions[currentQuestionIndex];
      if (selectedAnswerIndex === currentQuestion.correctAnswer) {
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
    })
    .catch(error => console.error('Error fetching quiz questions:', error));

  // Event listener for submit button
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', submitAnswers);
