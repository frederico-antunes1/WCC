function saveSingleNameAndStart() {
    const SinglePlayerName = document.getElementById('SinglePlayerName').value.trim();
    const messageElement = document.getElementById('message');

    if (SinglePlayerName === '') {
        messageElement.textContent = `Please enter a player's name to start the game`;
        messageElement.style.display = 'block';
    } else {
        localStorage.setItem('playerOneName', SinglePlayerName);
    // Redirect to the quiz page for 2 players.
        window.location.href = 'GameOption_singlePlayer.html'; // This page should handle both one and two player modes.
    }
}
