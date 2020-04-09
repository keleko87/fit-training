<template>
  <div class="ft-exercise">
    <!-- MODAL -->
    <modal-poll :modal="modalPoll" @close="onCloseModal($event)">
      <template slot="header">
        <h3>Crear ejercicio</h3>
      </template>
      <template slot="body">
        <exercise-new @submitStatus="onCloseModal($event)"></exercise-new>
      </template>
    </modal-poll>

    <!-- NAVBAR -->
    <ft-header>
      <template slot="nav-list">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'home' }">
            Mis ejercicios
          </router-link>
        </li>
        <li class="nav-item">
          <!-- trigger modal button -->
          <a class="nav-link" @click="modalPoll = true">
            Nuevo ejercicio
          </a>
        </li>
      </template>
    </ft-header>

    <!-- EXERCISE LIST -->
    <div class="container">
      <div class="row white">
        <div class="col-6">
          filter inputs here
        </div>
      </div>

      <div class="row mt-3">
        <div
          class="col-12"
          v-if="totalExercisesReversed && totalExercisesReversed.length"
        >
          <exercise-list
            :list="totalExercisesReversed"
            :type="'all'"
          ></exercise-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FtHeader from '../components/Header';
import ExerciseList from '../components/ExerciseList';
import ExerciseNew from '../components/ExerciseNew';
import ModalPoll from '../components/ModalPoll';

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
