<template>
  <div class="ft-timer">
    <div class="container">
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
          currentWorkoutSerie {{ currentWorkoutSerie }}
          <br />
          timerWorkoutSeries {{ timerWorkoutSeries }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdbIcon } from 'mdbvue';
import timer from '../../mixins/timer';
import { AudioPlayer } from '../../common/audio';

export default {
  name: 'ft-timer',

  components: {
    mdbIcon
  },

  mixins: [timer],

  data() {
    return {
      intervalTimer: null,
      selectedTime: 0,
      secondsLeft: 0,
      timeLeft: '00:00',
      isPaused: false,
      audio: null
    };
  },

  mounted: function() {
    this.audio = AudioPlayer.createAudio();
  },

  computed: {
    ...mapGetters([
      'timerAuto',
      'currentExercise',
      'currentWorkoutSerie',
      'timerWorkoutSeries'
    ]),

    times() {
      const time = this.currentExercise.time;
      const sec = time * 60;
      const display = this.setTextTime(time);

      return [{ sec, display }];
    },

    rest() {
      return (
        this.$store.state.workoutGo.timer.currentExercise.rest ||
        this.$store.state.workoutGo.timer.workout.restBetweenExercise
      );
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

    ///////////////  COUNTDOWN  ///////////////////
    setTime(seconds) {
      clearInterval(this.intervalTimer);
      this.timer(seconds);
    },

    timer(seconds) {
      this.displayTimeLeft(seconds);
      this.selectedTime = seconds;
      // this.initialTime = seconds;
      // this.countdown(end);
    },

    countdown(selectedTime) {
      // this.initialTime = this.selectedTime;
      this.secondsLeft = selectedTime;

      this.intervalTimer = setInterval(() => {
        console.log(this.secondsLeft);

        if (!this.isPaused) {
          this.secondsLeft = this.secondsLeft - 1;
        }

        if (this.secondsLeft <= 0) {
          clearInterval(this.intervalTimer);
          return;
        }

        this.displayTimeLeft(this.secondsLeft);

      }, 1000);
    },

    startCountdown() {
      if (this.secondsLeft === 0) {
        if (this.intervalTimer) {
          clearInterval(this.intervalTimer);
        }
        this.countdown(this.selectedTime);
      }

      this.isPaused = false;
    },

    pauseCountdown() {
      this.isPaused = true;
    },

    stopCountdown() {
      clearInterval(this.intervalTimer);
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
