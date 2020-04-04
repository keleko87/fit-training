<template>
  <div class="ft-exercise-list__container container">

    <div v-if="tickets.length === 0" class="row">
      No tickets are here... yet.
    </div>

    <div v-else class="row">
      <div v-for="ticket in tickets" :key="ticket._id" class="col-6">
        <exercise-card :data="ticket"></exercise-card>
      </div>
    </div>

    <div class="row" v-if="exercisesCount > 0">
      <div class="mx-auto">
        Pagination total: {{ exercisesCount }}
        <!-- <b-pagination
          v-model="pagination.currentPage"
          :total-rows="exercisesCount"
          :per-page="pagination.perPage"
          aria-controls="
        ></b-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { BPagination } from 'bootstrap-vue';
import { mapGetters } from 'vuex';
import ExerciseCard from './ExerciseCard';

export default {
  name: 'exercise-list',

  components: {
    // BPagination
    ExerciseCard
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
      // exercisesCount: 0,
      pagination: {
        currentPage: 1,
        rows: 4,
        perPage: 2
      }
    };
  },

  computed: {
    ...mapGetters(['exercisesCount']),

    tickets() {
      // const items = this.$store.state.exercise.totalExercises;
      const items = this.list;
      console.log('exerciseList', items);
      // Return just page of items needed
      return items.slice(
        (this.pagination.currentPage - 1) * this.pagination.perPage,
        this.pagination.currentPage * this.pagination.perPage
      );
    }

    // totalRows() {
    //   return this.$store.getters.getTotalExercises.length;
    // }
  },

  mounted() {
    this.fetchExercises();
  },

  methods: {
    fetchExercises() {
      this.$store.dispatch('GET_EXERCISES');
      console.log('ticketList', this.$store.state.exercise.totalExercises);
    }
  }
};
</script>

<style lang="scss" scoped>
.ticket-container.content {
  height: auto;
}
</style>
