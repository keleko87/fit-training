import Vue from 'vue';
import Router from 'vue-router';
import Exercise from '../views/Exercise';
import Home from '../views/Home';
import WorkoutNew from '../components/workout/WorkoutNew';
import WorkoutList from '../components/workout/WorkoutList';
import RoutineNew from '../components/routine/RoutineNew';
import RoutineList from '../components/routine/RoutineList';
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/workout/new'
    },
    {
      path: '/workout/new',
      name: 'workoutNew',
      components: {
        list: Exercise,
        create: WorkoutNew
      }
    },
    {
      path: '/routine/new',
      name: 'routineNew',
      components: {
        list: WorkoutList,
        create: RoutineNew
      }
    },
    {
      path: '/routine/list',
      name: 'routines',
      components: {
        list: RoutineList,
        create: Home
      }
    }
  ]
});
