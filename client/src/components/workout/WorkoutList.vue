<template>
  <div class="ft-workout-list">
    <!-- FILTERS -->
    <div class="ft-workout-list__section">
      <div class="container">
        <div class="ft-workout-list__filters d-flex justify-content-start">
          <div class="ft-workout-list__filters--item ml-1 mr-2">
            <ft-filter-tags
              ref="filterBodyPart"
              :placeholder="'Parte del cuerpo'"
              :value="bodyPart.filterValues"
              :tagField="'bodyPart'"
              :tags="bodyParts"
              :items="totalWorkouts"
              @filter="filterAllIn($event)"
            ></ft-filter-tags>
          </div>

          <div class="ft-workout-list__filters--item mx-2">
            <ft-filter-tags
              ref="filterBodyPart"
              :placeholder="'Actividad'"
              :value="sport.filterValues"
              :tagField="'sport'"
              :tags="sports"
              :items="totalWorkouts"
              @filter="filterAllIn($event)"
            ></ft-filter-tags>
          </div>

          <div class="ft-workout-list__filters--item mx-2">
            <ft-search
              ref="searchName"
              :reset-value="resetSearchNameValue"
              :items="totalWorkouts"
              :placeholder="'Buscar'"
              @search="filterAllIn($event)"
            ></ft-search>
          </div>
        </div>
      </div>
    </div>

    <!-- WORKOUT INFO -->
    <div class="container">
      <div class="d-flex justify-content-between my-3 p-1">
        <div class="">
          <h4>Entrenamientos disponibles</h4>
        </div>
        <div class="ft-workout-list__create">
          <router-link
            class="btn btn-primary btn-sm btn-block"
            :to="{ name: 'workoutNew' }"
          >
            Nuevo entrenamiento
          </router-link>
        </div>
      </div>

      <div
        v-if="itemsPage.length > 0"
        class="row d-flex justify-content-between"
      >
        <div class="ft-workout-list__total col-md-6 m-0">
          <!-- <p class="ft-workout-list__total">
            {{ itemsPage.length }} de {{ itemsCount }} resultados
          </p> -->
          <p class="ft-workout-list__total--paragraph">
            <span v-if="currentRange.first && currentRange.last">
              {{ currentRange.first }} a {{ currentRange.last }} de
            </span>
            <span v-else-if="currentRange.first">
              {{ currentRange.first }} de
            </span>
            <span>{{ itemsCount }} resultados</span>
          </p>
        </div>

        <!-- PAGINATION -->
        <div class="ft-workout-list__pagination col-md-6">
          <ft-pagination
            class="mr-1"
            :total-pages="totalPages"
            :total="itemsCount"
            :current-page="pagination.currentPage"
            :per-page="pagination.perPage"
            @pagechanged="onPageChange($event)"
          >
          </ft-pagination>
        </div>
      </div>

      <div
        v-else
        class="ft-workout-list__not-found d-flex justify-content-center align-items-center"
      >
        <div>
          <img
            src="@/assets/img/fit-boxing-logo-white.png"
            alt="not found results"
            class="mx-auto"
          />
          <h3 class="text-center">No se encontraron resultados</h3>
        </div>
      </div>

      <!-- WORKOUT LIST -->
      <div class="row">
        <div class="col-12" v-if="itemsPage && itemsPage.length">
          <exercise-list :list="itemsPage" :type="'workout'"></exercise-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FtFilterTags = () => import('../common/FilterTags.vue');
const FtSearch = () => import('../common/Search.vue');
const FtPagination = () => import('../common/Pagination.vue');
const ExerciseList = () => import('../exercise/ExerciseList.vue');
import { SPORTS, BODY_PARTS } from '../../common/constants';

import pagination from '../../mixins/pagination';

