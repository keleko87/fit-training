<template>
  <div class="ft-timer">
    <!-- MODAL -->
    <ft-modal :size="'sm'" :modal="modalCountdownInit">
      <template slot="header">
        <h5 class="mb-0">Ejercicio comienza en...</h5>
      </template>
      <template slot="body">
        <div class="text-center">
          <!-- <p>Ejercicio comienza en...</p> -->
          <h2 class="ft-timer__time-countdown-before-init">
            {{ timeCountdownBeforeInit }}
          </h2>
        </div>
      </template>
    </ft-modal>

    <div class="container">
      <!-- MANUAL NEXT EXERCISE -->
      <div class="row">
        <div v-if="!isRestTime" class="col-12">
          <button
            class="btn btn-md btn-default"
            :disabled="startDisabled"
            @click="nextExercise()"
          >
            Siguiente
          </button>
        </div>
        <div v-else class="col-12">
          <h4>Descanso</h4>
        </div>
      </div>

      <div class="row">
        <!-- COUNTDOWN -->
        <div class="col-sm-6">
          <div>
            <p class="text-center mb-2">Tiempo</p>
          </div>
          <div class="d-flex justify-content-center">
            <div class="ft-timer__item--player d-flex">
              <div class="ft-timer__link" :class="{ disabled: startDisabled }">
                <a
                  class=""
                  :disabled="startDisabled"
                  @click.prevent="startCountdown()"
                >
                  <mdb-icon class="ft-icon" icon="play" />
                </a>
              </div>
              <div class="ft-timer__link" :class="{ disabled: pauseDisabled }">
                <a
                  class=""
                  :disabled="pauseDisabled"
                  @click.prevent="pauseCountdown()"
                >
                  <mdb-icon class="ft-icon" icon="pause" />
                </a>
              </div>
            </div>

            <div class="ft-timer__item--time-left">
              <span class="my-0">
                {{ timeLeft }}
              </span>
            </div>

            <div class="ft-timer__item--times d-flex">
              <div class="ft-timer__link" :class="{ disabled: stopDisabled }">
                <a
                  class=""
                  :disabled="stopDisabled"
                  @click.prevent="stopCountdown()"
                >
                  <mdb-icon class="ft-icon" icon="stop" />
                </a>
              </div>
              <div
                v-for="(time, index) in times"
                :key="index"
                class="ft-timer__link"
                :class="{ disabled: selectedTime !== 0 }"
              >
                <a
                  :disabled="selectedTime !== 0"
                  @click.prevent="setTime(time.sec)"
                >
                  {{ time.display }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- SERIES -->
        <div class="col-sm-6">
          <div>
            <p class="text-center mt-1 mb-2">Series</p>
          </div>
          <div class="d-flex justify-content-center">
            <div
              v-for="serie in timerWorkoutSeries"
              :key="serie"
              class="ft-timer__link"
            >
              <a
                class=""
                :class="[
                  { 'is-active': serie === currentWorkoutSerie },
                  { 'is-done': currentWorkoutSerie > serie }
                ]"
                @click.prevent="setSerie(serie)"
              >
                {{ serie }}
              </a>
            </div>
          </div>
        </div>

        <div style="color: white">
          secondsLeft {{ secondsLeft }}
          <br />
          selectedTime {{ selectedTime }}
          <br />
          currentExercise {{ currentExercise }}
          <br />
          times {{ times }}
          <br>
          currentWorkoutSerie {{ currentWorkoutSerie }}
          <br />
          currentWorkoutSerieFinished {{ currentWorkoutSerieFinished }}
          <br />
          timerWorkoutSeries {{ timerWorkoutSeries }}
          <br>
          restBetweenExercise {{restBetweenExercise }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdbIcon } from 'mdbvue';
import FtModal from '../common/Modal';
import timer from '../../mixins/timer';
import { AudioPlayer } from '../../common/audio';

