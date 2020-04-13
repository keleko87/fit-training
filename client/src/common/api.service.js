import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const API_URL = process.env.VUE_APP_API;

const ApiService = {
  init() {
    console.log(process.env);
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
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
