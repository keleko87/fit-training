<template>
  <div class="ft-app__container">
    <div class="row h-100">

      <div class="col-md-8 elegant-color ft-app__list">

        <draggable
          class="dragArea list-group"
          :list="totalExercises"
          :group="{ name: 'people', pull: 'clone', put: false }"
          :clone="cloneDog"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in list1"
            :key="element._id"
          >
            {{ element.name }}
          </div>
        </draggable>

        <!-- EXERCISES LIST -->
        <div class="container">
          <div class="row mt-3">
            <div class="col-12" v-if="totalExercises && totalExercises.length">
              <exercise-list
                :list="totalExercises"
                :type="'all'"
              ></exercise-list>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4 bg-create-section ft-app__create">

          <draggable
          class="dragArea list-group"
          :list="list2"
          group="people"
          @change="log"
        >
          <div
            class="list-group-item"
            v-for="element in list2"
            :key="element._id"
          >
            {{ element.name }}
          </div>
        </draggable>
        <workout-new></workout-new>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ExerciseList from '../components/exercise/ExerciseList';
import WorkoutNew from '../components/workout/WorkoutNew';
import draggable from 'vuedraggable';
let idGlobal = 8;

export default {
  name: 'App',

  components: {
    ExerciseList,
    WorkoutNew,
    draggable
  },

  data() {
    return {
      list1: [
        {
          _id: '5e8b94aafc17f3441c9d02c7',
          updated_at: '2020-04-06T20:44:26.863Z',
          created_at: '2020-04-06T20:44:26.863Z',
          name: 'FLEXXXIOOONSSSS ',
          description: 'Realiza con las manos a la altura del pecho.',
          imageUrl: 'c2d89ed6-3920-4207-b37e-2d96834a6d53',
          __v: 0
        },
        {
          _id: '5e8b99efcdeabd67e03ba174',
          updated_at: '2020-04-06T21:06:55.116Z',
          created_at: '2020-04-06T21:06:55.116Z',
          name: 'OTROSSS EJEMPLO',
          description: 'eqwewqsad adsad',
          imageUrl: '61acb654-a044-44fc-9c66-4ff842f74fab',
          __v: 0
        }
      ],
      list2: [
        {
          _id: '5e8b94aafc17f3441c9d02c7',
          updated_at: '2020-04-06T20:44:26.863Z',
          created_at: '2020-04-06T20:44:26.863Z',
          name: 'Flexiones',
          description: 'Realiza con las manos a la altura del pecho.',
          imageUrl: 'c2d89ed6-3920-4207-b37e-2d96834a6d53',
          __v: 0
        },
        {
          _id: '5e8b99efcdeabd67e03ba174',
          updated_at: '2020-04-06T21:06:55.116Z',
          created_at: '2020-04-06T21:06:55.116Z',
          name: 'qwer',
          description: 'eqwewq',
          imageUrl: '61acb654-a044-44fc-9c66-4ff842f74fab',
          __v: 0
        },
        {
          _id: '5e8c3bedb258c31fc8d79ce6',
          updated_at: '2020-04-07T08:38:05.741Z',
          created_at: '2020-04-07T08:38:05.741Z',
          name: 'My example',
          description: 'asddasdasdas',
          imageUrl: 'f4cdeaf0-3e0f-4efe-92f1-9602bc5c91a2',
          __v: 0
        },
        {
          _id: '5e8c3c0cb258c31fc8d79ce7',
          updated_at: '2020-04-07T08:38:36.812Z',
          created_at: '2020-04-07T08:38:36.812Z',
          name: 'Flexion + jab + cross',
          description: '',
          imageUrl: 'd2cf5467-753e-4f3b-b3e4-d3fcf6a80577',
          __v: 0
        }
      ]
    };
  },

  async created() {
    await this.$store.dispatch('GET_WORKOUT', '5e9448f9a33c52660ad246c3');
  },

  computed: {
    ...mapGetters(['totalExercises', 'workoutExercises'])
  },

  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    cloneDog({ name }) {
      return {
        id: idGlobal++,
        name: `cat ${name}`
      };
    },
    pullFunction() {
      return this.controlOnStart ? 'clone' : true;
    },
    start({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey;
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-app {
  &__container {
    height: calc(100vh - 52px);
    .row {
      margin: 0;
    }
  }
  &__list {
    padding: 0;
    background-color: transparent;
    // background-image: url('./assets/img/fitness_slide_2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
}
</style>
