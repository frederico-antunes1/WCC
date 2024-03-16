document.addEventListener('DOMContentLoaded', function() {
    var audioElement = document.querySelector('audio');

    // Start the audio at the last known timestamp
    var lastTime = parseFloat(localStorage.getItem('audioTime')) || 0;
    audioElement.currentTime = lastTime;
    audioElement.play();

    // Save the current time of the audio before unloading the page
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('audioTime', audioElement.currentTime);
    });
    
    // Attempt to play music and respect the user's previous pause preference
    if (localStorage.getItem('musicPaused') !== 'true') {
        var playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Autoplay started!
            }).catch(error => {
                // Autoplay was prevented.
                console.log('Playback prevented');
            });
        }
    }

    // Event listener to toggle music playback
    var musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', function() {
            if (audioElement.paused) {
                audioElement.play();
                localStorage.setItem('musicPaused', 'false');
            } else {
                audioElement.pause();
                localStorage.setItem('musicPaused', 'true');
            }
        });
    }

    // If the user interacts with the document, try to play the music
    document.addEventListener('click', function() {
        if (audioElement.paused && localStorage.getItem('musicPaused') !== 'true') {
            audioElement.play();
        }
    });


    
});
