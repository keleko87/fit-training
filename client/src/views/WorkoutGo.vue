<template>
  <div class="ft-app__container">
    <div class="row h-100">

      <div class="col-md-8 elegant-color ft-app__list">
        <!-- Exercise view -->
        <exercise-view></exercise-view>
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
import WorkoutNew from '../components/workout/WorkoutNew';
import ExerciseView from './Exercise';

export default {
  name: 'workout-view',

  components: {
    ExerciseView,
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
    height: calc(100vh - #{$height-navbar});
    .row {
      margin: 0;
    }
  }
  &__list {
    padding: 0;
    background-color: transparent;
    // background-image: url('./assets/img/fitness_slide_1.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
}
</style>
