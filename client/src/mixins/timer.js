export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 12 // Múltiplo de 3 y 4 para el grid
      }
    };
  },

  methods: {
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
