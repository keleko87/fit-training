<template>
  <div class="ft-timer">
    <!-- MODAL FINISH -->
    <ft-modal
      :size="'sm'"
      :modal="modalFinish"
      @close="onCloseModalFinish($event)"
    >
      <template slot="header">
        <h4 class="mb-0">Buen trabajo</h4>
      </template>
      <template slot="body">
        <div class="text-center">
          <h5 class="my-3">
            {{ modalFinishText }}
          </h5>
        </div>
      </template>
    </ft-modal>

    <!-- MODAL COUNTDOWN -->
    <ft-modal :size="'sm'" :modal="modalCountdownInit">
      <!-- @close="onCloseModal($event)" -->

      <template slot="header">
        <h5 v-if="isRestTime" class="mb-0">Descanso</h5>
        <h5 v-else class="mb-0">Ejercicio comienza en...</h5>
      </template>
      <template slot="body">
        <div class="ft-timer__time-countdown-before-init text-center">
          <h2 class="ft-timer__time-countdown-before-init--text">
            {{ timeCountdownBeforeInit }}
          </h2>
        </div>
      </template>
    </ft-modal>

    <div class="container">
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <!-- AUTO TIMER -->
          <button
            v-if="timerAuto"
            class="btn btn-sm btn-default"
            :disabled="autoStartDisabled"
            @click="autoStart()"
          >
            Iniciar Auto
          </button>
          <!-- NEXT EXERCISE -->
          <button
            v-if="!this.timerAuto && !isRestTime"
            class="btn btn-sm btn-default"
            :disabled="
              !startDate || selectedTime != 0 || currentWorkoutSerieFinished
            "
            @click="nextExercise()"
          >
            Siguiente
          </button>
        </div>
      </div>

      <!-- TIMER - SERIES -->
      <div class="row d-flex justify-content-between">
        <!-- COUNTDOWN -->
        <div class="col-sm-6">
          <div>
            <p class="text-center mb-2">Tiempo</p>
          </div>
          <div class="d-flex justify-content-center align-items-center">
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

            <div v-if="!showCustomTime" class="ft-timer__item--time-left">
              <span @click.prevent="openCustomTime()" class="my-0">
                {{ timeLeft }}
              </span>
            </div>

            <div v-if="showCustomTime" class="ft-timer__item--time-left active">
              <masked-input
                id="customTime"
                class="ft-timer__item--time-left-custom-time"
                name="customTime"
                placeholder="00:00"
                inputmode="numeric"
                :disabled="customTimeDisabled"
                :value="customTime.display"
                @input="onChangeTime($event)"
                @blur.native="setCustomTime($event)"
                :mask="{
                  pattern: 'DU:DU', // 59:59
                  formatCharacters: {
                    D: {
                      validate: char => /^[0-5]$/.test(char)
                    },
                    U: {
                      validate: char => /^[0-9]$/.test(char)
                    }
                  }
                }"
              />
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
                class="ft-timer__link"
                :class="{ disabled: setTimeDisabled }"
              >
                <a
                  :disabled="setTimeDisabled"
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
              class="ft-timer__link series"
              :class="[
                { active: currentWorkoutSerie === serie },
                { 'is-done': currentWorkoutSerie > serie },
                { disabled: serie !== currentWorkoutSerie }
              ]"
            >
              <a class="ft-timer__link--serie">
                {{ serie }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FtModal = () => import('../common/Modal.vue');

import MaskedInput from 'vue-masked-input';
import { mapGetters } from 'vuex';
import { mdbIcon } from 'mdbvue/lib';
import timer from '../../mixins/timer';
import { AudioPlayer } from '../../common/audio';

export default {
  name: 'ft-timer',

  components: {
    mdbIcon,
    FtModal,
    MaskedInput
  },

  mixins: [timer],

  data() {
    return {
      intervalTimer: null,
      intervalBeforeInit: null,
      selectedTime: 0,
      secondsLeft: 0,
      timeLeft: '00:00',
      initCountdown: false,
      isPaused: false,
      modalCountdownInit: false,
      modalFinish: false,
      timeCountdownBeforeInit: 0,
      isRestTime: false,
      initAutoTimer: false,
      customTime: {
        sec: 0,
        display: '00:00'
      },
      showCustomTime: false
    };
  },

  mounted() {
    this.setCountdownAudios();
  },

  computed: {
    ...mapGetters([
      'startDate',
      'currentExercise',
      'currentWorkoutSerie',
      'timerAuto',
      'timerWorkout',
      'timerWorkoutSeries',
      'workoutExercisesAllDone'
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

    time() {
      const time = this.currentExercise.time;
      const sec = time * 60;
      const display = this.setTextTime(time);

      return { sec, display };
    },

    currentExerciseTime() {
      return this.currentExercise && this.currentExercise.time;
    },

    restExercise() {
      return this.currentExercise.rest;
    },

    customTimeDisabled() {
      return (
        !this.startDate ||
        this.currentExerciseTime ||
        (this.startDisabled && !this.pauseDisabled) ||
        (!this.startDisabled && !this.stopDisabled)
      );
    },

    autoStartDisabled() {
      return (
        !this.startDate ||
        this.initAutoTimer ||
        this.workoutExercisesAllDone ||
        !this.currentExerciseTime
      );
    },

    stopDisabled() {
      return !this.selectedTime || this.secondsLeft === 0 || this.timerAuto;
    },

    startDisabled() {
      return (
        !this.selectedTime ||
        (this.secondsLeft > 0 && !this.isPaused) ||
        this.timerAuto
      );
    },

    pauseDisabled() {
      return (
        !this.selectedTime ||
        this.secondsLeft === 0 ||
        this.isPaused ||
        this.timerAuto
      );
    },

    setTimeDisabled() {
      return (
        !this.currentExerciseTime || this.selectedTime !== 0 || this.timerAuto
      );
    },

    modalFinishText() {
      if (
        (this.workoutExercisesAllDone || this.currentWorkoutSerieFinished) &&
        this.workoutFinish
      ) {
        return 'Enhorabuena! Has acabado el entrenamiento!';
      }

      if (this.workoutExercisesAllDone || this.currentWorkoutSerieFinished) {
        return 'Has finalizado la serie!';
      }

      return '';
    }
  },

  methods: {
    ///////////// AUTO TIMER ///////////
    async autoStart() {
      this.initAutoTimer = true;
      let index = 0;

      for (const exercise of this.timerWorkoutExercises) {
        // next exercise
        if (index > 0 && !this.intervalBeforeInit && !this.intervalTimer) {

          if (this.restBetweenExercise > 0 && this.currentExercise.done) {
            await this.nextExercise();
          } else {
            this.setNextExercise();
            this.setTime(this.time.sec);

            this.initCountdown = true;
            this.countdown(this.selectedTime);

            const timeoutCountdown = (this.selectedTime + 1) * 1000; // 1 seconds to add margin between countdown rest
            await this.timeout(timeoutCountdown);
          }
        } else {
          // First Exercise Set time
          this.timeCountdownBeforeInit = 10;
          this.setTime(this.time.sec);

          // 10 seconds before Init
          await this.countdownReadyAndRest(this.timeCountdownBeforeInit);

          // Stop audio 10sec
          AudioPlayer.stopAlarm(this.audioInit);
          this.modalCountdownInit = false;

          // Init countdown
          this.initCountdown = true;
          this.countdown(this.selectedTime);
          await this.timeout(this.selectedTime * 1000);
        }

        index++;
      }

      if (this.workoutExercisesAllDone) {
        this.$store.dispatch('SET_NEXT_EXERCISE'); // trigger next exercise to mark as done and serie finish
        this.openModalFinish();
      }

      this.initAutoTimer = false;
    },

    ///////////////  NEXT EXERCISE  ////////////////
    // onCloseModal(ev) {
    //  // TO DO Reset countdown or rest countdown an start next
    //   window.clearInterval(this.intervalBeforeInit);
    //   window.clearInterval(this.intervalTimer);
    //   AudioPlayer.stopAlarm(this.audioInit);
    //   this.modalCountdownInit = ev;
    //   // this.countdown(this.selectedTime);
    // },

    async nextExercise() {
      this.resetCountdown();

      if (this.restBetweenExercise > 0 && this.currentExercise.done) {
        this.isRestTime = true;
        this.timeCountdownBeforeInit = this.restBetweenExercise;

        if (!this.initCountdown) {
          this.setNextExercise();
          this.setTime(this.time.sec);

          await this.countdownReadyAndRest(this.timeCountdownBeforeInit);

          AudioPlayer.stopAlarm(this.audioInit);
          this.modalCountdownInit = false;

          this.initCountdown = true;
          this.countdown(this.selectedTime);

          const timeoutCountdown = (this.selectedTime + 1) * 1000; // 2 seconds to add margin between countdown rest
          await this.timeout(timeoutCountdown);

          // Check if finish
          this.openModalFinish();
        }

        this.isPaused = false;
      } else {
        this.setNextExercise();
      }
    },

    setNextExercise() {
      this.$store.dispatch('SET_NEXT_EXERCISE');
      this.openModalFinish();
    },

    ///////////////  COUNTDOWN  ///////////////////
    setCountdownAudios() {
      const initSrc = this.getAudioSource(this.audioInitSource);
      const finishSrc = this.getAudioSource(this.audioFinishSource);
      this.audioInit = AudioPlayer.createAudio(initSrc);
      this.audioFinish = AudioPlayer.createAudio(finishSrc);
    },

    transformDisplayTime(time) {
      const timeDisplay = time.split(':');
      let min = timeDisplay[0].replace('_', '0');
      let sec = timeDisplay[1].replace('_', '0');

      const seconds = parseInt(min, 10) * 60 + parseInt(sec, 10);
      return seconds;
    },

    onChangeTime(ev) {
      const sec = this.transformDisplayTime(ev);
      this.customTime.sec = sec;
      this.customTime.display = ev;
    },

    openCustomTime() {
      if (!this.customTimeDisabled) {
        this.showCustomTime = true;
      }
    },

    setCustomTime(ev) {
      console.log('blur', ev.target.value);
      this.setTime(this.customTime.sec);
      this.showCustomTime = false;
    },

    setTime(seconds) {
      clearInterval(this.intervalTimer);
      this.displayTimeLeft(seconds);
      this.selectedTime = seconds;
    },

    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    countdown(selectedTime) {
      this.secondsLeft = selectedTime;

      this.intervalTimer = setInterval(() => {

        if (!this.isPaused) {
          this.secondsLeft = this.secondsLeft - 1;
        }

        if (this.secondsLeft <= 0) {
          AudioPlayer.playAlarm(false, this.audioFinish);
          clearInterval(this.intervalTimer);
          this.intervalTimer = null;

          this.$store.dispatch('SET_CURRENT_EXERCISE_DONE');

          if (this.workoutExercisesAllDone) {
            this.$store.dispatch('SET_NEXT_EXERCISE'); // trigger next exercise to mark as done and serie finish
            this.openModalFinish();
          }

          this.resetCountdown();

          return;
        }

        this.displayTimeLeft(this.secondsLeft);
      }, 1000);

      // await this.setTimeout(this.secondsLeft);
    },

    countDownBeforeInit(seconds) {
      this.timeCountdownBeforeInit = seconds;

      this.intervalBeforeInit = setInterval(() => {

        // 10 seconds countdown audio
        if (this.timeCountdownBeforeInit <= 10) {
          AudioPlayer.playAlarm(false, this.audioInit);
        }

        if (this.timeCountdownBeforeInit <= 0) {
          clearInterval(this.intervalBeforeInit);
          this.intervalBeforeInit = null;
          return this.timeCountdownBeforeInit;
        }

        this.timeCountdownBeforeInit = this.timeCountdownBeforeInit - 1;

        return this.timeCountdownBeforeInit;
      }, 1000);
    },

    async countdownReadyAndRest(sec) {
      const delay = (sec + 1) * 1000; // miliseconds
      this.modalCountdownInit = true;
      this.countDownBeforeInit(sec);

      await this.timeout(delay);
    },

    async startCountdown() {
      if (!this.initCountdown) {
        this.timeCountdownBeforeInit = 10;
        await this.countdownReadyAndRest(this.timeCountdownBeforeInit);

        AudioPlayer.stopAlarm(this.audioInit);
        this.modalCountdownInit = false;
        this.initCountdown = true;
        this.countdown(this.selectedTime);
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
      clearInterval(this.intervalBeforeInit);
      this.initCountdown = false;
      this.selectedTime = 0;
      this.secondsLeft = 0;
      this.timeLeft = '00:00';
      this.isRestTime = false;
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
    },

    showModalFinish() {
      this.modalFinish = true;
    },

    openModalFinish() {
      if (
        this.workoutFinish ||
        this.currentWorkoutSerieFinished ||
        this.workoutExercisesAllDone
      ) {
        this.showModalFinish();
      }
    },

    onCloseModalFinish(ev) {
      this.modalFinish = ev;
    }
  },

  beforeDestroy() {
    clearInterval(this.intervalTimer);
    clearInterval(this.intervalBeforeInit);
    this.intervalTimer = null;
    this.intervalBeforeInit = null;
  }
};
</script>

<style lang="scss" scoped>
$padding-items-lg: 7px 12px;
$padding-items-sm: 4px 8px;
$height-countdown-items: 45px;

.ft-timer {
  &__time-countdown-before-init {
    margin: 0 auto;
    border: 5px solid $teal;
    background-color: $white;
    border-radius: 50px;
    padding: 5px;
    width: 95px;
    height: 95px;

    &--text {
      color: $teal !important;
      padding-top: 19px;
      font-weight: bold;
    }
  }

  &__item {
    &--time-left {
      height: $height-countdown-items;
      border: $border-item;
      border-radius: 5px;
      padding: 12px 8px;
      background-color: $gray-200;

      span {
        font-size: 2.5rem;
        font-weight: bold;
        color: $gray-900 !important;
      }

      &-custom-time {
        width: 105px;
        height: 35px;
        background-color: $gray-200;
        border: none;
        font-weight: bold;
        color: $gray-900 !important;
        font-size: 2.5rem;
        position: relative;
        top: -10px;
      }
    }

    &--time-left.active {
      border: 3px solid $mandarine-gradient;
    }

    &--player,
    &--times {
      height: $height-countdown-items;
      padding: $padding-items-sm;
    }
  }

  &__link {
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
    border-color: $mandarine !important;
    background-color: $mandarine-gradient;
    a {
      color: $white !important;
    }
  }

  &__link.active:hover {
    color: $white;
  }

  &__link.series.active:hover {
    color: $red !important;
  }

  &__link.disabled {
    border-color: $gray-700;
    a {
      color: $gray-700 !important;
    }
  }

  &__link.is-done.disabled {
    border: 1px solid $teal-dark;
    a {
      color: $teal-dark !important;
    }
  }
}
</style>