export default {
  name: 'ft-timer',

  components: {
    mdbIcon,
    FtModal
  },

  mixins: [timer],

  data() {
    return {
      intervalTimer: null,
      selectedTime: 0,
      secondsLeft: 0,
      timeLeft: '00:00',
      initCountdown: false,
      isPaused: false,
      modalCountdownInit: false,
      timeCountdownBeforeInit: 0,
      isRestTime: false
    };
  },

  mounted() {
    this.setCountdownAudios();
  },

  computed: {
    ...mapGetters([
      'currentExercise',
      'currentWorkoutSerie',
      'timerAuto',
      'timerWorkout',
      'timerWorkoutSeries'
    ]),

    restBetweenExercise() {
      return this.$store.state.workoutGo.timer.workout.restBetweenExercise * 60;
    },

    timerWorkoutExercises() {
      return this.$store.state.workoutGo.timer.workoutExercises;
    },

    currentWorkoutSerieFinished() {
      return this.$store.state.workoutGo.timer.currentWorkoutSerieFinished;
    },

    workoutFinish() {
      return this.$store.state.workoutGo.timer.workout.finish;
    },

    times() {
      const time = this.currentExercise.time;
      const sec = time * 60;
      const display = this.setTextTime(time);

      return [{ sec, display }];
    },

    restExercise() {
      return this.currentExercise.rest;
    },

    stopDisabled() {
      return !this.selectedTime || this.secondsLeft === 0;
    },

    startDisabled() {
      return !this.selectedTime || (this.secondsLeft > 0 && !this.isPaused);
    },

    pauseDisabled() {
      return !this.selectedTime || this.secondsLeft === 0 || this.isPaused;
    }
  },

  methods: {
    ////////////////  SERIES  /////////////////////
    setSerie(serie) {
      // TODO
    },

    restExerciseSerie() {},

    ///////////////  NEXT EXERCISE  ////////////////
    nextExercise() {
      this.resetCountdown();

      if (this.restBetweenExercise > 0) {
        this.isRestTime = true;
        this.countdown(this.restBetweenExercise, this.isRestTime, this.setNextExercise);
      } else {
        this.setNextExercise();
      }
    },

    async setNextExercise() {
      const workout = this.timerWorkout;
      const workoutExercises = this.timerWorkoutExercises;
      await this.$store.dispatch('SET_NEXT_EXERCISE', { workout, workoutExercises });
    },

    ///////////////  COUNTDOWN  ///////////////////
    setCountdownAudios() {
      const initSrc = this.getAudioSource(this.audioInitSource);
      const finishSrc = this.getAudioSource(this.audioFinishSource);
      this.audioInit = AudioPlayer.createAudio(initSrc);
      this.audioFinish = AudioPlayer.createAudio(finishSrc);
    },

    setTime(seconds) {
      clearInterval(this.intervalTimer);
      this.displayTimeLeft(seconds);
      this.selectedTime = seconds;
    },

    countdown(selectedTime, isRestTime = false, actionFn = null) {
      this.secondsLeft = selectedTime;

      this.intervalTimer = setInterval(() => {
        console.log('LEFT seconds:', this.secondsLeft);

        if (!this.isPaused) {
          this.secondsLeft = this.secondsLeft - 1;
        }

        if (this.secondsLeft <= 0) {
          AudioPlayer.playAlarm(false, this.audioFinish);
          this.resetCountdown();
          if (actionFn) {
            actionFn();
          }
          if (isRestTime) {
            isRestTime = false;
          }
          return;
        }

        this.displayTimeLeft(this.secondsLeft);
      }, 1000);
    },

    countDownBeforeInit() {
      this.timeCountdownBeforeInit = 10;

      this.intervalBeforeInit = setInterval(() => {
        this.timeCountdownBeforeInit = this.timeCountdownBeforeInit - 1;

        if (this.timeCountdownBeforeInit <= 0) {
          clearInterval(this.intervalBeforeInit);
          return 0;
        }

        return this.timeCountdownBeforeInit;
      }, 1000);
    },

    countdown10sec() {
      this.modalCountdownInit = true;
      this.countDownBeforeInit();
      AudioPlayer.playAlarm(false, this.audioInit);

      setTimeout(() => {
        AudioPlayer.stopAlarm(this.audioInit);
        this.modalCountdownInit = false;
        this.countdown(this.selectedTime);
      }, 11000);
    },

    async startCountdown() {
      if (!this.initCountdown) {
        await this.countdown10sec();
        this.initCountdown = true;
      }
      this.isPaused = false;
    },

    pauseCountdown() {
      this.isPaused = true;
    },

    stopCountdown() {
      this.resetCountdown();
    },

    resetCountdown() {
      clearInterval(this.intervalTimer);
      this.initCountdown = false;
      this.selectedTime = 0;
      this.secondsLeft = 0;
      this.timeLeft = '00:00';
    },

    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${this.zeroPadded(minutes)}:${this.zeroPadded(seconds)}`;
    },

    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },

    hourConvert(hour) {
      // 15 --> 3
      return hour % 12 || 12;
    }
  },

  beforeDestroy() {
    clearInterval(this.intervalTimer);
    console.log('timer destroy', this.intervalTimer);
  }
};
</script>

<style lang="scss" scoped>
$padding-items-lg: 7px 12px;
$padding-items-sm: 4px 8px;
$height-countdown-items: 44px;

.ft-timer {
  &__time-countdown-before-init {
    margin: 0 auto;
    color: $teal !important;
    border: 4px solid $teal;
    background-color: $white;
    border-radius: 50px;
    padding: 24px;
    width: 95px;
  }

  &__item {
    &--time-left {
      height: $height-countdown-items;
      border: $border-item;
      padding: 11px 9px;
      background-color: $gray-200;

      span {
        font-size: 1.5rem;
        color: $gray-900 !important;
      }
    }

    &--player,
    &--times {
      height: $height-countdown-items;
      padding: $padding-items-sm;
    }
  }

  &__link {
    // vertical-align: sub;
    border: $border-item;
    padding: $padding-items-lg;
    font-size: 1rem;
    margin: 0 3px;
  }

  &__link:hover:not(.disabled) {
    background-color: $mandarine-gradient;
    a {
      color: $white !important;
    }
  }

  &__link.active {
    background-color: $teal;
    color: $white !important;
  }

  &__link.active:hover {
    background-color: none;
    color: $white;
  }

  &__link.disabled {
    border-color: $gray-700;
    a {
      color: $gray-700 !important;
    }
  }

  .is-active {
    color: $red !important;
  }
  .is-done {
    color: $success !important;
  }
}
</style>
