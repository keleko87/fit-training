<template>
  <div class="ft-workout-go-exercises">
    <div class="container">
      <div class="row">
        <!-- Workout exercises list -->
        <div
          class="ft-workout-go-exercises__exercises col-sm-12 col-md-7 col-lg-9"
        >
          <div class="row">
            <div
              v-for="exercise in workoutExercises"
              :key="exercise.idGlobal"
              class="col-sm-12 col-md-6 col-lg-4 mb-2"
            >
              <workout-exercises-card
                :workout-go="true"
                :data="exercise"
                @delete="onDeleteExercise($event)"
              ></workout-exercises-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorkoutExercisesCard from '../workout/WorkoutExercisesCard';

export default {
  name: 'exercise-detail',

  props: {
    type: {
      type: String,
      default: 'exercise'
    },
    info: {
      type: Object
    }
  },

  components: {
    WorkoutExercisesCard
  },

  // async created() {
  //   await this.$store.dispatch('SET_WORKOUT_DATA', this.info);
  // },

  computed: {
    workoutExercises() {
      return this.$store.state.workout.data.exercises;
    }
  },

  methods: {
    getImage(imageUrl) {
      return `${process.env.VUE_APP_UPLOADS}${imageUrl}`;
    },

    onDeleteExercise(id) {
      console.log(id, 'deleted', this.workoutExercises);
    },

    workoutInit() {
      this.$router.push({ name: 'workoutGo' });
    }
  }
};
</script>

<style lang="scss" scoped>
$iframe-height: 315px;

.ft-workout-go-exercises {
  h6,
  p {
    text-align: left;
  }

  &__exercises {
    overflow: auto;
  }

  &__image {
    width: auto;
    height: $iframe-height; // heigth equals iframes
  }

  &__iframe {
    height: $iframe-height;
  }

  &__icon {
    color: $teal;
  }

  &__is-warm-up {
    text-align: right;
  }

  &__time-info {
    &--item {
      padding: 0 10px;
      h6,
      p {
        text-align: center;
      }
    }
  }
}
</style>
