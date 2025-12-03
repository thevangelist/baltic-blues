document.getElementById('mute').addEventListener('click', function (evt) {
  const audios = document.querySelectorAll('audio, audio *');
  audios.forEach(audio => {
    audio.muted = !audio.muted;
  });
});

// Pause/Resume toggle
document.getElementById('pause-toggle').addEventListener('click', function() {
  // Import isPaused from game.js via window object
  if (window.gameState) {
    window.gameState.isPaused = !window.gameState.isPaused;
    const pauseIcon = document.getElementById('pause-icon');
    const pauseOverlay = document.getElementById('pause-overlay');

    if (window.gameState.isPaused) {
      pauseIcon.textContent = '▶';
      pauseOverlay.classList.add('active');
      pauseOverlay.classList.remove('hidden');
    } else {
      pauseIcon.textContent = '⏸';
      pauseOverlay.classList.remove('active');
      pauseOverlay.classList.add('hidden');
    }
  }
});

// Fullscreen toggle
document.getElementById('fullscreen-toggle').addEventListener('click', function() {
  if (!document.fullscreenElement) {
    // Enter fullscreen
    document.documentElement.requestFullscreen().catch(err => {
      console.error('Error attempting to enable fullscreen:', err);
    });
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
});

// Update button text when fullscreen state changes
document.addEventListener('fullscreenchange', function() {
  const button = document.getElementById('fullscreen-toggle');
  if (document.fullscreenElement) {
    button.textContent = 'Exit Fullscreen';
    document.body.classList.add('fullscreen-mode');

    // Auto-start game if not already started
    const startScreen = document.getElementById('start');
    const playButton = document.getElementById('play');
    if (startScreen && startScreen.style.display !== 'none' && playButton) {
      playButton.click();
    }
  } else {
    button.textContent = 'Fullscreen';
    document.body.classList.remove('fullscreen-mode');
  }
});
