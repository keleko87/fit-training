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

        <li class="nav-item mx-2">
          <ft-filter-tags
            ref="filterBodyPart"
            :value="filterBodyPartValues"
            :tagField="'bodyPart'"
            :tags="bodyParts"
            :items="totalExercises"
            @filter="filterExercises($event)"
          ></ft-filter-tags>
        </li>

        <li class="nav-item mx-2">
          <ft-search
            ref="searchName"
            :reset-value="resetSearchNameValue"
            :items="totalExercises"
            @search="searchExercisesByName($event)"
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
      filterBodyPartValues: [],
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
