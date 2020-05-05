import AuthService from '../../common/auth/auth.service';
import { WorkoutGoService } from '../../common/api.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {
      status: { loggedIn: true },
      user,
      workoutsGoHistory: [],
      workoutsCreated: []
    }
  : {
      status: { loggedIn: false },
      user: null,
      workoutsGoHistory: [],
      workoutsCreated: []
    };

const state = initialState;

const getters = {
  user(state) {
    return state.user;
  },
  userLoggedIn(state) {
    return state.status.loggedIn;
  },
  userWorkoutsGo(state) {
    state.workoutsGoHistory;
  },
  userWorkoutsCreated(state) {
    return state.workoutsCreated;
  }
};

const actions = {
  async ['LOGIN']({ commit }, user) {
    try {
      const res = await AuthService.login(user);
      commit('LOGIN_SUCCESS', res);
      return res;
    } catch (error) {
      console.log('error login failure', error);
      commit('LOGIN_FAILURE');
      throw error;
    }
  },

  async ['LOGOUT']({ commit }) {
    await AuthService.logout();
    commit('LOGOUT');
  },

  async ['REGISTER']({ commit }, user) {
    try {
      const { data } = await AuthService.register(user);
      commit('REGISTER_SUCCESS');
      return data;
    } catch (error) {
      commit('REGISTER_FAILURE');
      throw error;
    }
  },

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
  ['LOGIN_SUCCESS'](state, user) {
    state.status.loggedIn = true;
    state.user = user;
  },
  ['LOGIN_FAILURE'](state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  ['LOGOUT'](state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  ['REGISTER_SUCCESS'](state) {
    state.status.loggedIn = false;
  },
  ['REGISTER_FAILURE'](state) {
    state.status.loggedIn = false;
  },
  ['SET_USER_WORKOUTS_GO'](state, workoutsGo) {
    state.workoutsGoHistory = workoutsGo;
  }
};

export default {
  namespaced: true, // to use -> dispatch('auth/REGISTER')
  state,
  getters,
  actions,
  mutations
};
