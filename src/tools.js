document.getElementById('mute').addEventListener('click', function (evt) {
  const audios = document.querySelectorAll('audio, audio *');
  audios.forEach(audio => {
    audio.muted = !audio.muted;
  });
});
