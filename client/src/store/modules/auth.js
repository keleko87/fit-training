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
  login({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        commit('loginSuccess', user);
        return Promise.resolve(user);
      },
      error => {
        commit('loginFailure');
        return Promise.reject(error);
      }
    );
  },
  logout({ commit }) {
    AuthService.logout();
    commit('logout');
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess');
        return Promise.resolve(response.data);
      },
      error => {
        commit('registerFailure');
        return Promise.reject(error);
      }
    );
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
  loginSuccess(state, user) {
    state.status.loggedIn = true;
    state.user = user;
  },
  loginFailure(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  logout(state) {
    state.status.loggedIn = false;
    state.user = null;
  },
  registerSuccess(state) {
    state.status.loggedIn = false;
  },
  registerFailure(state) {
    state.status.loggedIn = false;
  },
  ['SET_USER_WORKOUTS_GO'](state, workoutsGo) {
    state.workoutsGoHistory = workoutsGo;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
