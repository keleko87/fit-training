export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 12 // 12 -> Múltiplo de 3 y 4 para el grid
      }
    };
  },

  methods: {
    setTextTime(timeData) {
      if (timeData === 0) {
        return '-';
      }
      const timeSec = Math.ceil(timeData * 60);
      return timeData <= 1 ? `${timeSec} sec` : `${timeData} min`;
    },

    setTextReps(repsData) {
      return repsData === 0 ? 'Fallo' : repsData;
    },

    setTextSeriesXreps(seriesData, repsData) {
      return `${seriesData}x${repsData}`;
    }
  }
};
