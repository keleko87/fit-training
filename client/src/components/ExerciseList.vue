<template>
  <div class="ft-exercise-list__container container">
    <div v-if="exercises.length === 0" class="row">
      No se encontraron ejercicios...
    </div>

    <div v-else class="row">
      <div
        v-for="exercise in exercises"
        :key="exercise._id"
        class="col-xs-8 col-sm-6 col-lg-4 col-xl-3 p-1"
      >
        <exercise-card-animation :data="exercise"></exercise-card-animation>
      </div>
    </div>

    <div class="row">
      <div class="mx-auto">
        <ft-pagination
          :total-pages="totalPages"
          :total="exercisesCount"
          :current-page="pagination.currentPage"
          :per-page="pagination.perPage"
          @pagechanged="onPageChange($event)"
        >
        </ft-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExerciseCardAnimation from './ExerciseCardAnimation';
import FtPagination from './Pagination';
import pagination from '../mixins/pagination';

export default {
  name: 'exercise-list',

  components: {
    ExerciseCardAnimation,
    FtPagination
  },

  props: {
    type: {
      type: String,
      required: false,
      default: 'all'
    },
    list: {
      type: Array
    }
  },

  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 9
      }
    };
  },

  mixins: [pagination],

  computed: {
    ...mapGetters(['exercisesCount', 'totalExercises']),

    exercises() {
      const items = this.list || this.totalExercises;
      // Return just page of items needed
      return this.pageItems(items);
    },

    totalPages() {
      return this.getTotalPages(this.exercisesCount);
    }
  },

  mounted() {
    this.fetchExercises();
  },

  methods: {
    fetchExercises() {
      this.$store.dispatch('GET_EXERCISES');
    }
  }
};
</script>

<style lang="scss" scoped>
.exercise-container.content {
  height: auto;
}
</style>
