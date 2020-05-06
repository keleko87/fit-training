<template>
  <div class="ft-workout-list">
    <!-- NAVBAR -->
    <ft-header>
      <template slot="nav-list">
        <li class="nav-item">
          <router-link class="router-link" :to="{ name: 'workoutNew' }">
            Nuevo entrenamiento
          </router-link>
        </li>
        <li class="nav-item mx-2">
          <ft-search
            :items="totalWorkouts"
            @search="filterExercises($event)"
          ></ft-search>
        </li>
      </template>
    </ft-header>

    <!-- FILTER MENU-->
    <div class="white">
      <div class="col-6">
        filters options here
      </div>
    </div>

    <!-- WORKOUTS LIST -->
    <div class="container">
      <div class="row mt-3">
        <div class="col-12">
          <h5>Entrenamientos disponibles</h5>
        </div>
      </div>

      <div
        v-if="itemsPage.length > 0"
        class="d-flex justify-content-between container"
      >
        <div class="row">
          <p class="ft-workout-list__total">
            {{ itemsPage.length }} de {{ itemsCount }} resultados
          </p>
        </div>

        <!-- PAGINATION -->
        <div class="row">
          <ft-pagination
            class="ft-workout-list__pagination"
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

      <div class="row">
        <div class="col-12" v-if="itemsPage && itemsPage.length">
          <exercise-list :list="itemsPage" :type="'workout'"></exercise-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FtHeader = () => import('../common/Header.vue');
const FtSearch = () => import('../common/Search.vue');
const FtPagination = () => import('../common/Pagination.vue');
const ExerciseList = () => import('../exercise/ExerciseList.vue');

import pagination from '../../mixins/pagination';

export default {
  name: 'workout-list',

  components: {
    FtHeader,
    FtSearch,
    FtPagination,
    ExerciseList
  },

  async mounted() {
    const workouts = await this.$store.dispatch('GET_WORKOUTS');
    this.exercisesFiltered = workouts;
  },

  mixins: [pagination],

  data() {
    return {
      exercisesFiltered: [],
      modalPoll: false
    };
  },

  computed: {
    totalWorkouts() {
      return this.$store.state.workout.totalWorkouts;
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
    }
  },

  methods: {
    filterExercises(exercises) {
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
.ft-workout-list {
  &__total {
    font-size: 1rem;
    margin: 8px 5px;
  }

  &__not-found {
    height: 70vh;
  }
}
</style>
