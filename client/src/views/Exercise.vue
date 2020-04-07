<template>
  <div class="ft-exercise container">

    <div class="row">
      <div class="col-12" v-if="totalExercises && totalExercises.length">
        <h5>{{ totalExercises.length }} questions</h5>
        <exercise-list :list="totalExercises" :type="'all'"></exercise-list>
      </div>
    </div>

    <!-- create toggle or popup to show -->
    <div class="row">
      <exercise-new></exercise-new>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExerciseList from '../components/ExerciseList';
import ExerciseNew from '../components/ExerciseNew';

export default {
  name: 'exercise',

  components: {
    ExerciseList,
    ExerciseNew
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
      query: ''
    };
  },

  computed: {
    ...mapGetters(['totalExercises']),

    filteredExercises() {
      if (this.query) {
        return this.totalExercises.filter(item => {
          return this.query
            .toLowerCase()
            .split(' ')
            .every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.totalExercises;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
