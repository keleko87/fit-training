<template>
  <div class="ft-exercise-list container">
    <div class="d-flex justify-content-between">
      <div class="row">
        <h5 class="ft-exercise-list__total">{{ itemsCount }} resultados</h5>
      </div>
      <div class="row">
        <ft-pagination
          :total-pages="totalPages"
          :total="itemsCount"
          :current-page="pagination.currentPage"
          :per-page="pagination.perPage"
          @pagechanged="onPageChange($event)"
        >
        </ft-pagination>
      </div>
    </div>

    <div v-if="items && items.length > 0">
      <draggable
        class="dragArea row"
        handle=".draggable-handle"
        :list="items"
        :group="{ name: 'workout', pull: 'clone', put: false }"
        :clone="cloneExercise"
        :sort="false"
        @change="log"
      >
        <div
          v-for="item in items"
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

    <div v-if="items.length === 0" class="row">
      No se encontraron ejercicios...
    </div>
  </div>
</template>

<script>
const ExerciseCardAnimation = () => import('./ExerciseCardAnimation.vue');
const WorkoutCardAnimation = () => import('../workout/WorkoutCardAnimation.vue');
const FtPagination = () => import('../common/Pagination.vue');

import { mapGetters } from 'vuex';
import pagination from '../../mixins/pagination';
import draggable from 'vuedraggable';

export default {
  name: 'exercise-list',

  components: {
    ExerciseCardAnimation,
    WorkoutCardAnimation,
    FtPagination,
    draggable
  },

  props: {
    type: {
      type: String,
      default: 'exercise'
    },
    list: {
      type: Array
    }
  },

  mixins: [pagination],

  computed: {
    ...mapGetters(['exercisesCount', 'workoutsCount']),

    items() {
      const itemsList = this.list;
      // Return just page of items needed
      return this.pageItems(itemsList);
    },

    itemsCount() {
      return this.isExercise ? this.exercisesCount : this.workoutsCount;
    },

    totalPages() {
      return this.getTotalPages(this.itemsCount);
    },

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
