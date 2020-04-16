<template>
  <div class="ft-workout-detail">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 mt-3">
          <!-- INFO -->
          <div class="row">
            <div v-if="workout.sport" class="col-sm-6">
              <!-- SPORT -->
              <h6 class="ft-workout-detail__label">Actividad</h6>
              <p class="ft-workout-detail__info">{{ workout.sport }}</p>
            </div>

            <div v-if="workout.bodyPart" class="col-sm-6">
              <!-- BODY PART -->
              <h6 class="ft-workout-detail__label">Parte del cuerpo</h6>
              <p class="ft-workout-detail__info">{{ workout.bodyPart }}</p>
            </div>

            <div v-if="workout.target" class="col-sm-6">
              <!-- TARGET -->
              <h6 class="ft-workout-detail__label">Objetivo</h6>
              <p class="ft-workout-detail__info">{{ workout.target }}</p>
            </div>
            <div v-if="workout.level" class="col-sm-6">
              <!-- LEVEL -->
              <h6 class="ft-workout-detail__label">Nivel</h6>
              <p class="ft-workout-detail__info">{{ workout.level }}</p>
            </div>
          </div>

          <hr class="ft-breakline" />

          <div class="row d-flex ft-workout-detail__time-info">
            <div
              v-if="workout.restBetweenExercise !== ''"
              class="ft-workout-detail__time-info--item"
            >
              <!-- REST BETWEEN EXERCISE-->
              <h6 class="ft-workout-detail__label">Descanso</h6>
              <p class="ft-workout-detail__info">{{ rest }}</p>
            </div>
            <div
              v-if="workout.duration !== ''"
              class="ft-workout-detail__time-info--item"
            >
              <!-- DURATION -->
              <h6 class="ft-workout-detail__label">Duración</h6>
              <p class="ft-workout-detail__info">{{ duration }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <button class="btn btn-primary w-100" @click.prevent="workoutFinish()">
                Finalizar entrenamiento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

  // async created() {
  //   await this.$store.dispatch('GET_WORKOUT', id);
  // },

  computed: {
    workout() {
      return this.$store.state.workout.data;
    },
    workoutExercises() {
      return this.$store.state.workout.data.exercises;
    },
    duration() {
      return this.setTextTime(this.workout.duration);
    },
    rest() {
      return this.setTextTime(this.workout.restBetweenExercise);
    }
  },

  methods: {
    getImage(imageUrl) {
      return `${process.env.VUE_APP_UPLOADS}${imageUrl}`;
    },

    workoutFinish() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style lang="scss" scoped>
$iframe-height: 315px;

.ft-workout-go-info {
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
