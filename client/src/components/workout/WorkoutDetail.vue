<template>
  <div class="ft-workout-detail">
    <div class="container">
      <div class="row">
        <!-- Workout exercises list -->
        <div class="ft-workout-detail__exercises col-sm-12 col-md-7 col-lg-9">
          <div class="row">
            <div
              v-for="exercise in workoutExercises"
              :key="exercise.idGlobal"
              class="col-sm-12 col-md-6 col-lg-4 mb-2"
            >
              <workout-exercises-card :data="exercise"></workout-exercises-card>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-md-5 col-lg-3 mt-3">
          <!-- INFO -->
          <div class="row">
            <div v-if="info.sport" class="col-md-6">
              <!-- SPORT -->
              <h6 class="ft-workout-detail__label">Actividad</h6>
              <p class="ft-workout-detail__info">{{ info.sport }}</p>
            </div>

            <div v-if="info.bodyPart" class="col-sm-6">
              <!-- BODY PART -->
              <h6 class="ft-workout-detail__label">Parte del cuerpo</h6>
              <p class="ft-workout-detail__info">{{ info.bodyPart }}</p>
            </div>

            <div v-if="info.target" class="col-sm-6">
              <!-- TARGET -->
              <h6 class="ft-workout-detail__label">Objetivo</h6>
              <p class="ft-workout-detail__info">{{ info.target }}</p>
            </div>
            <div v-if="info.level" class="col-sm-6">
              <!-- LEVEL -->
              <h6 class="ft-workout-detail__label">Nivel</h6>
              <p class="ft-workout-detail__info">{{ info.level }}</p>
            </div>
          </div>

          <hr class="ft-breakline" />

          <div class="row d-flex ft-workout-detail__time-info">
            <div
              v-if="info.restBetweenExercise !== ''"
              class="ft-workout-detail__time-info--item"
            >
              <!-- REST BETWEEN EXERCISE-->
              <h6 class="ft-workout-detail__label">Descanso</h6>
              <p class="ft-workout-detail__info">{{ rest }}</p>
            </div>
            <div
              v-if="info.duration !== ''"
              class="ft-workout-detail__time-info--item"
            >
              <!-- DURATION -->
              <h6 class="ft-workout-detail__label">Duración</h6>
              <p class="ft-workout-detail__info">{{ duration }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <button
                class="btn btn-primary w-100"
                @click.prevent="workoutInit()"
              >
                Iniciar entrenamiento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const WorkoutExercisesCard = () => import('./WorkoutExercisesCard.vue');

import timer from '../../mixins/timer';

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

  mixins: [timer],

  components: {
    WorkoutExercisesCard
  },

  async created() {
    await this.$store.dispatch('SET_WORKOUT_DATA', this.info);
  },

  computed: {
    workoutExercises() {
      return this.$store.state.workout.data.exercises;
    },
    duration() {
      return this.setTextTime(this.info.duration);
    },
    rest() {
      return this.setTextTime(this.info.restBetweenExercise);
    }
  },

  methods: {
    workoutInit() {
      this.$router.push({ name: 'workoutGo' });
    }
  }
};
</script>

<style lang="scss" scoped>
$iframe-height: 315px;

.ft-workout-detail {
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
