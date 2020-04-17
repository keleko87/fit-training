import { WorkoutGoService } from '../../common/api.service';
// import workoutGoMock from '../../../static/mocks/workout-go.json';

const state = {
  userId: '',
  startDate: '',
  endDate: '',

  timer: {
    auto: true,
    currentWorkoutSerie: 0,
    currentExercise: {
      idGlobal: '',
      time: 0,
      rest: 0,
      done: false
    },
    workout: {
      series: 1,
      restBetweenExercise: 0,
      finish: false
    },
    workoutExercises: [
      {
        idGlobal: '',
        time: 0,
        rest: 0,
        done: false
      }
    ]
  }
};

const getters = {
  startDate(state) {
    return state.startDate;
  },
  timer(state) {
    return state.timer;
  },
  timerMode(state) {
    return state.timer.auto;
  },
  timerWorkoutExercises(state) {
    state.timer.workoutExercises;
  },
  workoutExercisesAllDone(state) {
    return state.timer.workoutExercises.every(
      exercise => exercise.done === true
    );
  },
  timerWorkout(state) {
    return state.timer.workout;
  },
  currentExercise() {
    return state.timer.currentExercise;
  },
  currentWorkoutSerie() {
    return state.timer.currentWorkoutSerie;
  }
};

const actions = {
  ['SET_WORKOUT_GO_DATA'](
    context,
    { userId, auto, workout, workoutExercises }
  ) {
    context.commit('SET_USER_WORKOUT', userId);
    context.commit('SET_TIMER_AUTO', auto);
    context.commit('SET_TIMER_WORKOUT', workout);
    context.commit('SET_TIMER_WORKOUT_EXERCISES', workoutExercises);
  },
  ['START_WORKOUT'](
    context,
    { startDate, inputSeries, workout, workoutExercises }
  ) {
    context.commit('SET_START_DATE', startDate);
    context.commit('SET_WORKOUT_SERIES', inputSeries);
    context.commit('SET_TIMER_WORKOUT_CURRENT_SERIE', workout);
    context.commit('SET_TIMER_CURRENT_EXERCISE', workoutExercises);
  },
  ['RE_START_WORKOUT'](context, { workout, workoutExercises }) {
    context.commit('SET_TIMER_WORKOUT_CURRENT_SERIE', workout);
    context.commit('SET_TIMER_CURRENT_EXERCISE', workoutExercises);
  },
  ['PAUSE_WORKOUT'](context, { currentExercise, workout }) {
    context.commit('PAUSE_TIMER_WORKOUT', { currentExercise, workout });
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
  ['SET_TIMER_AUTO'](state, auto) {
    state.timer.auto = auto;
  },
  ['SET_TIMER_WORKOUT'](state, workout) {
    const { restBetweenExercise } = workout;
    state.timer.workout.restBetweenExercise = restBetweenExercise;
    state.timer.workout.finish = false;
  },

  ['SET_WORKOUT_SERIES'](state, inputSeries) {
    state.timer.workout.series = inputSeries;
  },

  ['SET_TIMER_WORKOUT_CURRENT_SERIE'](state, workout) {
    const currentSerie = state.timer.currentWorkoutSerie;
    if (currentSerie < workout.series) {
      state.timer.currentWorkoutSerie = state.timer.currentWorkoutSerie + 1;
    }
  },

  ['SET_TIMER_WORKOUT_EXERCISES'](state, workoutExercises) {
    const workoutExers = workoutExercises.map(exercise => {
      const { idGlobal, time, rest } = exercise;
      return {
        idGlobal,
        time,
        rest,
        done: false
      };
    });
    state.timer.workoutExercises = [...workoutExers];
  },

  ['SET_TIMER_CURRENT_EXERCISE'](state, workoutExercises) {
    debugger;
    const currentExer = state.timer.currentExercise.idGlobal
        ? state.timer.currentExercise
        : '';

    if (!currentExer) {
      // First time
      state.timer.currentExercise = workoutExercises[0];
    } else {
      // Mark as DONE the currentExercise and set next current exercise
      const workoutExercises = state.timer.workoutExercises.map(exer => {
        if (exer.idGlobal === currentExer.idGlobal) {
          exer.done = true;
        }

        return { ...exer };
      });

      state.timer.workoutExercises = [...workoutExercises];
      state.timer.currentExercise = state.timer.workoutExercises.find(
        exer => exer.done === false
      )[0];
    }
  },

  ['PAUSE_TIMER_WORKOUT'](state, { currentExercise, workout }) {
    // TODO
    if (currentExercise.timer) {
      // pause this
    } else if (workout.timer) {
      // pause this
    } else {
      // nothing
    }
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
        idGlobal: '',
        time: 0,
        rest: 0
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