export default {
  name: 'workout-list',

  components: {
    FtFilterTags,
    FtSearch,
    FtPagination,
    ExerciseList
  },

  async mounted() {
    const workouts = await this.$store.dispatch('GET_WORKOUTS');
    this.workoutsFiltered = workouts;
  },

  mixins: [pagination],

  data() {
    return {
      workoutsFiltered: [],
      sport: {
        filterValues: [],
        items: []
      },
      bodyPart: {
        filterValues: [],
        items: []
      },
      filterValues: [],
      searchNameValues: [],
      resetSearchNameValue: false,
      sports: SPORTS,
      bodyParts: BODY_PARTS
    };
  },

  computed: {
    totalWorkouts() {
      return this.$store.state.workout.totalWorkouts;
    },

    itemsPage() {
      // Return just page of items needed
      return this.pageItems(this.workoutsFiltered);
    },

    itemsCount() {
      return this.workoutsFiltered.length;
    },

    totalPages() {
      return this.getTotalPages(this.itemsCount);
    },

    currentRange() {
      return this.rangeOfItems.filter(
        (range, i) => i + 1 === this.pagination.currentPage
      )[0];
    },

    bodyPartValueNotResult() {
      return this.bodyPart.filterValues.length && !this.bodyPart.items.length;
    },

    sportValueNotResult() {
      return this.sport.filterValues.length && !this.sport.items.length;
    },

    filterValuesNotResult() {
      return (
        (this.bodyPart.filterValues.length || this.sport.filterValues.length) &&
        !this.filterValues.length
      );
    },

    // REFACTOR
    rangeOfItems() {
      const ranges = [];

      for (let i = 0; i < this.totalPages; i++) {
        let currentRange = [];

        for (let j = 0; j < this.pagination.perPage; j++) {
          const initItem = this.pagination.perPage * i + 1;
          const currentItem = initItem + j;
          currentRange.push(currentItem);

          if (currentItem === this.itemsCount) {
            ranges[i] = currentRange;
            break;
          }
        }
        ranges[i] = currentRange;
      }

      const rangesMap = ranges.map(range => {
        const [first, ...rest] = range;
        const last = rest[rest.length - 1];

        return {
          first,
          last
        };
      });

      return rangesMap;
    }
  },

  methods: {
    // Este metodo solo se utiliza cuando NO queremos que se sumen los filtros + buscador. Lo contrario a filterAllIn
    searchExercisesByName(ev) {
      this.bodyPart.filterValues = [];
      this.resetSearchNameValue = false;
      this.workoutsFiltered = ev;
      this.pagination.currentPage = 1;
    },

    // Este metodo solo se utiliza cuando NO queremos que se sume el buscador + filtro. Lo contrario a filterAllIn
    filterExercises(ev) {
      this.resetSearchNameValue = true;
      this.workoutsFiltered = ev;
      this.pagination.currentPage = 1;
    },

    filterAllIn(ev) {
      let exercises = this.totalWorkouts;

      // Not items found
      if (!ev.items.length) {
        exercises = [];
        this.workoutsFiltered = exercises;
        if (ev.filterValues) {
          this.addFilterValues(ev);
        }
        return;
      }

      // Search input event
      if (ev.query !== undefined) {
        exercises = this.eventQuery(ev);
      }

      // Filter multiselect field event
      if (ev.filterValues) {
        this.addFilterValues(ev);

        // Check tagField and filter values
        exercises = this.filterItemsByTagField(ev.tagField, exercises);

        // Search input has a value
        if (this.searchNameValues.length) {
          exercises = this.findFilterItems(exercises, this.searchNameValues);
        }
      }

      this.workoutsFiltered = [...new Set(exercises)]; // new Set() will be remove duplicate values
      this.pagination.currentPage = 1;
    },

    addFilterValues(ev) {
      switch (ev.tagField) {
        case 'sport':
          this.sport.filterValues = ev.filterValues;
          this.sport.items = ev.items;
          break;
        case 'bodyPart':
          this.bodyPart.filterValues = ev.filterValues;
          this.bodyPart.items = ev.items;
          break;
        default:
          break;
      }
    },

    filterByTags(currentEvField, prevField, exercises) {
      let result;

      // 1 PrevField not set any value
      if (!prevField.filterValues.length) {
        result = this.findFilterItems(exercises, currentEvField.items);

        // 2 PrevField set a value but not items found
      } else if (prevField.filterValues.length && !prevField.items.length) {
        result = [];

        // 3 PrevField has a value and found items
      } else if (prevField.items.length) {
        const exers = this.findFilterItems(exercises, currentEvField.items);
        result = this.findFilterItems(exers, prevField.items);
      }

      return result;
    },

    filterItemsByTagField(tagField, items) {
      let result;

      switch (tagField) {
        case 'sport':
          result = this.filterByTags(this.sport, this.bodyPart, items);
          break;
        case 'bodyPart':
          result = this.filterByTags(this.bodyPart, this.sport, items);
          break;
        default:
          break;
      }

      this.filterValues = result;

      return result;
    },

    eventQuery(ev) {
      this.searchNameValues = ev.items;
      let items = ev.items;

      if (this.bodyPartValueNotResult || this.sportValueNotResult) {
        items = [];
      } else if (this.filterValuesNotResult) {
        items = [];
      } else if (this.filterValues.length) {
        items = this.findFilterItems(items, this.filterValues);
      }

      return items;
    },

    findFilterItems(items, filterField) {
      return items.filter(item => {
        return filterField.find(value => item._id === value._id);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-workout-list {
  &__section {
    background-color: $bg-filters-section;
    padding: 0 0 18px 0;
  }

  &__filters {
    @media (max-width: 575px) {
      flex-direction: column;
      padding: 20px 60px;

      &--item {
        padding-bottom: 10px;
        margin-left: 0.5em !important;
      }
    }
  }

  &__create {
    &--link {
      color: $mandarine !important;
      font-size: 1.3em;
    }
  }

  &__pagination {
    justify-content: flex-end;
  }

  &__total {
    &--paragraph {
      font-size: 1rem;
      margin: 8px 5px;

      span {
        color: $gray-500 !important;
      }
    }
  }

  &__pagination,
  &__total {
    display: flex;
    margin-bottom: 1em;

    @media (max-width: 575px) {
      justify-content: center;
    }
  }

  &__not-found {
    height: 70vh;
  }
}
</style>
