var questions = [];
        var currentQuestion = 0;
        var totalQuestions = 10; 
        var score = 0;
        var startTime;
        var timerInterval;

        function generateQuestion() {
            var num1 = Math.floor(Math.random() * 10) + 1;
            var num2 = Math.floor(Math.random() * 10) + 1;
            var operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
            var questionString = num1 + ' ' + operator + ' ' + num2;
            var answer = eval(questionString).toFixed(2);
            questions.push({question: questionString, answer: answer});
        }

        function startGame() {
            generateQuestions();
            displayQuestion();
            startTime = new Date();
            updateTimerDisplay();
            timerInterval = setInterval(updateTimerDisplay, 1000); 
        }

        function generateQuestions() {
            for (var i = 0; i < totalQuestions; i++) {
                generateQuestion();
            }
        }

        function displayQuestion() {
            if (currentQuestion < totalQuestions) {
                document.getElementById('question').textContent = questions[currentQuestion].question;
                document.getElementById('answer').value = '';
                document.getElementById('result').textContent = '';
                document.getElementById('answer').focus();
            } else {
                clearInterval(timerInterval); 
                endGame();
            }
        }

        function checkAnswer() {
            var userAnswer = parseFloat(document.getElementById('answer').value);
            var correctAnswer = parseFloat(questions[currentQuestion].answer);
            if (userAnswer === correctAnswer) {
                document.getElementById('result').textContent = 'Correct!';
                score += 10;
            } else {
                document.getElementById('result').textContent = 'Incorrect! Correct Answer: ' + correctAnswer;
            }
            document.getElementById('score').textContent = 'Score: ' + score;
            currentQuestion++;
            displayQuestion();
        }

        function endGame() {
            var endTime = new Date();
            var timeDiff = endTime - startTime; 
            var seconds = Math.floor(timeDiff / 1000);
            var minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            document.getElementById('question').textContent = 'GOOD JOB';
            document.getElementById('answer').style.display = '';
            document.getElementById('result').style.display = 'none';
            document.getElementById('score').textContent = 'Final Score: ' + score;
            document.getElementById('timer').textContent = 'Time Taken: ' + minutes + 'm ' + seconds + 's';
            document.getElementById('restart').style.display = 'block';
        }

        function updateTimerDisplay() {
            var currentTime = new Date();
            var timeDiff = currentTime - startTime; 
            var seconds = Math.floor(timeDiff / 1000);
            var minutes = Math.floor(seconds / 60);
            seconds = seconds % 60;
            document.getElementById('timer').textContent = 'Time Elapsed: ' + minutes + 'm ' + seconds + 's';
        }

        
        document.getElementById("answer").addEventListener("keypress", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                checkAnswer();
            }
        });

        
        document.getElementById("answer").addEventListener("input", function(event) {
            if (event.target.value.length >= 5) { 
                checkAnswer();
            }
        });