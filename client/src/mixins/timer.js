export default {
  data() {
    return {
      audioFinish: null,
      audioInit: null,
      audioInitSource: 'countdown-10-second',
      audioFinishSource: 'boxing-bell'
    };
  },

  methods: {
    getAudioSource(name) {
      return require(`@/assets/audio/${name}.mp3`);
    },

    setTextTime(timeData) {
      if (!timeData || timeData === 0) {
        return '-';
      }
      const timeSec = Math.ceil(timeData * 60);
      return timeData <= 1 ? `${timeSec}s` : `${timeData}m`;
    },

    setTextReps(repsData) {
      if (repsData === null) {
        return '-';
      }
      return repsData == 0 ? 'fallo' : repsData;
    },

    setTextSeriesXreps(seriesData, repsData) {
      return `${seriesData}x${repsData}`;
    }
  }
};
