const container = document.getElementById('container')
const welcomeMessage = document.querySelector('.x')
const form = document.getElementById('form')
const finalScore = document.getElementById('final-score')
const startButton = document.getElementById('start-btn')
const answerMessage = document.getElementById('answer-message')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const highscores = document.getElementById('highscores')
const countdownEl = document.getElementById('countdown')
const input = document.getElementById('input')
const submitBtn = document.getElementById('submit-btn')
const highscoresList = document.getElementById('highscores-list')
let shuffledQuestions, currentQuestionIndex
let refreshIntervalID 
var score = localStorage.getItem('storedScore')
var initials = localStorage.getItem('initials')
var scoreTally = 0
var seconds
// End Global Variable List

// COUNTDOWN
function countdown(){
  if(seconds < 1){

    form.classList.remove('hide')
    container.classList.add('hide')
    clearInterval(refreshIntervalID)
    score.textContent = scoreTally
    countdownEl.classList.add('hide')
    // break;
    }; 
  countdownEl.innerHTML = "Time: " + seconds + " seconds"
  seconds--  
}
// BUTTON EVENT HANDLERS. Start Button and Next Button Event Listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


// START GAME
function startGame() {
  seconds = 100
  welcomeMessage.classList.add('hide')

// Hides start button. Shows highscores, timer, and first question
  startButton.classList.add('hide')
  countdownEl.classList.remove('hide')
  highscores.classList.remove('hide')
  questionContainerElement.classList.remove('hide')
// Starts timer interval
  refreshIntervalID = setInterval(countdown, 1000)
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  
  setNextQuestion()
}


// SET NEXT QUESTION. Runs in START GAME. Sets the Next Question in shuffeled questions
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}



// SHOW QUESTION. Runs in setNextQuestion which runs in START GAME. 
// Shows the question by referencing indexed shuffleQuestions array.
function showQuestion(question) {
    answerMessage.classList.add('hide')

  // Passes question from question array to questionElement to display on screen
  questionElement.innerText = question.question
  // Creates a button for each question  
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    // Passes each answer into a button
    button.innerText = answer.text
    // Adds class 'btn' to button (declared above) for purposes of styling
    button.classList.add('btn')
    
    //Checks if answer is correct. Adds data attribute of 'correct' onto button element.
    //This is simpler than passing a boolean for each answer
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    //Adds click eventListener and runs 'selectAnswer' on click
    button.addEventListener('click', selectAnswer)
    //Appends button into answerButtonElement which through html displays on screen
    answerButtonsElement.appendChild(button)
  })
}

//RESET STATE
function resetState() {
  //Adds 'hide' class to nextButton and answerMessage
  nextButton.classList.add('hide')
  answerMessage.textContent = " "
  //Removes all of the buttons from answerButtonElement
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}



  // SELECT ANSWER
  function selectAnswer(event) {
  // Creates variables for clicked button, and the boolean values for correct/incorrect answers
  const selectedButton = event.target
  const correct = selectedButton.dataset.correct
  answerMessage.classList.remove('hide')
  if (correct === undefined){
    seconds = seconds -15
    answerMessage.innerText = "Incorrect!"
    // seconds = seconds -15

  }
  if(correct){ 
    // Passes "Correct!" message to answerMessage element
    answerMessage.innerText = "Correct!"
  // Increases score tally by one  
    scoreTally++ 
    localStorage.setItem('storedScore', scoreTally)
  }

  //If there are questions left, show the 'next button'
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    
    //GAME OVER. 
  } else {
    clearInterval(refreshIntervalID)
    finalScore.innerHTML = scoreTally
    form.classList.remove('hide')
    container.classList.add('hide')
    startButton.classList.remove('hide')
  }
}

submitBtn.addEventListener("click", function submit () {
  localStorage.setItem("initials", input)
  console.log(initials)

})



const questions = [
  {
    question: 'What is an array?',
    answers: [
      { text: 'A variable that can have multiple values assigned to it', correct: true },
      { text: 'A method that produces random numbers', correct: false },
      { text: 'An object type that can only hold numbers', correct: false },
      { text: 'A collection of methods', correct: false }
    ]
  },
  {
    question: 'What is a local variable?',
    answers: [
      { text: 'A variable stored in local memory', correct: false },
      { text: 'A variable that can be used by any function', correct: false },
      { text: 'A variable declared within a function', correct: true },
      { text: 'A variable used only on methods', correct: false }
    ]
  },
  {
    question: 'What is the DOM?',
    answers: [
      { text: 'Default Order Model', correct: false },
      { text: 'Document Object Model', correct: true },
      { text: 'A type of local memory', correct: false },
      { text: 'Dynamic Operator Methods', correct: false }
    ]
  },
  {
    question: 'What is a function in Javascript?',
    answers: [
      { text: 'An element used to format code', correct: false },
      { text: 'A javascript file that modifies html', correct: true },
      { text: 'The same thing as an array', correct: true },
      { text: 'A block of Javascript code that robotically does the same thing again and again ', correct: true }
    ]
  },
  {
    question: 'What is a loop in Javascript?',
    answers: [
      { text: 'Loops can execute a block of code a number of times', correct: true },
      { text: 'A block of Javascript code that robotically does the same thing again and again ', correct: false },
      { text: 'Loops are used to store multiple values in a variable', correct: false },
      { text: 'Used to perform different actions based on different conditions', correct: false }
     
    ]
  }
]
