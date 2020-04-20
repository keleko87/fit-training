<template>
  <div class="ft-workout-go-exercises">
    <div class="container">
      <div class="row my-3">
        <!-- Workout exercises list -->
        <div class="ft-workout-go-exercises__exercises col-12">
          <div class="row">
            <div
              v-for="exercise in workoutExercises"
              :key="exercise.idGlobal"
              class="col-sm-12 col-md-6 col-lg-4 mb-3"
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

      <div v-if="currentWorkoutSerieFinished" style="color: white">
        SERIE FINALIZADA ! {{ currentWorkoutSerieFinished }}
        <br />
      </div>

      <div
        v-if="currentWorkoutSerieFinished && workoutFinish"
        style="color: white"
      >
        ENTRENAMIENTO FINALIZADO...BUEN TRABAJO! {{ workoutFinish }}
        <br />
      </div>
      <!-- TIMER -->
      <div class="row">
        <div class="col-12">
          <ft-timer></ft-timer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WorkoutExercisesCard from '../workout/WorkoutExercisesCard';
import FtTimer from '../common/Timer';

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
    WorkoutExercisesCard,
    FtTimer
  },

  computed: {
    ...mapGetters([
      'currentWorkoutSerie',
      'timerWorkout',
      'workoutExercisesAllDone'
    ]),

    workoutExercises() {
      return this.$store.state.workout.data.exercises;
    },
    currentWorkoutSerieFinished() {
      return this.$store.state.workoutGo.timer.currentWorkoutSerieFinished;
    },
    workoutFinish() {
      return this.$store.state.workoutGo.timer.workout.finish;
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
    // overflow: auto;
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
