import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // Progress bar library

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        list: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        create: () => import(/* webpackChunkName: "home" */ '../views/About.vue')
      }
    },
    {
      path: '/workout/new',
      name: 'workoutNew',
      components: {
        list: () => import(/* webpackChunkName: "workout-new" */ '../views/Exercise.vue'),
        create: () => import(/* webpackChunkName: "workout-new" */ '../components/workout/WorkoutNew.vue') 
      }
    },
    {
      path: '/workout/go',
      name: 'workoutGo',
      components: {
        list: () => import(/* webpackChunkName: "workout-go" */ '../components/workout-go/WorkoutGoExercises.vue'),
        create: () => import(/* webpackChunkName: "workout-go" */ '../components/workout-go/WorkoutGoInfo.vue'),
      }
    },
    {
      path: '/routine/new',
      name: 'routineNew',
      components: {
        list: () => import(/* webpackChunkName: "routine-new" */ '../components/workout/WorkoutList.vue'),
        create: () => import(/* webpackChunkName: "routine-new" */ '../components/routine/RoutineNew.vue')
      }
    },
    {
      path: '/routine/list',
      name: 'routines',
      components: {
        list: () => import(/* webpackChunkName: "routines" */ '../components/routine/RoutineList.vue'),
        create: () => import(/* webpackChunkName: "routines" */ '../views/Home.vue')
      }
    },
    // NOT FOUND
    {
      path: '*',
      redirect: '/'
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
