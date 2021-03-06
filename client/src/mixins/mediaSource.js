export default {
  methods: {
    isImageUrl(imageUrl) {
      // const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
      const url = new RegExp('https://');
      return url.test(imageUrl);
    },

    getImage(data) {
      if (this.isImageUrl(data.imageUrl)) {
        return data.imageUrl;
      }
      return `${process.env.VUE_APP_UPLOADS}${data.image.filename}`;
    },

    defaultExerciseImage(ev, data) {
      const sport = data && data.sport ? data.sport.toLowerCase() : 'boxing';
      const sportImage = require(`@/assets/img/exercise/${sport}.png`);
      ev.target.src = sportImage;
    },

    getSportImage(sport) {
      const sportImage = sport.toLowerCase();
      return require(`@/assets/img/sports/${sportImage}.png`);
    },

    setLoopInVideo(videoUrl) {
      const videoId = videoUrl.split('embed/')[1];
      return `${videoUrl}?version=3&loop=1&playlist=${videoId}`;
    }
  }
};
