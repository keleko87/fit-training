<template>
  <div class="ft-workout-new my-5">
    <div class="container">
      <form novalidate @submit.prevent="onSubmit">
        <div class="form-row">
          <div class="col">
            <md-field :class="getValidationClass('name')">
              <!-- NAME -->
              <label>Nombre del entrenamiento</label>
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
        </div>

        <div class="form-row">
          <div class="col-lg-6">
            <!-- SPORT -->
            <md-field :class="getValidationClass('sport')">
              <label for="sport">Actividad / Deporte</label>
              <md-select
                v-model.trim="$v.form.sport.$model"
                id="sport"
                name="sport"
              >
                <md-option v-for="sport in sports" :key="sport" :value="sport">
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
                <md-option v-for="level in levels" :key="level" :value="level">
                  {{ level }}
                </md-option>
              </md-select>
              <span class="md-error" v-if="!$v.form.level.required">{{
                requiredField
              }}</span>
            </md-field>
          </div>
        </div>

        <div class="form-row">
          <div class="col-lg-6">
            <!-- rest Between Exercise -->
            <md-autocomplete
              :class="getValidationClass('restBetweenExercise')"
              v-model.trim="$v.form.restBetweenExercise.$model"
              :md-options="minutes"
            >
              <label>Descanso ejercicio</label>
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

          <div class="col-lg-6">
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
              v-if="!$v.form.duration.minValue || !$v.form.duration.maxValue"
            >
              Añade un valor entre {{ minValueTime }} y {{ maxValueTime }}
            </span>
          </div>
        </div>

        <div class="">
          <!-- ADD EXERCESICES -->

          <draggable
            class="dragArea flex-column"
            v-model.trim="$v.form.exercises.$model"
            group="workout"
            @change="log"
          >
            <div
              v-if="!form.exercises.length"
              class="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-7 mx-auto my-2"
            >
              <div class="ft-workout-new__card-add">
                <div class="ft-workout-new__card-add--text">
                  <h5>Arrastra aqui los ejercicios que quieras incluir</h5>
                </div>
              </div>
            </div>
            <!-- NEW -->
            <div
              v-for="exercise in form.exercises"
              :key="exercise.idGlobal"
              class="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-7 mx-auto my-2"
            >
              <exercise-card-animation
                :data="exercise"
              ></exercise-card-animation>
            </div>
          </draggable>
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
import ExerciseCardAnimation from '../exercise/ExerciseCardAnimation';
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
    ExerciseCardAnimation,
    draggable
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
      maxValueTime: MINUTES[MINUTES.length - 1]
    };
  },

  computed: {
    // NOT USED YET. FOR EDIT WORKOUT EXERCISES
    workoutExercises: {
      get() {
        return this.$store.state.workout.data.exercises;
      },
      set(value) {
        console.log('set workoutExercises value', value);
        this.$store.commit('ADD_EXERCISE', value[0]);
      }
    }
  },

  methods: {
    log(evt) {
      window.console.log('ADDED', evt);
    },
    // NO necesario para guardar la imagen -> Solo cuando haya que mostrarla
    getSportImageSource(sport) {
      const img = this.getSportImageName(sport);
      return require('@/assets/img/sports/' + img + '.png');
    },

    getSportImageName(sport) {
      switch (sport) {
        case 'Fitness':
          return 'fitness';
        case 'Boxing':
          return 'fitness';
        case 'HIIT':
          return 'fitness';
        case 'Core':
          return 'fitness';
        case 'Abs':
          return 'fitness';
        default:
          return 'fitness';
      }
    },

    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },

    async onSubmit() {
      debugger;
      this.$v.form.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        const formData = this.saveWorkout();
        await this.$store.dispatch('SAVE_WORKOUT', formData);
        this.submitStatus = 'OK';
        await this.$store.dispatch('GET_WORKOUTS');
        this.$emit('submitStatus', false);
      }
    },

    saveWorkout() {
      debugger;
      const {
        name,
        sport,
        bodyPart,
        level,
        target,
        duration,
        restBetweenExercise
      } = this.$v.form.$model;

      // User logged
      const creatorWorkoutId = '9121HHS01012932';
      // Add sportImageUrl
      const sportImageUrl = this.getSportImageSource(sport);
      // exercises.push()
      const exercises = this.form.exercises;
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
        level: { required },
        target: { required },
        restBetweenExercise: {
          required,
          minValue: minValue(this.minValueTime),
          maxValue: maxValue(this.maxValueTime)
        },
        duration: {
          minValue: minValue(this.minValueTime),
          maxValue: maxValue(this.maxValueTime)
        },
        exercises: {
          required
        }
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
    padding: 10px;
  }
}
</style>
