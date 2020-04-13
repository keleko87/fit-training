import { WorkoutsService } from '../../common/api.service';
import workoutNewMock from '../../../static/mocks/workout-new.json';

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
    duration: '', // minutes
    restBetweenWorkout: '', // minutes
    sportImageUrl: '',
    creatorWorkoutId: '',
    exercises: [],
    musicList: []
  },
  totalWorkouts: []
};

const getters = {
  workout(state) {
    return state.data;
  },
  workoutExercises(state) {
    state.data.exercises;
  },
  totalWorkouts(state) {
    return state.totalWorkouts;
  },
  totalWorkoutsReversed() {
    return state.totalWorkouts.reverse();
  },
  workoutsCount(state) {
    return state.totalWorkouts.length;
  }
};

const actions = {
  async ['GET_WORKOUTS'](context) {
    try {
      const { data } = await WorkoutsService.getWorkouts();
      context.commit('SET_TOTAL_WORKOUTS', data);
      return data;
    } catch (error) {
      console.error('ERROR: ', error.message);
      // context.commit('SET_TOTAL_WORKOUTS', workoutsMock);
      // return workoutsMock;
    }
  },

  async ['GET_WORKOUT'](context, id) {
    try {
      const { data } = await WorkoutsService.getWorkout(id);
      context.commit('SET_WORKOUT', data);
    } catch (err) {
      window.console.log('error', err);
      context.commit('SET_WORKOUT', workoutNewMock);
    }
  },

  async ['SAVE_WORKOUT'](context, form) {
    try {
      await WorkoutsService.saveWorkout(form);
      context.commit('SET_WORKOUT', form);
    } catch (err) {
      window.console.log('error', err);
      context.commit('SET_WORKOUT', workoutNewMock);
      return workoutNewMock;
    }
  },

  ['ADD_WORKOUT_EXERCISE'](context, exercise) {
    context.commit('ADD_EXERCISE', exercise);
  }
};

const mutations = {
  ['SET_TOTAL_WORKOUTS'](state, workouts) {
    state.totalWorkouts = workouts;
  },
  ['SET_WORKOUT'](state, newWorkout) {
    state.data = Object.assign({}, state.data, newWorkout);
  },
  ['ADD_EXERCISE'](state, exercise) {
    state.data.exercises.push(exercise);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
