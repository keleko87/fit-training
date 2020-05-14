<template>
  <div class="ft-workout-new mt-4 px-3">
    <div class="container">
      <form novalidate @submit.prevent="onSubmit">
        <div class="row d-flex align-items-center">
          <div class="col-11">
            <md-field :class="getValidationClass('name')">
              <!-- NAME -->
              <label>Nuevo Entrenamiento</label>
              <md-input
                type="text"
                id="name"
                v-model.trim="$v.form.name.$model"
              ></md-input>
              <span class="md-error" v-if="!$v.form.name.required">{{
                requiredField
              }}</span>
              <span class="md-error" v-else-if="!$v.form.name.minlength">{{
                invalidField
              }}</span>
            </md-field>
          </div>
          <div class="col-1 pl-0">
            <a @click.prevent="toggleShowFields()">
              <mdb-icon class="ft-workout-new__icon" icon="edit" size="2x" />
            </a>
          </div>
        </div>

        <transition name="fade">
          <div v-if="showFields">
            <div class="form-row">
              <div class="col-lg-6">
                <!-- SPORT -->
                <md-field :class="getValidationClass('sport')">
                  <label for="sport">Actividad</label>
                  <md-select
                    v-model.trim="$v.form.sport.$model"
                    id="sport"
                    name="sport"
                  >
                    <md-option
                      v-for="sport in sports"
                      :key="sport"
                      :value="sport"
                    >
                      {{ sport }}
                    </md-option>
                  </md-select>
                  <span class="md-error" v-if="!$v.form.sport.required">{{
                    requiredField
                  }}</span>
                </md-field>
              </div>

              <div class="col-lg-6">
                <!-- BODY PART -->
                <md-field :class="getValidationClass('bodyPart')">
                  <label for="bodyPart">Parte del cuerpo</label>
                  <md-select
                    v-model.trim="$v.form.bodyPart.$model"
                    id="bodyPart"
                    name="bodyPart"
                  >
                    <md-option
                      v-for="bodyPart in bodyParts"
                      :key="bodyPart"
                      :value="bodyPart"
                    >
                      {{ bodyPart }}
                    </md-option>
                  </md-select>
                  <span class="md-error" v-if="!$v.form.bodyPart.required">{{
                    requiredField
                  }}</span>
                </md-field>
              </div>
            </div>

            <div class="form-row">
              <div class="col-lg-6">
                <!-- TARGET -->
                <md-field :class="getValidationClass('target')">
                  <label for="movie">Objetivo</label>
                  <md-select
                    v-model.trim="$v.form.target.$model"
                    id="target"
                    name="target"
                  >
                    <md-option
                      v-for="target in targets"
                      :key="target"
                      :value="target"
                    >
                      {{ target }}</md-option
                    >
                  </md-select>
                  <span class="md-error" v-if="!$v.form.target.required">{{
                    requiredField
                  }}</span>
                </md-field>
              </div>
              <div class="col-lg-6">
                <!-- LEVEL -->
                <md-field :class="getValidationClass('level')">
                  <label for="level">Nivel</label>
                  <md-select
                    v-model.trim="$v.form.level.$model"
                    id="level"
                    name="level"
                  >
                    <md-option
                      v-for="level in levels"
                      :key="level"
                      :value="level"
                    >
                      {{ level }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </div>

            <div class="form-row">
              <div class="col-12 col-lg-6">
                <!-- rest Between Exercise -->
                <md-autocomplete
                  :class="getValidationClass('restBetweenExercise')"
                  v-model.trim="$v.form.restBetweenExercise.$model"
                  :md-options="minutes"
                >
                  <label>Descanso</label>
                </md-autocomplete>
                <span
                  class="md-error"
                  v-if="
                    !$v.form.restBetweenExercise.minValue ||
                      !$v.form.restBetweenExercise.maxValue
                  "
                >
                  Añade un valor entre {{ minValueTime }} y {{ maxValueTime }}
                </span>
              </div>

              <div class="col-12 col-lg-6 mb-4">
                <!-- DURATION -->
                <md-autocomplete
                  :class="getValidationClass('duration')"
                  v-model.trim="$v.form.duration.$model"
                  :md-options="minutes"
                >
                  <label>Duración (min)</label>
                </md-autocomplete>
                <span
                  class="md-error"
                  v-if="
                    !$v.form.duration.minValue || !$v.form.duration.maxValue
                  "
                >
                  Añade un valor entre {{ minValueTime }} y {{ maxValueTime }}
                </span>
              </div>
            </div>
          </div>
        </transition>

        <div class="">
          <!-- ADD EXERCISES -->
          <draggable
            class="dragArea flex-column"
            v-model="workoutExercises"
            group="workout"
            handle=".draggable-handle"
            @change="changeExercises"
          >
            <!-- NEW -->
            <div
              v-for="exercise in workoutExercises"
              :key="exercise.idGlobal"
              class="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-7 mx-auto my-2"
            >
              <exercise-card-add
                @delete="onDeleteExercise($event)"
                :data="exercise"
              ></exercise-card-add>
            </div>
          </draggable>

          <div
            v-if="!workoutExercises.length"
            class="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-7 mx-auto my-2"
          >
            <div
              class="ft-workout-new__card-add"
              :class="getValidationClass('exercises')"
            >
              <div class="ft-workout-new__card-add--text">
                <h5>Arrastra aqui los ejercicios que quieras incluir</h5>
              </div>
            </div>
          </div>
        </div>

        <div class="form-row mt-3 text-center">
          <div class="col">
            <button class="btn btn-primary" type="submit">
              Guardar
            </button>
            <p class="success" v-if="submitStatus === 'OK'">
              Entrenamiento creado correctamente!
            </p>
            <p class="info" v-if="submitStatus === 'PENDING'">
              Enviando...
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const ExerciseCardAdd = () => import('../exercise/ExerciseCardAdd.vue');

import { mdbIcon } from 'mdbvue/lib';
import draggable from 'vuedraggable';
import {
  required,
  minLength,
  minValue,
  maxValue
} from 'vuelidate/lib/validators';
import {
  SPORTS,
  LEVELS,
  BODY_PARTS,
  TARGETS,
  MINUTES
} from '../../common/constants';

export default {
  name: 'workout-new',

  components: {
    ExerciseCardAdd,
    draggable,
    mdbIcon
  },

  async created() {
    await this.$store.dispatch('RESET_WORKOUT_DATA');
  },

  data() {
    return {
      form: {
        name: '',
        sport: '',
        bodyPart: '',
        level: '',
        target: '',
        duration: '', // minutes
        restBetweenExercise: '', // minutes
        sportImageUrl: '',
        creatorWorkoutId: '',
        exercises: [],
        musicList: []
      },
      // DUPLICATE FIEDS in exerciseNew - Move to mixin
      invalidField: 'Campo incorrecto',
      requiredField: 'Campo obligatorio',
      submitStatus: null,
      sports: SPORTS,
      targets: TARGETS,
      levels: LEVELS,
      bodyParts: BODY_PARTS,
      minutes: MINUTES,
      minValueTime: MINUTES[0],
      maxValueTime: MINUTES[MINUTES.length - 1],
      showFields: false
    };
  },

  computed: {
    workoutExercises: {
      get() {
        return this.$store.state.workout.data.exercises;
      },
      set(value) {
        console.log('set workoutExercises value', value);
      }
    }
  },

  methods: {
    toggleShowFields() {
      this.showFields = !this.showFields;
    },

    changeExercises(ev) {
      if (ev.added) {
        const { element } = ev.added;
        this.$store.commit('ADD_EXERCISE', element);
        this.setExerciseInForm(element);
      } else if (ev.moved) {
        this.$store.commit('MOVE_EXERCISE', ev.moved);
      }
    },

    setSportImageURL(sport) {
      const sportImage = sport.toLowerCase();
      return `@/assets/img/sports/${sportImage}.png`;
    },

    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (fieldName === 'exercises') {
        return {
          'card-add--error': field.$invalid && field.$dirty
        };
      }
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },

    onDeleteExercise(id) {
      this.$v.form.exercises.$model = this.workoutExercises.filter(
        elem => elem.idGlobal !== id
      );
    },

    setExerciseInForm(exercise) {
      this.$v.form.exercises.$model.push(exercise);
    },

    resetForm() {
      this.showFields = false;
      this.$v.form.$reset();
    },

    async onSubmit() {
      this.$v.form.$touch();
      this.showFields = true;

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        const formData = this.saveWorkout();

        await this.$store.dispatch('SAVE_WORKOUT', formData);
        this.submitStatus = 'OK';

        await this.$store.dispatch('RESET_WORKOUT_DATA');
        this.resetForm();

        setTimeout(() => {
          this.submitStatus = '';
        }, 3000);
      }
    },

    saveWorkout() {
      const {
        name,
        sport,
        bodyPart,
        level,
        target,
        duration,
        restBetweenExercise
      } = this.$v.form.$model;

      const creatorWorkoutId = 'UserId-1';
      // Set Sport image URL
      const sportImageUrl = this.setSportImageURL(sport);
      // exercises store
      const exercises = this.workoutExercises;
      const totalExercises = this.workoutExercises.length;
      // musicList harcoded
      const musicList = [];

      return {
        name,
        sport,
        sportImageUrl,
        bodyPart,
        level,
        target,
        duration,
        restBetweenExercise,
        creatorWorkoutId,
        exercises,
        totalExercises,
        musicList
      };
    }
  },

  validations: function() {
    return {
      form: {
        name: {
          required,
          minLength: minLength(5)
        },
        sport: { required },
        bodyPart: { required },
        target: { required },
        level: {},
        restBetweenExercise: {
          required,
          minValue: minValue(this.minValueTime),
          maxValue: maxValue(this.maxValueTime)
        },
        duration: {
          minValue: minValue(this.minValueTime),
          maxValue: maxValue(this.maxValueTime)
        },
        exercises: { required } // PENDING fix required
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.ft-workout-new {
  &__card-add {
    text-align: center;
    border: 3px dashed $second-dark-grey;
    background-color: $gray-800;
    height: 200px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  &__icon {
    color: $teal;
    font-size: 25px;
  }
}

.card-add--error {
  border: 2px dashed $error;
  color: $error;
}
</style>
