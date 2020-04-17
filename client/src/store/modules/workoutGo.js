import { WorkoutGoService } from '../../common/api.service';
// import workoutGoMock from '../../../static/mocks/workout-go.json';

const state = {
  userId: '',
  startDate: '',
  endDate: '',
  timer: {
    workout: {
      series: 0,
      restBetweenExercise: 0
    },
    workoutExercises: [
      {
        exerciseIdGlobal: '',
        exerciseTime: 0,
        exerciseRest: 0
      }
    ]
  }
};

const getters = {
  timer(state) {
    return state.timer;
  },
  timerExercises(state) {
    state.timer.workoutExercise;
  },
  timerWorkout(state) {
    return state.timer.workout;
  }
};

const actions = {
  ['SET_WORKOUT_GO_DATA'](context, { userId, workout, workoutExercises }) {
    context.commit('SET_USER_WORKOUT', userId);
    context.commit('SET_TIMER_WORKOUT', workout);
    context.commit('SET_TIMER_WORKOUT_EXERCISES', workoutExercises);
  },
  ['START_WORKOUT'](context, startDate) {
    context.commit('SET_START_DATE', startDate);
  },
  ['END_WORKOUT'](context, endDate) {
    context.commit('SET_END_DATE', endDate);
  },

  async ['SAVE_WORKOUT_GO'](context, form) {
    try {
      const res = await WorkoutGoService.saveWorkoutGo(form);
      return res;
    } catch (err) {
      window.console.log('error', err);
      return err;
    }
  }
};

const mutations = {
  ['SET_USER_WORKOUT'](state, userId) {
    state.userId = userId;
  },
  ['SET_START_DATE'](state, date) {
    state.startDate = date;
  },
  ['SET_END_DATE'](state, date) {
    state.endDate = date;
  },
  ['SET_TIMER_WORKOUT'](state, workout) {
    state.timer.workout = workout;
  },
  ['SET_TIMER_WORKOUT_EXERCISES'](state, workoutExercises) {
    state.timer.workoutExercises = [...workoutExercises];
  },
  ['RESET_TIMER_WORKOUT'](state) {
    const workout = {
      series: 0,
      restBetweenExercise: 0
    };
    state.timer.workout = workout;
  },
  ['RESET_TIMER_WORKOUT_EXERCISES'](state) {
    const workoutExercises = [
      {
        exerciseIdGlobal: '',
        exerciseTime: 0,
        exerciseRest: 0
      }
    ];
    state.timer.workoutExercises = workoutExercises;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
