import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import exercise from './modules/exercise';
import workout from './modules/workout';
import workoutGo from './modules/workoutGo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    exercise,
    workout,
    workoutGo
  }
});
