<template>
  <div class="ft-workout-go-info">
    <ft-modal :size="'md'" :modal="modalFinish" @close="onCloseModal($event)">
      <template slot="header">
        <h3 class="text-center mb-0">Finalizar entrenamiento</h3>
      </template>
      <template slot="body">
        <div class="row my-4">
          <div class="col-12 mb-3">
            <h5 class="text-center">¿Quiers guardar el entrenamiento?</h5>
          </div>
          <div class="col-12 text-center mx-0">
            <button
              @click.prevent="saveWorkout()"
              class="btn btn-md btn-primary btn-witdh"
            >
              Guardar
            </button>
            <button
              @click.prevent="closeWorkout()"
              class="btn btn-md btn-danger btn-witdh"
            >
              Salir
            </button>
          </div>
        </div>
      </template>
    </ft-modal>

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

            <div class="col-md-6 ft-workout-go-info__time-info--item">
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
              <md-checkbox
                id="timer"
                v-model="timerAuto"
                :disabled="startDate != ''"
                class="md-primary checkbox-lg"
              >
                <span class="checkbox-text">Tiempo auto</span>
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
                class="btn btn-danger w-100"
                :disabled="finishDisabled"
                @click.prevent="workoutFinish()"
              >
                Fin
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 px-1">
              <button
                class="btn btn-default w-100"
                :disabled="reStartDisabled"
                @click.prevent="workoutReStart()"
              >
                Nueva Serie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FtModal = () => import('../common/Modal.vue');

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

  components: {
    FtModal
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
      'endDate',
      'currentExercise',
      'currentWorkoutSerie',
      'timerWorkoutSeries',
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

    startDisabled() {
      return this.startDate !== '';
    },
    reStartDisabled() {
      return (
        this.currentWorkoutSerie === this.timerWorkoutSeries ||
        !this.workoutExercisesAllDone ||
        this.timerWorkout.finish
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
    workoutStart() {
      const startDate = Date.now().toString();
      const inputSeries = this.workoutSeries;

      this.$store.dispatch('START_WORKOUT', {
        startDate,
        inputSeries
      });
    },

    workoutReStart() {
      // New serie workout
      this.$store.dispatch('RE_START_WORKOUT');
    },

    workoutFinish() {
      this.modalFinish = true;
      const endDate = Date.now().toString();
      this.$store.dispatch('END_WORKOUT', endDate);
    },

    closeWorkout() {
      this.$router.push({ name: 'workoutNew' });
    },

    async saveWorkout() {
      const {
        name,
        sport,
        bodyPart,
        level,
        target,
        duration,
        exercises
      } = this.workout;

      const userId = 'user id logged in 1';
      const startDate = this.startDate;
      const endDate = this.endDate;
      const series = this.timerWorkoutSeries;
      const restBetweenExercise = this.timerWorkout.restBetweenExercise;
      const finish = this.timerWorkout.finish;

      const workoutData = {
        name,
        sport,
        bodyPart,
        level,
        target,
        duration,
        exercises,
        series,
        restBetweenExercise,
        userId,
        startDate,
        endDate,
        finish
      };

      const res = await this.$store.dispatch('SAVE_WORKOUT_GO', workoutData);

      if (res) {
        this.closeWorkout();
      }
    },

    onCloseModal(ev) {
      this.modalFinish = ev;
    }
  },

  beforeDestroy() {
    this.$store.dispatch('RESET_WORKOUT_NOT_FINISH');
    console.log('RESET_WORKOUT_NOT_FINISH', this.timerWorkoutExercises);
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
    }
  }
}
</style>
