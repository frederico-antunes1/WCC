document.addEventListener('DOMContentLoaded', function() {
    // Retrieve user scores from local storage
    let player1Score = localStorage.getItem('playerOneScore')
    let player2Score = localStorage.getItem('playerTwoScore')
    let player1name = localStorage.getItem('playerOneName')
    let player2name = localStorage.getItem('playerTwoName')

    // Initialize arrays to store usernames and scores
    const usernames = [];
    const scores = [];
    
    usernames.push(player1name)
    usernames.push(player2name)
    scores.push(player1Score)
    scores.push(player2Score)

    // Initialize data for the chart
    const data = {
        labels: usernames, // X-axis labels (user names)
        datasets: [{
            label: 'Scores', // Dataset label
            backgroundColor: 'dodgerblue', // Bar color
            data: scores, // Scores data
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar', // Bar chart type
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true // Start y-axis at 0
                }
            }
        },
    };

    // Create the chart
    const myChart = new Chart(
        document.getElementById('myChart'), // Canvas element
        config
    );

    // Add event listener to the clearLocalStorage button
    document.getElementById('clearLocalStorage').addEventListener('click', function() {
        localStorage.clear(); // Clear localStorage data
        alert('Scores data has been cleared.'); // Display alert message
        location.reload()
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve user dictionaries from local storage
    let player1name = localStorage.getItem('playerOneName');
    let player2name = localStorage.getItem('playerTwoName');

    let storedDictionary1 = JSON.parse(localStorage.getItem('player1dict'));
    let storedDictionary2 = JSON.parse(localStorage.getItem('player2dict'));

    // Initialize arrays to store category percentages
    const categoryPercentages = {};

    // Calculate total scores for each player
    let totalScore1 = 0;
    for (let category in storedDictionary1) {
        totalScore1 += storedDictionary1[category];
    }

    let totalScore2 = 0;
    for (let category in storedDictionary2) {
        totalScore2 += storedDictionary2[category];
    }

    // Calculate percentage of correct answers for each player in each category
    for (let category in storedDictionary1) {
        if (!categoryPercentages[category]) {
            categoryPercentages[category] = {};
        }
        categoryPercentages[category][player1name] = ((storedDictionary1[category] / totalScore1) * 100).toFixed(2); //round to 2 decimal cases for better readability
    }

    for (let category in storedDictionary2) {
        if (!categoryPercentages[category]) {
            categoryPercentages[category] = {};
        }
        categoryPercentages[category][player2name] = (storedDictionary2[category] / totalScore2) * 100;
    }
    if (player1name == null){
        player1name = "No player registered"
    }

    if (player2name == null){
        player2name = "No player registered"
    }

    // Initialize data for the chart
    const data = {  
        labels: Object.keys(categoryPercentages), // X-axis labels (category names)
        datasets: [{
            label: player1name, // Dataset label for player 1
            backgroundColor: 'dodgerblue', // Bar color
            data: Object.keys(categoryPercentages).map(category => categoryPercentages[category][player1name]), // Percentage data for player 1
        },
        {
            label: player2name, // Dataset label for player 2
            backgroundColor: 'orange', // Bar color
            data: Object.keys(categoryPercentages).map(category => categoryPercentages[category][player2name]), // Percentage data for player 2
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar', // Bar chart type
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true, // Start y-axis at 0
                    title: {
                        display: true,
                        text: 'Percentage'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Category'
                    }
                }
            }
        },
    };

    // Create the second chart
    const myChart = new Chart(
        document.getElementById('myChart2'), // Canvas element
        config
    );

    // Add event listener to the clearLocalStorage button
    document.getElementById('clearLocalStorage').addEventListener('click', function() {
        localStorage.clear(); // Clear localStorage data
        alert('Scores data has been cleared.'); // Display alert message
        location.reload()
    });
});