document.addEventListener('DOMContentLoaded', function() {
    let currentQuestionIndex = 0;
    let score = 0
    let questions = [];
    let countdown;

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
                startTimer();  
            })
            .catch(error => console.error('Error fetching data: ', error));
    }

    // Display the current question
    function displayQuestion() {

        if (currentQuestionIndex < questions.length) {
            let currentQuestion = questions[currentQuestionIndex];
            questionContainer.textContent = decodeHTMLEntities(currentQuestion.question);
            
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

        stopTimer();

        const options = document.querySelectorAll('.option');
        let correctAnswer = questions[currentQuestionIndex].correct_answer;
        
        if (selectedOption === correctAnswer) {
            stopTimer();
            score++
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
                    displayQuestion();
                }, 1000);
            }
        }, intervalDuration)
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

        resultsContainer.textContent = `Quiz Completed! Your score is: ${score} out of ${questions.length}`;
        
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