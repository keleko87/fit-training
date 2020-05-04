<template>
  <div
    class="ft-workout-exercise-card grid"
    :class="[
      { 'current-exercise': isCurrentExercise },
      { 'exercise-done': exerciseDone }
    ]"
  >
    <!-- MODAL -->
    <ft-modal :size="'lg'" :modal="modalPoll" @close="onCloseModal($event)">
      <template slot="header">
        <h3 class="mb-0">{{ data.name }}</h3>
      </template>
      <template slot="body">
        <exercise-detail
          :info="data"
          @submitStatus="onCloseModal($event)"
        ></exercise-detail>
      </template>
    </ft-modal>

    <!-- CARD -->
    <figure :class="effectClass">
      <small
        v-if="data.series && data.series !== 0"
        class="ft-workout-exercise-card__series"
        >{{ data.series }}</small
      >
      <small v-if="data.reps" class="ft-workout-exercise-card__reps"
        >x{{ reps }}</small
      >
      <small
        v-else-if="data.time && data.time !== 0"
        class="ft-workout-exercise-card__series"
        >{{ time }}</small
      >

      <img
        :src="getImage(data)"
        @error="defaultExerciseImage($event, data)"
        alt="image url"
      />

      <figcaption>
        <h6 class="ft-workout-exercise-card__figcaption-name">
          {{ data.name }}
        </h6>
        <div class="ft-workout-exercise-card__action">
          <div class="d-flex">
            <div @click="showExercise()">
              <mdb-icon class="ft-card__icon" icon="info-circle" size="6x" />
            </div>
            <div @click="shareExercise()">
              <mdb-icon class="ft-card__icon" icon="share-alt" size="6x" />
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
  </div>
</template>
<script>
const ExerciseDetail = () => import('../exercise/ExerciseDetail.vue');
const FtModal = () => import('../common/Modal.vue');

import { mdbIcon } from 'mdbvue/lib';
import { mapGetters } from 'vuex';
import timer from '../../mixins/timer';
import mediaSource from '../../mixins/mediaSource';

export default {
  name: 'workout-exercises-card',

  props: {
    workoutGo: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object
    },
    effect: {
      type: String,
      default: 'sadie'
    }
  },

  mixins: [timer, mediaSource],

  components: {
    ExerciseDetail,
    FtModal,
    mdbIcon
  },

  data() {
    return {
      modalPoll: false
    };
  },

  computed: {
    ...mapGetters(['currentExercise']),

    isWorkoutGo() {
      return this.workoutGo;
    },

    workoutExercises() {
      return this.$store.state.workoutGo.timer.workoutExercises;
    },

    isCurrentExercise() {
      if (!this.isWorkoutGo) {
        return false;
      } else {
        return this.currentExercise.idGlobal === this.data.idGlobal;
      }
    },
    exerciseDone() {
      if (!this.isWorkoutGo) {
        return false;
      } else {
        const exercise = this.workoutExercises.find(
          exercise => exercise.idGlobal === this.data.idGlobal
        );

        return exercise ? exercise.done : false;
      }
    },
    effectClass() {
      return `effect-${this.effect}`;
    },
    time() {
      return this.setTextTime(this.data.time);
    },
    rest() {
      return this.setTextTime(this.data.rest);
    },
    reps() {
      return this.setTextReps(this.data.reps);
    }
  },

  methods: {
    onCloseModal(ev) {
      this.modalPoll = ev;
    },

    showExercise() {
      this.modalPoll = true;
    },

    shareExercise() {}
  }
};
</script>

<style lang="scss" scoped>
.ft-workout-exercise-card {
  &__series,
  &__reps {
    position: absolute;
    font-size: 1em;
    font-weight: bold;
    z-index: 1;
  }
  &__series {
    background-color: $teal;
    padding: 1px 8px;
    left: 0;
  }
  &__reps {
    // background-color: $white;
    color: $teal !important;
    padding: 1px 3px;
    left: 23px;
  }

  .ft-card__icon {
    font-size: 24px;
  }
  .ft-card__icon.handle {
    font-size: 29px;
  }
}
///////  CURRENT EXERCISE - DONE //////////
.current-exercise {
  border-bottom: 3px solid $mandarine-gradient !important;

  figure.effect-sadie h6 {
    top: 169px;
    color: $mandarine !important;
  }
}

.exercise-done {
  border-bottom: 3px solid $teal !important;

  figure.effect-sadie h6 {
    top: 169px;
    color: $teal !important;
  }

  figure.effect-sadie figcaption::before {
    background: -webkit-linear-gradient(
      top,
      rgba(72, 76, 97, 0) 0%,
      rgba(72, 76, 97, 0.8) 75%
    );
    background: linear-gradient(to bottom, rgba(72, 76, 97, 0) 0%, $teal 75%);
  }
}

figure.effect-sadie:hover h6 {
  color: $third-dark-grey !important;
}

/** Source:  https://bootsnipp.com/snippets/3Meen **/
.grid {
  position: relative;
  margin: 0 auto;
  min-width: 174px;
  min-height: 205px;
  max-width: 300px;
  max-height: 300px;
  border: 1px solid $second-dark-grey;
  background-color: $third-dark-grey;
  list-style: none;
  text-align: center;
}

/* Common style */
.grid figure {
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  height: auto;
  background-color: $white; // #949494;
  text-align: center;
  cursor: pointer;
}

.grid figure img {
  width: 100%;
  height: 140px;
  opacity: 0.8;
}

.grid figure figcaption {
  padding: 2em;
  color: $white;
  overflow: hidden;
  font-size: 0.3em;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.grid figure figcaption::before,
.grid figure figcaption::after {
  pointer-events: none;
}

.grid figure figcaption,
.grid figure figcaption > a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Anchor will cover the whole item by default */
/* For some effects it will show as a button */
.grid figure figcaption > a {
  z-index: 1000;
  text-indent: 200%;
  white-space: nowrap;
  font-size: 0;
  opacity: 0;
}

.grid figure h6 {
  word-spacing: -0.15em;
  font-weight: bold;
  padding: 3px 5px;
  color: $gray-300 !important;
}

.grid figure h6 span {
  font-weight: 800;
}

.grid figure h6,
.grid figure p {
  margin: 0;
}

.grid figure p {
  letter-spacing: 1px;
  font-size: 68.5%;
}
</style>
