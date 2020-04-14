<template>
  <div class="ft-exercise-edit">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <!-- IMAGE -->
          <div v-if="!info.videoUrl && info.imageUrl" class="row">
            <div class="col-12">
              <img
                class="ft-exercise-edit__image mx-auto"
                :src="getImage(info.imageUrl)"
                alt="image exercise"
              />
            </div>
          </div>

          <!-- VIDEO -->
          <div v-else-if="info.videoUrl" class="row">
            <div class="col-12">
              <mdb-view hover>
                <iframe
                  class="ft-exercise-edit__iframe"
                  title="video exercise"
                  width="560"
                  :src="info.videoUrl"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </mdb-view>
            </div>
          </div>
        </div>

        <form novalidate @submit.prevent="onSubmit">
          <div class="col-12 mt-3">
            <div class="row ft-exercise-edit__is-warm-up mb-3">
              <!-- IS WARM UP -->
              <div class="col-12">
                <md-checkbox
                  id="is-warmup"
                  v-model="form.isWarmUp"
                  class="md-primary"
                >
                  <span class="checkbox-text">Ejercicio de calentamiento</span>
                </md-checkbox>
              </div>
            </div>

            <div class="row ft-exercise-edit__time-info">
              <div class="col-6 ft-exercise-edit__time-info--item">
                <!-- SERIES -->
                <md-field :class="getValidationClass('series')">
                  <label>Series</label>
                  <md-input
                    type="number"
                    id="series"
                    v-model.trim="form.series"
                  ></md-input>
                </md-field>
              </div>

              <div class="col-6 ft-exercise-edit__time-info--item">
                <!-- REPS -->
                <md-field :class="getValidationClass('reps')">
                  <label>Repeticiones</label>
                  <md-input
                    type="number"
                    id="reps"
                    v-model="form.reps"
                  ></md-input>
                </md-field>
              </div>

              <div class="col-6 ft-exercise-edit__time-info--item">
                <!-- REST -->
                <md-autocomplete
                  :class="getValidationClass('rest')"
                  v-model="form.rest"
                  :md-options="minutes"
                >
                  <label>Descanso (min)</label>
                </md-autocomplete>
              </div>

              <div class="col-6 ft-exercise-edit__time-info--item">
                <!-- TIME -->
                <md-autocomplete
                  :class="getValidationClass('time')"
                  v-model="form.time"
                  :md-options="minutes"
                >
                  <label>Duración (min)</label>
                </md-autocomplete>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <!-- OBSERVATIONS -->
                <md-field :class="getValidationClass('observations')">
                  <label>Observaciones</label>
                  <md-input
                    type="textarea"
                    id="observations"
                    v-model="form.observations"
                  ></md-input>
                </md-field>
              </div>
            </div>

            <div class="form-row mt-3 text-center">
              <div class="col">
                <button class="btn btn-primary" type="submit">
                  Guardar
                </button>
                <p class="success" v-if="submitStatus === 'OK'">
                  Ejercicio creado correctamente!
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbView } from 'mdbvue';
import {
  minLength,
  maxLength,
  minValue,
  maxValue
} from 'vuelidate/lib/validators';
import { MINUTES } from '../../common/constants';

export default {
  name: 'exercise-edit',

  props: {
    info: {
      type: Object
    }
  },

  created() {
    this.form = this.setInfoData(this.info);
  },

  components: {
    mdbView
  },

  data() {
    return {
      form: {},
      submitStatus: null,
      minutes: MINUTES,
      minValueTime: MINUTES[0],
      maxValueTime: MINUTES[MINUTES.length - 1]
    };
  },

  methods: {
    getImage(imageUrl) {
      return `${process.env.VUE_APP_UPLOADS}${imageUrl}`;
    },

    setInfoData(data) {
      const { isWarmUp, series, reps, rest, time, observations } = data;

      return {
        isWarmUp: isWarmUp || '',
        series: series || '',
        reps: reps || '',
        rest: rest ? rest.toString() : '',
        time: time ? time.toString() : '',
        observations: observations || ''
      };
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
      this.$v.form.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        const exerciseUpdated = {
          ...this.info,
          ...this.$v.form.$model // this line override props repeated in this.info
        };
        await this.$store.dispatch('UPDATE_WORKOUT_EXERCISE', exerciseUpdated);
        this.submitStatus = 'OK';
        this.$emit('submitStatus', false);
      }
    }
  },

  validations: function() {
    return {
      form: {
        observations: {
          minLength: minLength(5),
          maxLength: maxLength(200)
        },
        series: {
          minValue: minValue(1),
          maxValue: maxValue(60)
        },
        reps: {
          minValue: minValue(0),
          maxValue: maxValue(60)
        },
        rest: {
          minValue: minValue(this.minValueTime),
          maxValue: maxValue(this.maxValueTime)
        },
        time: {
          minValue: minValue(this.minValueTime),
          maxValue: maxValue(this.maxValueTime)
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
$iframe-height: 315px;

.ft-exercise-edit {
  &__image {
    width: auto;
    height: $iframe-height; // heigth equals iframes
  }

  &__iframe {
    height: $iframe-height;
  }

  &__is-warm-up {
    text-align: left;
  }
  &__time-info {
    &--item {
      width: 100px;
      padding: 0 10px;
    }
  }
}
</style>
