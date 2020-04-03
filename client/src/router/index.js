import Vue from 'vue';
import Router from 'vue-router';
import ExerciseList from '../components/ExerciseList';
import Exercise from '../views/Exercise';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/exercise',
      name: 'exercise',
      components: {
        list: ExerciseList,
        create: Exercise
      }
    }
    // {
    //   path: '/exercise/list',
    //   name: 'new',
    //   component: () => import('../views/Exercise')
    // },
    // {
    //   path: '/exercise/new',
    //   name: 'new',
    //   component: () => import('../views/Exercise')
    // },
    // {
    //   path: '/exercise/:id/edit',
    //   name: 'new',
    //   component: () => import('../views/Exercise')
    // }
  ]
});
