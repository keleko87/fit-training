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
    <ft-header>
      <template slot="nav-list">
        <li class="nav-item mx-2">
          <router-link class="router-link" :to="{ name: 'routineNew' }">
            Entrenamientos
          </router-link>
        </li>
        <li class="nav-item mx-2">
          <!-- trigger modal button -->
          <a class="router-link" @click="modalPoll = true">
            Nuevo ejercicio
          </a>
        </li>
      </template>
    </ft-header>

    <!-- FILTER MENU-->
    <div class="white">
      <div class="col-6">
        filters options here
      </div>
    </div>

    <!-- EXERCISES LIST -->
    <div class="container">
      <div class="row mt-3">
        <div class="col-12">
          <h4>Ejercicios disponibles</h4>
        </div>
        <div
          class="col-12"
          v-if="totalExercisesReversed && totalExercisesReversed.length"
        >
          <exercise-list
            :list="totalExercisesReversed"
            :type="'exercise'"
          ></exercise-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const FtHeader = () => import('../components/common/Header.vue');
const ExerciseList = () => import('../components/exercise/ExerciseList.vue');
const ExerciseNew = () => import('../components/exercise/ExerciseNew.vue');
const ModalPoll = () => import('../components/common/ModalPoll.vue');

import { mapGetters } from 'vuex';

export default {
  name: 'exercise',

  components: {
    FtHeader,
    ExerciseList,
    ExerciseNew,
    ModalPoll
  },

  mounted() {
    this.$store.dispatch('GET_EXERCISES');
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
    ...mapGetters(['totalExercisesReversed']),

    filteredExercises() {
      if (this.query) {
        return this.totalExercisesReversed.filter(item => {
          return this.query
            .toLowerCase()
            .split(' ')
            .every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.totalExercisesReversed;
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
