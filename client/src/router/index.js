import Vue from 'vue';
import Router from 'vue-router';
import Exercise from '../views/Exercise';
import ExerciseNew from '../components/ExerciseNew';
import ExerciseList from '../components/ExerciseList';
import Workout from '../views/Workout';
import WorkoutNew from '../components/WorkoutNew';
import WorkoutList from '../components/WorkoutList';
import Routine from '../views/routine';
import RoutineNew from '../components/RoutineNew';
import RoutineList from '../components/RoutineList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,

  /**
   * PENDING REFACTOR ROUTES, minify to only 3 routes (exercise, workout and routine)
   */
  routes: [
    {
      path: '/exercise/list',
      name: 'exercise',
      components: {
        list: Exercise,
        create: ExerciseNew
      }
    },
    {
      path: '/exercise/new',
      name: 'exercise',
      components: {
        list: ExerciseList, // Inside all CRUD exercise ???
        create: ExerciseNew
      }
    },
    {
      path: '/workout/list',
      name: 'workout',
      components: {
        list: Workout, // Only List Exercise view o possible EDIT and DELETE here ???
        create: WorkoutNew //
      }
    },
    {
      path: '/workout/new',
      name: 'workout',
      components: {
        list: ExerciseList, // Only List Exercise view o possible EDIT and DELETE here ???
        create: WorkoutNew //
      }
    },
    {
      path: '/routine/new',
      name: 'routine',
      components: {
        list: WorkoutList, // Only List Workout or possible EDIT and DELETE ???
        create: RoutineNew //
      }
    },
    {
      path: '/routine/list',
      name: 'routineList',
      components: {
        list: RoutineList, // Only List Workout or possible EDIT and DELETE ???
        create: RoutineNew //  Create Default view ????
      }
    }
  ]
});
