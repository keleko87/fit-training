import { ExercisesService } from '../../common/api.service';

const state = {
  data: {
    name: '',
    sport: '',
    bodyPart: '',
    level: '',
    target: '',
    moveType: '',
    description: '',
    observations: '',
    time: null, // seconds
    rest: null, // seconds
    series: null, // number
    reps: null, // number
    image: {},
    imageUrl: '',
    videoUrl: '',
    isWarmUp: false
  },
  totalExercises: []
};

const getters = {
  exercise(state) {
    return state.data;
  },
  totalExercises(state) {
    return state.totalExercises;
  },
  totalExercisesReversed() {
    return state.totalExercises.reverse();
  },
  exercisesCount(state) {
    return state.totalExercises.length;
  }
};

const actions = {
  async ['GET_EXERCISES'](context) {
    const { data } = await ExercisesService.getExercises();
    context.commit('SET_TOTAL_EXERCISES', data);
    return data;
  },

  async ['GET_EXERCISE'](context, id) {
    const { data } = await ExercisesService.getExercise(id);
    context.commit('SET_EXERCISE', data);
  },

  async ['SAVE_EXERCISE'](context, form) {
    try {
      await ExercisesService.saveExercise(form);
      context.commit('SET_EXERCISE', form);
    } catch (err) {
      window.console.log('error', err);
      return err;
    }
  },

  ['REPLACE_IMAGE_URL'](context, { exercise }) {
    context.commit('SET_IMAGE_URL', exercise);
  }
};

const mutations = {
  ['SET_TOTAL_EXERCISES'](state, exercises) {
    state.totalExercises = exercises;
  },
  ['SET_EXERCISE'](state, newExercise) {
    state.data = Object.assign({}, state.data, newExercise);
  },
  ['SET_IMAGE_URL'](state, exercise) {
    state.data.content = exercise.content.replace(
      `blob:${process.env.VUE_APP_WEB}${exercise.image.filename}`,
      exercise.imageUrl
    );
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
