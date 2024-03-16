
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let currentPlayer = 1;
    let questions = [];
    let countdown;
    let player1dict = {};

    const playerOneName = localStorage.getItem('playerOneName');
    const playerTwoName = localStorage.getItem('playerTwoName');
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const nextButton = document.getElementById('next');
    const resultsContainer = document.getElementById('results');
    const countdownElement = document.getElementById("countdown");
    const progressBar = document.getElementById("progress-bar-container");

    const categoryMap = {
        'General Knowledge': '9',
        'Books': '10',
        'Film': '11',
        'Music': '12',
        'Musicals & Theatres': '13',
        'Television': '14',
        'Video Games': '15',
        'Board Games': '16',
        'Science & Nature': '17',
        'Computers': '18',
        'Mathematics': '19',
        'Arts': '25',
        'History': '23',
        'Geography': '22',
        'Science': '17'
    };

    // Example of saving the selected category ID instead of name
    function selectCategory(categoryName) {
        const categoryId = categoryMap[categoryName];
        localStorage.setItem('category', categoryId);
    }

    
    function fetchQuestions() {
        let apiUrl = 'https://opentdb.com/api.php?amount=10&type=multiple';
        
        // Retrieve and log difficulty and category from localStorage
        const difficulty = localStorage.getItem('difficulty');
        const category = categoryMap[localStorage.getItem('category')]; 
        console.log('difficulty:', difficulty);
        console.log('category:', category);
        
        if (difficulty) {
            apiUrl += `&difficulty=${difficulty}`;
        }
        if (category) {
            apiUrl += `&category=${category}`;
        }
        
        console.log('Fetching questions with URL:', apiUrl); // Log the URL to be fetched
    
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                questions = data.results;
                if (questions.length > 0) {
                    displayQuestion();
                    startTimer();
                } else {
                    console.error('No questions were returned from the API.');
                    resultsContainer.textContent = 'No questions available for the selected category and difficulty.';
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                resultsContainer.textContent = 'Failed to load questions. Please check your internet connection and try again.';
            });
    }
    
    // funtion to shuffle the answers
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function displayQuestion() {
    
        let currentQuestion = questions[currentQuestionIndex];
        document.getElementById('player-name').textContent = `${currentPlayer === 1 ? playerOneName : playerTwoName}'s turn`;
        //questionContainer.textContent = `Player ${currentPlayer}'s turn - ` + decodeHTMLEntities(currentQuestion.question);
        questionContainer.textContent = `Player ${currentPlayer === 1 ? playerOneName : playerTwoName}'s turn - ` + decodeHTMLEntities(currentQuestion.question);
            
        optionsContainer.innerHTML = '';
        const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        const randomizedOptions = shuffleArray(options.map(decodeHTMLEntities)); 
        randomizedOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(option));
            optionsContainer.appendChild(optionElement);
        });
    }

    function selectOption(selectedOption) {
        const options = document.querySelectorAll('.option');
        let correctAnswer = questions[currentQuestionIndex].correct_answer;
        stopTimer();
        
        if (selectedOption === correctAnswer) {
            if (currentPlayer === 1) {
                playerOneScore++;
            } else {
                playerTwoScore++;
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
                displayQuestion(); // Move to the next question after a delay
            }, 2000); // Set a delay for 2 seconds before moving on to the next question
        } else {   
            stopTimer();
            setTimeout(showResults, 2000); // Show results after a delay if it's the last question
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
    function startTimer() {
        clearInterval(countdown);
        let timeLeft = 10;
        let intervalDuration = 1000;
        countdown = setInterval(function() {
            if (countdownElement) {
                countdownElement.textContent = timeLeft;
            }

            const progress = (1-timeLeft/10)*100;

            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            timeLeft--;

            if (progress >= 80) {
                progressBar.style.backgroundColor = '#dc3545';
            } else {
                progressBar.style.backgroundColor = '#4caf50';
            }
            if (progress >= 100) {
                startTimer(); // Clear the timer before moving to the next question
                setTimeout(() => {
                    currentQuestionIndex++;
                    currentPlayer = 3 - currentPlayer;
                    displayQuestion();
                }, 1000);
            }
        }, intervalDuration)
    }

    
    function stopTimer() {
        clearInterval(countdown);
    }
    

    function showResults() {
        questionContainer.style.display = 'none';
        optionsContainer.style.display = 'none';
        nextButton.style.display = 'none';

        let winner = '';
        if (playerOneScore > playerTwoScore) {
            winner = `${playerOneName} wins!`;
        } else if (playerOneScore < playerTwoScore) {
            winner = `${playerTwoName} wins!`
        }
        let playAgainButton = `<button onclick="location.href='twoPlayers.html'">Play Again</button>`;
        resultsContainer.innerHTML = `
            <p>${playerOneName}'s score: ${playerOneScore}</p>
            <p>${playerTwoName}'s score: ${playerTwoScore}</p>
            <p>${winner}</p>
            ${playAgainButton}
            <a href="index.html"><button>Go Home</button></a>
        `;
        // Clear the difficulty and category from localStorage
        localStorage.removeItem('difficulty');
        localStorage.removeItem('category');
        localStorage.setItem('playerOneScore', playerOneScore);
        localStorage.setItem('playerTwoScore', playerTwoScore);
        localStorage.setItem('playerOneName', playerOneName);
        localStorage.setItem('playerTwoName', playerTwoName);
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        displayQuestion();
    });

    fetchQuestions();

    function decodeHTMLEntities(text) {
        var textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
    }
    
});
