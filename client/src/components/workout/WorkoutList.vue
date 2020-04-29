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
          <h4>Entrenamientos disponibles</h4>
        </div>
        <div
          class="col-12"
          v-if="totalWorkoutsReversed && totalWorkoutsReversed.length"
        >
          <exercise-list
            :list="totalWorkoutsReversed"
            :type="'workout'"
          ></exercise-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FtHeader = () => import('../common/Header.vue');
const ExerciseList = () => import('../exercise/ExerciseList.vue');

import { mapGetters } from 'vuex';

export default {
  name: 'workout-list',

  components: {
    FtHeader,
    ExerciseList
  },

  mounted() {
    this.$store.dispatch('GET_WORKOUTS');
  },

  data() {
    return {
      form: {
        title: '',
        content: '',
        tags: [''],
        imageUrl: '',
        photo: {}
      },
      photoUrl: '',
      query: '',
      modalPoll: false
    };
  },

  computed: {
    ...mapGetters(['totalWorkoutsReversed']),

    filteredExercises() {
      if (this.query) {
        return this.totalWorkoutsReversed.filter(item => {
          return this.query
            .toLowerCase()
            .split(' ')
            .every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.totalWorkoutsReversed;
      }
    }
  },

  methods: {
    onCloseModal(ev) {
      this.modalPoll = ev;
    }
  }
};
</script>

<style lang="scss" scoped></style>
