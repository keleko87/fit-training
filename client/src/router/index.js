import Vue from 'vue';
import Router from 'vue-router';
import Exercise from '../views/Exercise';
import Workout from '../views/Workout';
import Home from '../views/Home';
import WorkoutNew from '../components/workout/WorkoutNew';
import WorkoutList from '../components/workout/WorkoutList';
import RoutineNew from '../components/routine/RoutineNew';
import RoutineList from '../components/routine/RoutineList';
import NProgress from 'nprogress'; // Progress bar library

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/workout/new'
    },
    // OLD ROUTE
    // {
    //   path: '/workout/new',
    //   name: 'workoutNew',
    //   component: Workout
    // },
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

router.beforeEach((routeTo, routeFrom, next) => {
  // Start the route progress bar.
  NProgress.start();
  next();
});
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
