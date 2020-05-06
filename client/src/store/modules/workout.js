import { WorkoutsService } from '../../common/api.service';
import workoutNewMock from '../../../static/mocks/workout-new.json';
import workoutsMock from '../../../static/mocks/workouts-all.json';

const state = {
  data: {
    name: '',
    sport: '',
    bodyPart: '',
    level: '',
    target: '',
    duration: '', // minutes
    restBetweenExercise: '', // minutes
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
      context.commit('SET_TOTAL_WORKOUTS', workoutsMock);
      return workoutsMock;
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

  ['SET_WORKOUT_DATA'](context, workout) {
    context.commit('SET_WORKOUT', workout);
  },

  ['RESET_WORKOUT_DATA'](context) {
    context.commit('RESET_WORKOUT');
  },

  ['ADD_WORKOUT_EXERCISE'](context, exercise) {
    context.commit('ADD_EXERCISE', exercise);
  },

  ['UPDATE_WORKOUT_EXERCISE'](context, exerciseUpdated) {
    context.commit('UPDATE_EXERCISES', exerciseUpdated);
  },

  ['DELETE_WORKOUT_EXERCISE'](context, exercise) {
    context.commit('DELETE_EXERCISE', exercise);
  }
};

const mutations = {
  ['SET_TOTAL_WORKOUTS'](state, workouts) {
    state.totalWorkouts = workouts;
  },
  ['SET_WORKOUT'](state, newWorkout) {
    state.data = Object.assign({}, state.data, newWorkout);
  },
  ['RESET_WORKOUT'](state) {
    const data = {
      name: '',
      sport: '',
      bodyPart: '',
      level: '',
      target: '',
      duration: '',
      restBetweenExercise: '',
      sportImageUrl: '',
      creatorWorkoutId: '',
      exercises: [],
      musicList: []
    };
    state.data = data;
    state.totalWorkouts = [];
  },
  ['ADD_EXERCISE'](state, exercise) {
    state.data.exercises.push(exercise);
  },
  ['MOVE_EXERCISE'](state, exerciseMoved) {
    const { oldIndex, newIndex, element } = exerciseMoved;
    state.data.exercises.splice(oldIndex, 1); // Remove the element in old position
    state.data.exercises.splice(newIndex, 0, element); // Add the element in new position
  },
  ['UPDATE_EXERCISES'](state, exerciseUpdated) {
    const exercises = state.data.exercises.map(exercise =>
      exercise.idGlobal === exerciseUpdated.idGlobal
        ? exerciseUpdated
        : exercise
    );
    state.data.exercises = exercises;
  },
  ['DELETE_EXERCISE'](state, exerciseIdGlobal) {
    const workoutExercises = state.data.exercises;
    state.data.exercises = workoutExercises.filter(
      workoutExercise => workoutExercise.idGlobal !== exerciseIdGlobal
    );
  },
  ['SET_EXERCISES'](state, exercises) {
    state.data.exercises = exercises;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
