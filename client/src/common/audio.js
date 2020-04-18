export const AudioPlayer = {
  createAudio: audioSrc => {
    let audio = new Audio(audioSrc);
    // audio.loop = true;
    return audio;
  },

  playAlarm: (mute, audio) => {
    if (!mute && audio !== null) {
      let playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(success => {
            return success;
          })
          .catch(error => {
            return error;
          });
      }
    }
  },

  stopAlarm: audio => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
};
