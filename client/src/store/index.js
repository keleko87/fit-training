import Vue from 'vue';
import Vuex from 'vuex';

import exercise from './modules/exercise';
import workout from './modules/workout';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    exercise,
    workout
  }
});
