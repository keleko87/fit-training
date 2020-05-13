import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // Progress bar library

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/login',
      name: 'login',
      components: {
        list: () => import(/* webpackChunkName: "home" */ '../components/auth/Login.vue'),
        create: () => import(/* webpackChunkName: "home" */ '../views/About.vue')
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        list: () => import(/* webpackChunkName: "home" */ '../components/auth/Register.vue'),
        create: () => import(/* webpackChunkName: "home" */ '../views/About.vue')
      }
    },
    {
      path: '/',
      name: 'home',
      components: {
        list: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
        create: () => import(/* webpackChunkName: "home" */ '../views/About.vue')
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        list: () => import(/* webpackChunkName: "auth" */ '../components/auth/Profile.vue'),
        create: () => import(/* webpackChunkName: "home" */ '../views/About.vue')
      }
    },
    {
      path: '/admin',
      name: 'admin',
      components: {
        list: () => import(/* webpackChunkName: "auth" */ '../components/auth/BoardAdmin.vue'),
        create: () => import(/* webpackChunkName: "home" */ '../views/About.vue')
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        list: () => import(/* webpackChunkName: "auth" */ '../components/auth/BoardUser.vue'),
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
    }
    // NOT FOUND
    // {
    //   path: '*',
    //   redirect: '/'
    // }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/routine/new'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // Start the route progress bar.
  NProgress.start();

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
