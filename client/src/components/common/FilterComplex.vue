<template>
  <div class="ft-filter-complex">
    <div
      v-for="filter in filters"
      :key="filter"
      class="ft-filter-complex__filter"
    >
      <ft-filter-tags
        :value="filter.value"
        :tagField="filter.tagField"
        :tags="filter.tags"
        :items="items"
        @filter="filterExercises($event)"
      ></ft-filter-tags>
    </div>

    <div class="ft-filter-complex__filter">
      <ft-search
        :reset-value="resetSearchNameValue"
        :items="totalExercises"
        @search="searchExercisesByName($event)"
      ></ft-search>
    </div>
  </div>
</template>

<script>
const FtSearch = () => import('../components/common/Search.vue');
const FtFilterTags = () => import('../components/common/FilterTags.vue');

import { SPORTS, LEVELS, BODY_PARTS, TARGETS } from '../common/constants';

export default {
  name: 'ft-filter-complex',

  props: {
    items: Array,
    config: {
      type: Object,
      default: () => {
        return {
          hasSearch: true,
          hasFilters: true,
          filters: [
            {
              value: [],
              tagField: 'bodyPart',
              tags: []
            }
          ],
          filterAllIn: false
        };
      }
    }
  },
  components: {
    FtSearch,
    FtFilterTags
  },

  async mounted() {
    const exercises = await this.$store.dispatch('GET_EXERCISES');
    this.exercisesFiltered = exercises;
  },

  data() {
    return {
      exercisesFiltered: [],
      filterBodyPartValues: [],
      resetSearchNameValue: false,
      sports: SPORTS,
      levels: LEVELS,
      bodyParts: BODY_PARTS,
      targets: TARGETS
    };
  },

  computed: {
  },

  methods: {
    searchExercisesByName(exercises) {
      this.filterBodyPartValues = [];
      this.resetSearchNameValue = false;
      this.exercisesFiltered = exercises;
      this.pagination.currentPage = 1;
    },

    filterExercises(exercises) {
      this.resetSearchNameValue = true;
      this.exercisesFiltered = exercises;
      this.pagination.currentPage = 1;
    },


    searchExercisesAllIn(exercises) {
      return exercises;
    },

    filterExercisesAllIn(exercises) {
      return exercises;
    },

    filterAllin(exercises) {
      this.pagination.currentPage = 1;
      this.exercisesFiltered = this.searchExercisesByName(exercises);
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-filter-complex {
}
</style>
