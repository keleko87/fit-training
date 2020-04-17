import { WorkoutGoService } from '../../common/api.service';

const state = {
  data: {
    _id: '',
    name: '',
    email: ''
  },
  workoutsGoHistory: [],
  workoutsCreated: []
};

const getters = {
  user(state) {
    return state.data;
  },
  userWorkoutsGo(state) {
    state.workoutsGoHistory;
  },
  userWorkoutsCreated(state) {
    return state.workoutsCreated;
  }
};

const actions = {
  async ['GET_USER_WORKOUTS_GO'](context, userId) {
    try {
      const { data } = await WorkoutGoService.getWorkoutsGoByUser(userId);
      context.commit('SET_USER_WORKOUTS_GO', data);
      return data;
    } catch (error) {
      console.error('ERROR: ', error.message);
      // context.commit('SET_TOTAL_WORKOUTS_GO', workoutsMock);
      // return workoutsMock;
    }
  }
};

const mutations = {
  ['SET_USER_WORKOUTS_GO'](state, workoutsGo) {
    state.workoutsGoHistory = workoutsGo;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
