import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import NProgress from 'nprogress';

const API_URL = process.env.VUE_APP_API;

const ApiService = {
  init() {
    console.log(process.env);
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;

    // before a request is made start the nprogress
    Vue.axios.interceptors.request.use(config => {
      NProgress.start();
      return config;
    });

    // before a response is returned stop nprogress
    Vue.axios.interceptors.response.use(response => {
      NProgress.done();
      return response;
    });
  },

  setHeader() {
    // Vue.axios.defaults.headers.common[
    //   'Authorization'
    // ] = `Token ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  get(resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  },

  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  delete(resource) {
    return Vue.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
};

export default ApiService;

export const ExercisesService = {
  resource: 'exercise',

  getExercises() {
    return ApiService.get(this.resource, 'all');
  },

  getExercise(id) {
    return ApiService.get(this.resource, id);
  },

  saveExercise(exercise) {
    return ApiService.post(`${this.resource}/new`, exercise);
  }
};

export const WorkoutsService = {
  resource: 'workout',

  getWorkouts() {
    return ApiService.get(this.resource, 'all');
  },

  getWorkout(id) {
    return ApiService.get(this.resource, id);
  },

  saveWorkout(workout) {
    return ApiService.post(`${this.resource}/new`, workout);
  }
};

export const WorkoutGoService = {
  resource: 'workoutGo',

  getWorkoutsGoByUser(userId) {
    return ApiService.get(this.resource, userId);
  },

  getWorkoutGo(id) {
    return ApiService.get(this.resource, id);
  },

  saveWorkoutGo(workout) {
    return ApiService.post(`${this.resource}/new`, workout);
  }
};
