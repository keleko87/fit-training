<template>
  <div id="app" class="ft-timer">
    <div class="outer-container">
      <div class="inner-container">
        <div class="countdown">
          <h2>
            {{ timeLeft }}
          </h2>
          <!-- <h3>
            Countdown ends at <span>{{ endTime }}</span>
          </h3> -->
        </div>

        <ul class="columns is-mobile is-centered">
          <li v-for="(time, index) in times" :key="index" class="column time">
            <a
              v-on:click.prevent="setTime(time.sec)"
              :class="[
                'button',
                'is-link',
                { 'is-active': time.sec === selectedTime && endTime !== 0 }
              ]"
            >
              {{ time.display }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
let intervalTimer;

export default {
  name: 'ft-timer',

  props: {
    auto: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {
          currentWorkoutSerie: 0,
          currentExercise: {
            idGlobal: '',
            time: 1,
            rest: 0.5
          },
          workout: {
            series: 1,
            restBetweenExercise: 2
          },
          workoutExercises: [
            {
              idGlobal: '',
              time: 0,
              rest: 0
            }
          ]
        };
      }
    }
  },

  data() {
    return {
      selectedTime: 0,
      timeLeft: '00:00',
      endTime: '0'
      // times: [
      //   {
      //     sec: 3,
      //     display: '3s'
      //   }
      // ]
      // serie: 0,
      // rest: 0
    };
  },

  computed: {
    // selectedTime() {
    //   return this.times();
    // },
    times() {
      debugger
      const sec = this.data.currentExercise.time * 60;
      const display = `${sec}s`;
      return [{ sec, display }];
    },
    serie() {
      return this.data.currentWorkoutSerie;
    },
    rest() {
      return (
        this.data.currentExercise.rest || this.data.workout.restBetweenExercise
      );
    }
  },

  watch: {
    // selectedTime(val) {
    //   console.log('selected time change', val);
    // }
  },

  methods: {
    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },

    hourConvert(hour) {
      // 15 --> 3
      return hour % 12 || 12;
    },

    setTime(seconds) {
      clearInterval(intervalTimer);
      this.timer(seconds);
    },

    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.selectedTime = seconds;
      // this.initialTime = seconds;
      this.displayEndTime(end);
      this.countdown(end);
    },

    countdown(end) {
      // this.initialTime = this.selectedTime;
      intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },

    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.timeLeft = `${this.zeroPadded(minutes)}:${this.zeroPadded(seconds)}`;
    },

    displayEndTime(timestamp) {
      const end = new Date(timestamp);
      const hour = end.getHours();
      const minutes = end.getMinutes();

      this.endTime = `${this.hourConvert(hour)}:${this.zeroPadded(minutes)}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-timer {
  .outer-container {
    // display: flex;
    // align-items: center;
    // flex-direction: column;
    // justify-content: center;
  }

  .countdown {
    // margin: 5px 0 30px;
  }
  // h3 span {
  //   width: 70px;
  //   border-bottom: 2px solid hsl(348, 100%, 71%);
  //   margin-left: 15px;
  //   text-align: center;
  // }
  // .time {
  //   display: flex;
  //   justify-content: center;
  // }
  .columns {
    // margin-left: 0;
    // margin-right: 0;
  }
}
</style>
