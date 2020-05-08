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

    <!-- NAVBAR -->
    <ft-header class="ft-exercise__nav-header">
      <template slot="nav-list">
        <li class="nav-item mx-2">
          <!-- trigger modal button -->
          <a class="router-link" @click="modalPoll = true">
            Nuevo ejercicio
          </a>
        </li>

        <h6>filterValues {{ filterValues.length }}</h6>
        <h6>sport.values {{ sport.filterValues }}</h6>
        <h6>bodyPart.value {{ bodyPart.filterValues }}</h6>

        <li class="nav-item mx-2">
          <ft-filter-tags
            ref="filterBodyPart"
            :value="bodyPart.filterValues"
            :tagField="'bodyPart'"
            :tags="bodyParts"
            :items="totalExercises"
            @filter="filterAllIn($event)"
          ></ft-filter-tags>
        </li>

        <li class="nav-item mx-2">
          <ft-filter-tags
            ref="filterBodyPart"
            :value="sport.filterValues"
            :tagField="'sport'"
            :tags="sports"
            :items="totalExercises"
            @filter="filterAllIn($event)"
          ></ft-filter-tags>
        </li>

        <li class="nav-item mx-2">
          <ft-search
            ref="searchName"
            :reset-value="resetSearchNameValue"
            :items="totalExercises"
            @search="filterAllIn($event)"
          ></ft-search>
        </li>
      </template>
    </ft-header>

    <!-- FILTER MENU-->
    <!-- <div class="white">
      <div class="col-6">
        filters options here
      </div>
    </div> -->

    <div class="container">
      <div class="row mt-3">
        <div class="col-12">
          <h4>Ejercicios disponibles</h4>
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
const FtHeader = () => import('../components/common/Header.vue');
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
    FtHeader,
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
      // searchQuery: '',
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
    searchExercisesByName(ev) {
      this.bodyPart.filterValues = [];
      this.resetSearchNameValue = false;
      this.exercisesFiltered = ev;
      this.pagination.currentPage = 1;
    },

    filterExercises(ev) {
      this.resetSearchNameValue = true;
      this.exercisesFiltered = ev;
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

    filterValuesByFieldsTags(currentEvField, prevField, exercises) {
      let result;

      if (!prevField.items && !prevField.filterValues) {
        result = exercises.filter(item => {
          return currentEvField.items.find(value => item._id === value._id);
        });
      } else if (
        !prevField.items ||
        (!prevField.items.length && prevField.items.length)
      ) {
        result = [];
      } else if (prevField.items.length) {
        const exercises1 = exercises.filter(item => {
          return currentEvField.items.find(value => item._id === value._id);
        });

        result = exercises1.filter(item => {
          return prevField.items.find(value => item._id === value._id);
        });
      }

      return result;
    },

    
    setExercisesByTagField(tagField, exercises) {
      switch (tagField) {
        case 'sport':
          exercises = this.filterValuesByFieldsTags(this.sport, this.bodyPart, exercises);
          break;
        case 'bodyPart':
          exercises = this.filterValuesByFieldsTags(this.bodyPart, this.sport, exercises);
          break;
        default:
          break;
      }
      
      return exercises;
    },

    eventQuery(ev, filterValues) {
      this.searchNameValues = ev.items;
      // this.searchQuery = ev.query;
      let exercises = ev.items;

      if (filterValues.length) {
        exercises = ev.items.filter(item => {
          return filterValues.find(value => item._id === value._id);
        });
      } else {
        exercises = [];
      }

      return exercises;
    },

    newFilterAllIn(ev) {
      let exercises = this.totalExercises;

      if (!ev.items.length) {
        exercises = [];
        this.exercisesFiltered = exercises;
        if (ev.filterValues) {
          this.addFilterValues(ev);
        }
        return;
      }

      if (ev.query !== undefined) {
        exercises = this.eventQuery(ev, this.filterValues);
      }

      if (ev.filterValues) {
        this.addFilterValues(ev);

        // Check tagField and filter values
        exercises = this.setExercisesByTagField(ev.tagField, exercises);

        if (this.searchNameValues.length) {
          exercises = exercises.filter(item => {
            return this.searchNameValues.find(value => item._id === value._id);
          });
        }
      }

      this.exercisesFiltered = [...new Set(exercises)]; // new Set() will be remove duplicate values
      this.pagination.currentPage = 1;
    },

    // IT WORKS GOOD! BUT NEEDS REFACTOR!
    filterAllIn(ev) {
      let exercises = this.totalExercises;

      if (!ev.items.length) {
        exercises = [];
        this.exercisesFiltered = exercises;

        if (ev.filterValues) {
          this.addFilterValues(ev);
        }

        return;
      }

      if (ev.query !== undefined) {
        this.searchNameValues = ev.items;
        // this.searchQuery = ev.query;
        exercises = ev.items;

        if (this.filterValues.length) {
          exercises = exercises.filter(item => {
            return this.filterValues.find(value => item._id === value._id);
          });
        } else {
          exercises = [];
        }
      }

      if (ev.filterValues) {
        this.addFilterValues(ev);

        if (ev.tagField === 'sport') {
          if (!this.bodyPart.items && !this.bodyPart.filterValues) {
            exercises = exercises.filter(item => {
              return this.sport.items.find(value => item._id === value._id);
            });
          } else if (
            !this.bodyPart.items ||
            (!this.bodyPart.items.length && this.bodyPart.items.length)
          ) {
            exercises = [];
          } else if (this.bodyPart.items.length) {
            const exercises1 = exercises.filter(item => {
              return this.sport.items.find(value => item._id === value._id);
            });

            exercises = exercises1.filter(item => {
              return this.bodyPart.items.find(value => item._id === value._id);
            });
          }

          this.filterValues = exercises;
        }

        if (ev.tagField === 'bodyPart') {
          if (!this.sport.items && !this.sport.filterValues) {
            exercises = exercises.filter(item => {
              return this.bodyPart.items.find(value => item._id === value._id);
            });
          } else if (
            !this.sport.items ||
            (!this.sport.items.length && this.sport.filterValues.length)
          ) {
            exercises = [];
          } else if (this.sport.items.length) {
            const exercises1 = exercises.filter(item => {
              return this.bodyPart.items.find(value => item._id === value._id);
            });

            exercises = exercises1.filter(item => {
              return this.sport.items.find(value => item._id === value._id);
            });
          }

          this.filterValues = exercises;
        }

        if (this.searchNameValues.length) {
          exercises = exercises.filter(item => {
            return this.searchNameValues.find(value => item._id === value._id);
          });
        }
      }

      this.exercisesFiltered = [...new Set(exercises)]; // new Set() will be remove duplicate values
      this.pagination.currentPage = 1;
    },

    onCloseModal(ev) {
      this.modalPoll = ev;
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-exercise {
  &__nav-header {
    border-bottom: 1px solid $gray-600;
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
