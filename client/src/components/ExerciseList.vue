<template>
  <div class="ticket-container">
    <div v-if="tickets.length === 0" class="ticket-preview">
      No tickets are here... yet.
    </div>

    <div class="row" v-if="tickets.length">
      <div class="col-md-10">
        <div
          class="card"
          v-for="ticket in tickets"
          :ticket="ticket"
          :key="ticket._id"
        >

          <exercise-card></exercise-card>

        </div>
      </div>
    </div>


    <div class="row" v-if="ticketsCount > 0">
      <div class="mx-auto">
        <!-- <b-pagination
          v-model="pagination.currentPage"
          :total-rows="ticketsCount"
          :per-page="pagination.perPage"
          aria-controls="ticket-list"
        ></b-pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
// import { BPagination } from 'bootstrap-vue';
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
      ticketsCount: 0,
      pagination: {
        currentPage: 1,
        rows: 4,
        perPage: 2
      }
    };
  },

  computed: {
    tickets() {
      const items = this.$store.state.exercise.totalExercises;
      // Return just page of items needed
      return items.slice(
        (this.pagination.currentPage - 1) * this.pagination.perPage,
        this.pagination.currentPage * this.pagination.perPage
      );
    },

    totalRows() {
      return this.$store.getters.getTotalExercises.length;
    }
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
