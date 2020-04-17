import Vue from 'vue';
import Vuex from 'vuex';

import exercise from './modules/exercise';
import workout from './modules/workout';
import workoutGo from './modules/workoutGo';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    exercise,
    workout,
    workoutGo,
    user
  }
});
