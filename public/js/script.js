document.getElementById('onePlayer').addEventListener('click', function() {
    localStorage.setItem('playerMode', '1');
    window.location.href = 'OnePlayer.html'; // Assuming this is your one player page.
});

document.getElementById('twoPlayers').addEventListener('click', function() {
    localStorage.setItem('playerMode', '2');
    window.location.href = 'twoPlayers.html'; // Assuming this is your two player page.
});

document.getElementById('customizedGame').addEventListener('click', function() {
    window.location.href = 'customized_game.html';
});

