<template>
  <div class="ft-exercise-list container">
    <div v-if="list && list.length > 0">
      <draggable
        class="dragArea row"
        handle=".draggable-handle"
        :list="list"
        :group="{ name: 'workout', pull: 'clone', put: false }"
        :clone="cloneExercise"
        :sort="false"
        @change="log"
      >
        <div
          v-for="item in list"
          :key="item._id"
          class="col-xs-8 col-sm-6 col-lg-4 col-xl-3 p-1"
        >
          <exercise-card-animation
            v-if="isExercise"
            :data="item"
          ></exercise-card-animation>
          <workout-card-animation
            v-else-if="!isExercise"
            :data="item"
          ></workout-card-animation>
        </div>
      </draggable>
    </div>

    <div v-if="list.length === 0" class="row">
      No se encontraron ejercicios...
    </div>
  </div>
</template>

<script>
const ExerciseCardAnimation = () => import('./ExerciseCardAnimation.vue');
const WorkoutCardAnimation = () => import('../workout/WorkoutCardAnimation.vue');

import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';

export default {
  name: 'exercise-list',

  components: {
    ExerciseCardAnimation,
    WorkoutCardAnimation,
    draggable
  },

  props: {
    type: {
      type: String,
      default: 'exercise'
    },
    list: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    ...mapGetters(['exercisesCount', 'workoutsCount']),

    isExercise() {
      return this.type === 'exercise';
    }
  },

  methods: {
    log(evt) {
      window.console.log('MOVED', evt);
    },
    cloneExercise(exercise) {
      const time = Date.now();
      return {
        idGlobal: `${exercise._id}-${time}`,
        ...exercise
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-exercise-list {
  &__total {
    font-size: 1.2em;
  }
}
</style>
