<template>
  <div class="ft-app__container">
    <div class="row h-100">

      <div class="col-md-8 elegant-color ft-app__list">
        <!-- EXERCISES LIST -->
        <div class="container">
          <div class="row mt-3">
            <div class="col-12" v-if="totalExercises && totalExercises.length">
              <exercise-list
                :list="totalExercises"
                :type="'all'"
              ></exercise-list>
            </div>
          </div>
        </div>
      </div>

      <!-- Workout new -->
      <div class="col-md-4 bg-create-section ft-app__create">
        <workout-new></workout-new>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExerciseList from '../components/exercise/ExerciseList';
import WorkoutNew from '../components/workout/WorkoutNew';

export default {
  name: 'workout-view',

  components: {
    ExerciseList,
    WorkoutNew
  },

  async created() {
    await this.$store.dispatch('GET_EXERCISES');

    if (this.$route.params.id) {
      // EDIT WORKOUT
      await this.$store.dispatch('GET_WORKOUT', '5e9448f9a33c52660ad246c3');
    } else {
      // NEW WORKOUT
      console.log('New workout');
    }
  },

  computed: {
    ...mapGetters(['totalExercises', 'workoutExercises'])
  }
};
</script>

<style lang="scss" scoped>
.ft-app {
  &__container {
    height: calc(100vh - 52px);
    .row {
      margin: 0;
    }
  }
  &__list {
    padding: 0;
    background-color: transparent;
    // background-image: url('./assets/img/fitness_slide_2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
}
</style>
