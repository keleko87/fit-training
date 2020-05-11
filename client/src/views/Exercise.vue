<template>
  <div class="ft-exercise">
    <!-- MODAL -->
    <modal-poll :modal="modalPoll" @close="onCloseModal($event)">
      <template slot="header">
        <h3 class="mb-0">Crear ejercicio</h3>
      </template>
      <template slot="body">
        <exercise-new @submitStatus="onCloseModal($event)"></exercise-new>
      </template>
    </modal-poll>

    <!-- FILTERS -->
    <div class="ft-exercise__filters container d-flex justify-content-between">
      <div class="d-flex">
        <div class="mx-2">
          <ft-filter-tags
            ref="filterBodyPart"
            :placeholder="'Parte del cuerpo'"
            :value="bodyPart.filterValues"
            :tagField="'bodyPart'"
            :tags="bodyParts"
            :items="totalExercises"
            @filter="filterAllIn($event)"
          ></ft-filter-tags>
        </div>

        <div class="mx-2">
          <ft-filter-tags
            ref="filterBodyPart"
            :placeholder="'Actividad'"
            :value="sport.filterValues"
            :tagField="'sport'"
            :tags="sports"
            :items="totalExercises"
            @filter="filterAllIn($event)"
          ></ft-filter-tags>
        </div>
      </div>

      <div class="">
        <div class="nav-item mx-2">
          <ft-search
            ref="searchName"
            :reset-value="resetSearchNameValue"
            :items="totalExercises"
            :placeholder="'Buscar'"
            @search="filterAllIn($event)"
          ></ft-search>
        </div>
      </div>
    </div>


    <!-- FILTER MENU-->
    <!-- <div class="white">
      <div class="col-6">
        filters options here
        <a class="router-link" @click="modalPoll = true">
          Nuevo ejercicio
        </a>
      </div>
    </div> -->

    <div class="container">
      <div class="d-flex justify-content-between my-3">
        <div class="">
          <h4>Ejercicios disponibles</h4>
        </div>
         <div class="">
           <button class="btn btn-primary btn-sm btn-block" @click="modalPoll = true">
            Crear ejercicio
          </button>
        </div>
      </div>

      <div
        v-if="itemsPage.length > 0"
        class="d-flex justify-content-between container"
      >
        <div class="row">
          <!-- <p class="ft-exercise__total">
            {{ itemsPage.length }} de {{ itemsCount }} resultados
          </p> -->
          <p class="ft-exercise__total">
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
        <div class="row">
          <ft-pagination
            class="ft-exercise__pagination"
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
        class="ft-exercise__not-found d-flex justify-content-center align-items-center"
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

      <!-- EXERCISES LIST -->
      <div class="row">
        <div class="col-12" v-if="itemsPage && itemsPage.length">
          <exercise-list :list="itemsPage" :type="'exercise'"></exercise-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FtSearch = () => import('../components/common/Search.vue');
const FtFilterTags = () => import('../components/common/FilterTags.vue');
const FtPagination = () => import('../components/common/Pagination.vue');
const ExerciseList = () => import('../components/exercise/ExerciseList.vue');
const ExerciseNew = () => import('../components/exercise/ExerciseNew.vue');
const ModalPoll = () => import('../components/common/ModalPoll.vue');

import pagination from '../mixins/pagination';
import { SPORTS, LEVELS, BODY_PARTS, TARGETS } from '../common/constants';

export default {
  name: 'exercise',

  components: {
    FtSearch,
    FtFilterTags,
    ExerciseList,
    ExerciseNew,
    ModalPoll,
    FtPagination
  },

  async mounted() {
    const exercises = await this.$store.dispatch('GET_EXERCISES');
    this.exercisesFiltered = exercises;
  },

  mixins: [pagination],

  data() {
    return {
      exercisesFiltered: [],
      modalPoll: false,
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
      levels: LEVELS,
      bodyParts: BODY_PARTS,
      targets: TARGETS
    };
  },

  computed: {
    totalExercises() {
      return this.$store.state.exercise.totalExercises;
    },

    itemsPage() {
      // Return just page of items needed
      return this.pageItems(this.exercisesFiltered);
    },

    itemsCount() {
      return this.exercisesFiltered.length;
    },

    totalPages() {
      return this.getTotalPages(this.itemsCount);
    },

    currentRange() {
      return this.rangeOfItems.filter(
        (range, i) => i + 1 === this.pagination.currentPage
      )[0];
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
      this.exercisesFiltered = ev;
      this.pagination.currentPage = 1;
    },

    // Este metodo solo se utiliza cuando NO queremos que se sume el buscador + filtro. Lo contrario a filterAllIn
    filterExercises(ev) {
      this.resetSearchNameValue = true;
      this.exercisesFiltered = ev;
      this.pagination.currentPage = 1;
    },

    filterAllIn(ev) {
      let exercises = this.totalExercises;

      // Not items found
      if (!ev.items.length) {
        exercises = [];
        this.exercisesFiltered = exercises;
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

      this.exercisesFiltered = [...new Set(exercises)]; // new Set() will be remove duplicate values
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

      if (
        (this.bodyPart.filterValues.length && !this.bodyPart.items.length) ||
        (this.sport.filterValues.length && !this.sport.items.length)
      ) {
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
    },

    onCloseModal(ev) {
      this.modalPoll = ev;
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-exercise {
  &__filters {
    border-bottom: 1px solid $gray-600;
    background-color: $gray-800;
    padding: 0 10px 16px 10px;
  }

  &__total {
    font-size: 1rem;
    margin: 8px 5px;

    span {
      color: $gray-500 !important;
    }
  }

  &__not-found {
    height: 70vh;
  }
}
</style>
