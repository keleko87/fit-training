<template>
  <div class="ft-exercise-card grid">
    <!-- MODAL -->
    <modal-poll
      :modal="modalPoll"
      :position="'bottom'"
      :direction="'right'"
      @close="onCloseModal($event)"
    >
      <template slot="header">
        <h3 class="mb-0">{{ data.name }}</h3>
      </template>
      <template slot="body">
        <exercise-detail
          :info="data"
          @submitStatus="onCloseModal($event)"
        ></exercise-detail>
      </template>
    </modal-poll>

    <!-- CARD -->
    <figure :class="effectClass">
      <img
        :src="getImage(data)"
        @error="defaultExerciseImage($event, data)"
        alt="image url"
      />
      <figcaption>
        <h6 class="ft-exercise-card__figcaption-name">{{ data.name }}</h6>
        <div class="ft-exercise-card__action">
          <div class="d-flex">
            <div @click="showExercise()">
              <mdb-icon class="ft-card__icon" icon="info-circle" size="6x" />
            </div>

            <div class="ft-exercise-card__action--move">
              <!-- IMPORTANTE: class="draggable-handle" es necesaria para que funcione <draggable :handle=".handle"> -->
              <mdb-icon
                class="ft-card__icon draggable-handle"
                icon="arrows-alt"
                size="7x"
              />
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
const ModalPoll = () => import('../common/ModalPoll.vue');
const ExerciseDetail = () => import('./ExerciseDetail.vue');

import { mdbIcon } from 'mdbvue/lib';
import mediaSource from '../../mixins/mediaSource';

export default {
  name: 'exercise-card-animation',

  props: {
    data: {
      type: Object
    },
    effect: {
      type: String,
      default: 'sadie'
    }
  },

  mixins: [mediaSource],

  components: {
    ExerciseDetail,
    ModalPoll,
    mdbIcon
  },

  data() {
    return {
      modalPoll: false
    };
  },

  computed: {
    effectClass() {
      return `effect-${this.effect}`;
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
