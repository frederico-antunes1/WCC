document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let currentPlayer = 1;
    let questions = [];
    let countdown;
    let playerOneQuestionNumber = 0;
    let playerTwoQuestionNumber = 0;
    let player1dict = {};
    let player2dict = {};
    const playerOneName = localStorage.getItem('playerOneName');
    const playerTwoName = localStorage.getItem('playerTwoName');
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const nextButton = document.getElementById('next');
    const resultsContainer = document.getElementById('results');
    const countdownElement = document.getElementById("countdown");
    const progressBar = document.getElementById("progress-bar-container");
    

    // Fetch questions from the API
    function fetchQuestions() {
        fetch('https://opentdb.com/api.php?amount=10&type=multiple')
            .then(response => response.json())
            .then(data => {
                questions = data.results;
                displayQuestion();
                startTimer();  // Start the timer when the questions are fetched
            })
            .catch(error => console.error('Error fetching data: ', error));
    }

    // Display the current question
    function displayQuestion() {


        if (currentPlayer === 1) {
            playerOneQuestionNumber++;
        } else {
            playerTwoQuestionNumber++;
        }
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundColor = '#282c34';


        if (currentQuestionIndex < questions.length) {
            let currentQuestion = questions[currentQuestionIndex];
            questionContainer.textContent = `Player ${currentPlayer === 1 ? playerOneName : playerTwoName}'s turn - ` + decodeHTMLEntities(currentQuestion.question);
            
            optionsContainer.innerHTML = '';
            const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].map(decodeHTMLEntities);
            options.forEach(option => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                optionElement.textContent = option;
                optionElement.addEventListener('click', () => selectOption(option));
                optionsContainer.appendChild(optionElement);
            });
        } else {
            showResults();
        }
    }

    // Handle option selection
    function selectOption(selectedOption) {

        stopTimer(); // Clear the timer before moving to the next question

        const options = document.querySelectorAll('.option');
        let correctAnswer = questions[currentQuestionIndex].correct_answer;
        
        if (selectedOption === correctAnswer) {
            if (currentPlayer === 1) {
                playerOneScore++;
                if (player1dict[questions[currentQuestionIndex].category] === undefined) {
                    player1dict[questions[currentQuestionIndex].category] = 1;
                }
                else {
                    player1dict[questions[currentQuestionIndex].category] += 1;
                }
            } else {
                playerTwoScore++;
                if (player2dict[questions[currentQuestionIndex].category] === undefined) {
                    player2dict[questions[currentQuestionIndex].category] = 1;
                }
                else {
                    player2dict[questions[currentQuestionIndex].category] += 1;
                }
            }
        }
        
        options.forEach(option => {
            if (option.textContent === correctAnswer) {
                option.classList.add('correct'); // Add the 'correct' class if it's the correct answer
            }
            if (option.textContent === selectedOption) {
                option.classList.add(selectedOption === correctAnswer ? 'correct' : 'incorrect'); // Add 'correct' or 'incorrect' class based on the user's choice
            }
            option.removeEventListener('click', selectOption); // Remove the click event listener to prevent further selections
        });
        
        if (currentQuestionIndex < questions.length - 1) {
            startTimer();
            setTimeout(() => {
                currentQuestionIndex++;
                currentPlayer = 3 - currentPlayer; // Toggle between player 1 (1) and player 2 (2)
                displayQuestion(); // Move to the next question after a delay
                 // Start the timer before moving to the next questio
            }, 2000); // Set a delay for 2 seconds before moving on to the next question
        } else {
            stopTimer();
            setTimeout(showResults, 2000); // Show results after a delay if it's the last question
        }
    }

    function startTimer() {
        clearInterval(countdown);
        let timeLeft = 10;
        let intervalDuration = 1000;
        countdown = setInterval(function() {
            if (countdownElement) {
                countdownElement.textContent = timeLeft;
            }
    
            const progress = (1 - timeLeft / 10) * 100;
    
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            timeLeft--;
    
            if (timeLeft <= 2) {
                progressBar.style.backgroundColor = '#dc3545';
            } else {
                progressBar.style.backgroundColor = '#4caf50';
            }
            if (progress >= 100) {
                clearInterval(countdown);
                setTimeout(() => {
                    currentQuestionIndex++;
                    currentPlayer = 3 - currentPlayer;
                    startTimer();
                    displayQuestion()
                }, 1000);
            }
        }, intervalDuration);
    }
    

    function resertTimer() {
        clearInterval(countdown);
        startTimer();
    }

    function stopTimer() {
        clearInterval(countdown);
    }

    // Show the quiz results
    function showResults() {
        questionContainer.style.display = 'none';
        optionsContainer.style.display = 'none';
        nextButton.style.display = 'none';
        if (progressBar) {
            progressBar.style.display = 'none'; // Hide the progress bar
        }

        let winner = '';
        if (playerOneScore > playerTwoScore) {
            winner = `${playerOneName} wins!`;
        } else if (playerOneScore < playerTwoScore) {
            winner = `${playerTwoName} wins!`;
        } else {
            winner = "It's a tie!";
        }

        localStorage.setItem('playerOneScore', playerOneScore);
        localStorage.setItem('playerTwoScore', playerTwoScore);
        localStorage.setItem('playerOneName', playerOneName);
        localStorage.setItem('playerTwoName', playerTwoName);
        localStorage.setItem('player1dict', JSON.stringify(player1dict));
        localStorage.setItem('player2dict', JSON.stringify(player2dict));

        resultsContainer.innerHTML = `
            <p>${playerOneName}'s score: ${playerOneScore}</p>
            <p>${playerTwoName}'s score: ${playerTwoScore}</p>
            <p>${winner}</p>
            <a href="index.html"><button>Go Home</button></a>
        `;
    }

    // Decode HTML entities
    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }

    // Initialize the quiz
    fetchQuestions();
});
