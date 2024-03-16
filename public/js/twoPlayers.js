function saveNamesAndStart() {
    const playerOneName = document.getElementById('playerOneName').value.trim();
    const playerTwoName = document.getElementById('playerTwoName').value.trim();
    const messageElement = document.getElementById('message');

    if (playerOneName === '' || playerTwoName === '') {
        messageElement.textContent = 'Please enter names for both players to start the game.';
        messageElement.style.display = 'block';
    } else {
        localStorage.setItem('playerOneName', playerOneName);
        localStorage.setItem('playerTwoName', playerTwoName);
    // Redirect to the quiz page for 2 players.
        window.location.href = 'GameOption.html'; // This page should handle both one and two player modes.
    }
}
