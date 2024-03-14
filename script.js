document.addEventListener("DOMContentLoaded", function() {
    // Constants
    const operators = ["+", "-", "*"];
    const startBtn = document.getElementById("start-btn");
    const question = document.getElementById("question");
    const controls = document.querySelector(".controls-container");
    const result = document.getElementById("result");
    const timeTaken = document.getElementById("time-taken");
    const timeTakenValue = document.getElementById("time-taken-value");
    const submitBtn = document.getElementById("submit-btn");
    const errorMessage = document.getElementById("error-msg");
  
    // Variables
    let answerValue;
    let operatorQuestion;
    let startTime, endTime;
    let totalQuestions = 10;
    let currentQuestion = 0;
    let timerInterval;
    let score = 0; // New variable for score
  
    // Random Value Generator
    const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;
  
    // Question Generator
    const questionGenerator = () => {
        currentQuestion++;
        // Two random values between 1 and 20
        let [num1, num2] = [randomValue(1, 20), randomValue(1, 20)];
  
        // For getting random operator
        let randomOperator = operators[Math.floor(Math.random() * operators.length)];
  
        if (randomOperator == "-" && num2 > num1) {
            [num1, num2] = [num2, num1];
        }
  
        // Solve equation
        let solution = eval(`${num1}${randomOperator}${num2}`);
  
        // For placing the input at random position
        // (1 for num1, 2 for num2, 3 for operator, anything else(4) for solution)
        let randomVar = randomValue(1, 5);
  
        if (randomVar == 1) {
            answerValue = num1;
            question.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
        } else if (randomVar == 2) {
            answerValue = num2;
            question.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
        } else if (randomVar == 3) {
            answerValue = randomOperator;
            operatorQuestion = true;
            question.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
        } else {
            answerValue = solution;
            question.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
        }
    };
  
    // Update Timer Display
    const updateTimerDisplay = () => {
        let currentTime = new Date().getTime();
        let elapsedTime = (currentTime - startTime) / 1000;
        timeTakenValue.textContent = elapsedTime.toFixed(2);
    };
  
    // Start Game
    startBtn.addEventListener("click", () => {
        currentQuestion = 0;
        operatorQuestion = false;
        answerValue = "";
        errorMessage.innerHTML = "";
        errorMessage.classList.add("hide");
        startTime = new Date().getTime(); // Start time in milliseconds
        timerInterval = setInterval(updateTimerDisplay, 1000); // Update timer display every second
        // Controls and buttons visibility
        controls.classList.add("hide");
        startBtn.classList.add("hide");
        questionGenerator();
    });
  
    // Submit Answer
    submitBtn.addEventListener("click", () => {
        errorMessage.classList.add("hide");
        let userInput = document.getElementById("inputValue").value;
        // If user input is not empty
        if (userInput) {
            // If the user guessed correct answer
            if (userInput == answerValue) {
                score += 10; // Increment the score by 10
                if (currentQuestion === totalQuestions) {
                    stopGame(`Yippie!! <span>Correct</span> Answer. Your score is ${score}`);
                } else {
                    questionGenerator();
                }
            } else {
                if (currentQuestion === totalQuestions) {
                    stopGame("Move to the next question");
                } else {
                    questionGenerator();
                }
            }
        } else {
            errorMessage.classList.remove("hide");
            errorMessage.innerHTML = "Input Cannot Be Empty";
        }
        updateTimerDisplay(); // Call the function to update the timer display
    });
  
    // Stop Game
  const stopGame = (resultText) => {
    endTime = new Date().getTime(); // End time in milliseconds
    clearInterval(timerInterval); // Stop the timer interval
        let timeElapsed = (endTime - startTime) / 1000;
        result.innerHTML = resultText;
        timeTakenValue.textContent = timeElapsed.toFixed(2);
        timeTaken.classList.remove("hide");
        controls.classList.remove("hide");
        startBtn.classList.remove("hide");
        startBtn.textContent = "Next Game"; // Change button text to "Next Game"
        startBtn.addEventListener("click", () => { // Change button click event
        currentQuestion = 0;
        operatorQuestion = false;
        answerValue = "";
        errorMessage.innerHTML = "";
        errorMessage.classList.add("hide");
        startTime = new Date().getTime(); // Start time in milliseconds
        timerInterval = setInterval(updateTimerDisplay, 1000); // Update timer display every second
        // Controls and buttons visibility
        controls.classList.add("hide");
        startBtn.classList.add("hide");
        questionGenerator();
        updateTimerDisplay(); // Call the function to update the timer display
    });
};
});