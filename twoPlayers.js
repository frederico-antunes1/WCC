function saveNamesAndStart() {
    const playerOneName = document.getElementById('playerOneName').value;
    const playerTwoName = document.getElementById('playerTwoName').value;
    localStorage.setItem('playerOneName', playerOneName);
    localStorage.setItem('playerTwoName', playerTwoName);
    // Redirect to the quiz page for 2 players.
    window.location.href = 'GameOption.html'; // This page should handle both one and two player modes.
}
