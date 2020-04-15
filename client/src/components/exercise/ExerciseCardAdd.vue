<template>
  <div class="ft-exercise-card-add grid">
    <!-- MODAL -->
    <modal-poll
      :modal="modalPoll"
      :position="'left'"
      :direction="'left'"
      @close="onCloseModal($event)"
    >
      <template slot="header">
        <h3>{{ data.name }}</h3>
      </template>
      <template slot="body">
        <exercise-edit
          :info="data"
          @submitStatus="onCloseModal($event)"
        ></exercise-edit>
      </template>
    </modal-poll>

    <!-- CARD -->
    <figure :class="effectClass">
      <small
        v-if="data.series && data.series !== 0"
        class="ft-exercise-card-add__series"
        >{{ data.series }}</small
      >
      <small v-if="data.reps" class="ft-exercise-card-add__reps">x{{ reps }}</small>
      <small
        v-else-if="data.time && data.time !== 0"
        class="ft-exercise-card-add__series"
        >{{ time }}</small
      >

      <img :src="getImage(data.imageUrl)" alt="image url" />

      <figcaption>
        <h6 class="ft-exercise-card-add__figcaption-name">{{ data.name }}</h6>
        <div class="ft-exercise-card-add__action">
          <div class="d-flex">
            <div @click="editExercise()">
              <mdb-icon class="ft-card__icon" icon="pen" />
            </div>
            <div class="ft-exercise-card-add__action--move">
              <!-- IMPORTANTE: class="draggable-handle" es necesaria para que funcione <draggable :handle=".handle"> -->
              <mdb-icon
                class="ft-card__icon draggable-handle"
                icon="arrows-alt"
                size="8x"
              />
            </div>
            <div @click="deleteExercise(data.idGlobal)">
              <mdb-icon class="ft-card__icon" icon="trash-alt" />
            </div>
          </div>
        </div>
      </figcaption>
    </figure>
  </div>
</template>
<script>
import { mdbIcon } from 'mdbvue';
import ExerciseEdit from './ExerciseEdit';
import ModalPoll from '../common/ModalPoll';
import timer from '../../mixins/timer';

export default {
  name: 'exercise-card-add',

  props: {
    data: {
      type: Object
    },
    effect: {
      type: String,
      default: 'sadie'
    }
  },

  mixins: [timer],

  components: {
    ExerciseEdit,
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
    getImage(imageUrl) {
      return `${process.env.VUE_APP_UPLOADS}${imageUrl}`;
    },

    onCloseModal(ev) {
      this.modalPoll = ev;
    },

    editExercise() {
      this.modalPoll = true;
    },

    deleteExercise(idGlobal) {
      this.$store.dispatch('DELETE_WORKOUT_EXERCISE', idGlobal);
      this.$emit('delete', idGlobal);
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-exercise-card-add {
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
