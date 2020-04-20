<template>
  <div class="ft-workout-go-info">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 mt-3">
          <!-- INFO -->
          <div class="row">
            <div v-if="workout.name" class="col-12 mb-3">
              <!-- SPORT -->
              <h4 class="ft-workout-go-info__info text-center">
                {{ workout.name }}
              </h4>
            </div>
          </div>

          <div class="row">
            <div v-if="workout.sport" class="col-md-6">
              <!-- SPORT -->
              <h6 class="ft-workout-go-info__label">Actividad</h6>
              <p class="ft-workout-go-info__info">{{ workout.sport }}</p>
            </div>

            <div v-if="workout.bodyPart" class="col-md-6">
              <!-- BODY PART -->
              <h6 class="ft-workout-go-info__label">Parte del cuerpo</h6>
              <p class="ft-workout-go-info__info">{{ workout.bodyPart }}</p>
            </div>

            <div v-if="workout.target" class="col-md-6">
              <!-- TARGET -->
              <h6 class="ft-workout-go-info__label">Objetivo</h6>
              <p class="ft-workout-go-info__info">{{ workout.target }}</p>
            </div>
            <div v-if="workout.level" class="col-md-6">
              <!-- LEVEL -->
              <h6 class="ft-workout-go-info__label">Nivel</h6>
              <p class="ft-workout-go-info__info">{{ workout.level }}</p>
            </div>
          </div>

          <hr class="ft-breakline" />

          <div class="row ft-workout-go-info__time-info">

            <div class="col-sm-6">
              <!-- SERIES -->
              <md-field>
                <label for="series">Series</label>
                <md-select
                  :disabled="startDate !== ''"
                  v-model="workoutSeries"
                  id="series"
                  name="series"
                >
                  <md-option
                    v-for="serie in series"
                    :key="serie"
                    :value="serie"
                  >
                    {{ serie }}
                  </md-option>
                </md-select>
              </md-field>
            </div>

            <div
              v-if="workout.restBetweenExercise"
              class="col-md-6 ft-workout-go-info__time-info--item"
            >
              <md-field>
                <label for="series">Descanso (min)</label>
                <md-select
                  :disabled="startDate !== ''"
                  v-model="restBetweenExercise"
                  id="restBetweenExercise"
                  name="restBetweenExercise"
                >
                  <md-option
                    v-for="minute in minutes"
                    :key="minute"
                    :value="minute"
                  >
                    {{ minute }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
          </div>

        <!-- DURATION -->
        <!-- <h6 class="ft-workout-go-info__label">Duración</h6>
          <p class="ft-workout-go-info__info">{{ duration }}</p>
        </div> -->

          <div class="row">
            <div class="col-sm-6">
              <!-- AUTO MODE -->
              <md-checkbox id="timer" v-model="timerAuto" class="md-primary">
                <span class="checkbox-text">Timer auto</span>
              </md-checkbox>
            </div>
          </div>

          <!-- BUTTONS -->
          <div class="row">
            <div class="col-lg-6 px-1">
              <button
                class="btn btn-primary w-100"
                :disabled="startDisabled"
                @click.prevent="workoutStart()"
              >
                Iniciar
              </button>
            </div>
            <div class="col-lg-6 px-1">
              <button
                class="btn btn-primary w-100"
                :disabled="reStartDisabled"
                @click.prevent="workoutReStart()"
              >
                Reinicio
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 px-1">
              <button
                class="btn btn-default w-100"
                :disabled="pauseDisabled"
                @click.prevent="workoutPause()"
              >
                Pausa
              </button>
            </div>
            <div class="col-lg-6 px-1">
              <button
                class="btn btn-danger w-100"
                :disabled="finishDisabled"
                @click.prevent="workoutFinish()"
              >
                Fin
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
import { mapGetters } from 'vuex';
import { SERIES, MINUTES } from '../../common/constants';

export default {
  name: 'workout-go-info',

  mixins: [timer],

  async created() {
    const userId = 'userId 12323'; // PENDING ADD LOGIN
    const auto = this.timerAuto;
    const workoutExercises = this.workoutExercises;
    const workout = this.workout;

    await this.$store.dispatch('SET_WORKOUT_GO_DATA', {
      userId,
      auto,
      workout,
      workoutExercises
    });
  },

  data() {
    return {
      series: SERIES,
      minutes: MINUTES,
      modalFinish: false
    };
  },

  computed: {
    ...mapGetters([
      'startDate',
      'currentExercise',
      'timerWorkout',
      'workoutExercisesAllDone'
    ]),

    timerAuto: {
      get() {
        return this.$store.state.workoutGo.timer.auto;
      },
      set(val) {
        console.log('set timer mode', val);
        this.$store.commit('SET_TIMER_AUTO', val);
      }
    },

    restBetweenExercise: {
      get() {
        return this.$store.state.workoutGo.timer.workout.restBetweenExercise;
      },
      set(val) {
        console.log('set Rest between exercise ', val);
        const workout = { restBetweenExercise: val };
        this.$store.commit('SET_TIMER_WORKOUT', workout);
      }
    },

    workoutSeries: {
      get() {
        return this.$store.state.workoutGo.timer.workout.series;
      },
      set(val) {
        console.log('set Workout series ', val);
        this.$store.commit('SET_WORKOUT_SERIES', val);
      }
    },

    timerWorkoutExercises() {
      return this.$store.state.workoutGo.timer.workoutExercises;
    },

    workout() {
      return this.$store.state.workout.data;
    },

    workoutExercises() {
      return this.$store.state.workout.data.exercises;
    },

    pauseDisabled() {
      return !this.startDisabled;
    },
    startDisabled() {
      return this.startDate !== '';
    },
    reStartDisabled() {
      return (
        !this.workoutExercisesAllDone &&
        this.startDate !== '' &&
        this.endDate === ''
      );
    },
    finishDisabled() {
      return this.startDate === '';
    },
    duration() {
      return this.setTextTime(this.workout.duration);
    },
    rest() {
      return this.setTextTime(this.restBetweenExercise);
    }
  },

  methods: {
    getImage(imageUrl) {
      return `${process.env.VUE_APP_UPLOADS}${imageUrl}`;
    },

    workoutStart() {
      const startDate = Date.now().toString();
      const inputSeries = this.workoutSeries;
      const workout = this.timerWorkout;
      const workoutExercises = this.timerWorkoutExercises;

      this.$store.dispatch('START_WORKOUT', {
        startDate,
        inputSeries,
        workout,
        workoutExercises
      });
    },

    workoutReStart() {
      // New serie workout
      const workout = this.timerWorkout;
      const workoutExercises = this.timerWorkoutExercises;
      this.$store.dispatch('RE_START_WORKOUT', { workout, workoutExercises });
    },

    workoutPause() {
      const currentExercise = this.currentExercise;
      const workout = this.timerWorkout;
      this.$store.dispatch('PAUSE_WORKOUT', { currentExercise, workout });
    },

    workoutFinish() {
      this.modalFinish = true;
      //  * IN MODAL ADD:
      //  * - Enhorabuena has finalizado el entrenamiento!
      //  * - Quieres Guardar tu entrenamiento ? SI / NO
      //  * - this.$router.push({ name: 'home' });
    }
  },

  beforeDestroy() {
    this.$store.dispatch('RESET_WORKOUT_NOT_FINISH');
    console.log('destroyed', this.timerWorkoutExercises);
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
        // text-align: center;
      }
    }
  }
}
</style>
