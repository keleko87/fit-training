<template>
  <div class="ft-exercise-new mt-2">
    <div class="container">
      <form novalidate @submit.prevent="onSubmit">
        <div class="form-row">
          <div class="col-md-6">
            <md-field :class="getValidationClass('name')">
              <!-- NAME -->
              <label>Nombre</label>
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
          <div class="col-md-6">
            <!-- MOVE TYPE -->
            <md-field :class="getValidationClass('moveType')">
              <!-- NAME -->
              <label>Tipo de ejercicio</label>
              <md-input
                type="text"
                id="move-type"
                v-model.trim="$v.form.moveType.$model"
              ></md-input>
            </md-field>
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-3">
            <!-- SPORT -->
            <md-field :class="getValidationClass('sport')">
              <label for="sport">Actividad</label>
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

          <div class="col-md-3">
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

          <div class="col-md-3">
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

          <div class="col-md-3">
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
          <div class="col-md-6">
            <!-- DESCRIPTION -->
            <md-field :class="getValidationClass('description')">
              <label>Descripción</label>
              <md-input
                type="textarea"
                id="descripton"
                v-model.trim="$v.form.description.$model"
              ></md-input>
            </md-field>
          </div>
          <div class="col-md-6">
            <!-- OBSERVATIONS -->
            <md-field :class="getValidationClass('observations')">
              <label>Observaciones</label>
              <md-input
                type="textarea"
                id="observations"
                v-model.trim="$v.form.observations.$model"
              ></md-input>
            </md-field>
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-3">
            <!-- SERIES -->
            <md-field :class="getValidationClass('series')">
              <label>Series</label>
              <md-input
                type="number"
                id="series"
                v-model.trim="$v.form.series.$model"
              ></md-input>
            </md-field>
          </div>

          <div class="col-md-3">
            <!-- REPS -->
            <md-field :class="getValidationClass('reps')">
              <label>Repeticiones</label>
              <md-input
                type="number"
                id="reps"
                v-model.trim="$v.form.reps.$model"
              ></md-input>
            </md-field>
          </div>

          <div class="col-md-3">
            <!-- REST -->
            <md-autocomplete
              :class="getValidationClass('rest')"
              v-model.trim="$v.form.rest.$model"
              :md-options="minutes"
            >
              <label>Descanso (min)</label>
            </md-autocomplete>
            <span
              class="md-error"
              v-if="!$v.form.rest.minValue || !$v.form.rest.maxValue"
            >
              Añade un valor entre {{ minValueTime }} y {{ maxValueTime }}
            </span>
          </div>

          <div class="col-md-3">
            <!-- TIME -->
            <md-autocomplete
              :class="getValidationClass('time')"
              v-model.trim="$v.form.time.$model"
              :md-options="minutes"
            >
              <label>Duración (min)</label>
            </md-autocomplete>
            <span
              class="md-error"
              v-if="!$v.form.time.minValue || !$v.form.time.maxValue"
            >
              Añade un valor entre {{ minValueTime }} y {{ maxValueTime }}
            </span>
          </div>
        </div>

        <div class="form-row">
          <!-- IMAGE URL-->
          <div class="col-md-6">
            <md-field :class="getValidationClass('imageUrl')">
              <!-- NAME -->
              <label>Imagen (URL)</label>
              <md-input
                type="url"
                id="imageUrl"
                v-model.trim="$v.form.imageUrl.$model"
              ></md-input>
            </md-field>
          </div>

          <!-- VIDEO -->
          <div class="col-md-6">
            <md-field :class="getValidationClass('videoUrl')">
              <!-- NAME -->
              <label>Youtube video (URL)</label>
              <md-input
                type="url"
                id="videoUrl"
                v-model.trim="$v.form.videoUrl.$model"
              ></md-input>
              <span class="md-error" v-if="!$v.form.videoUrl.url">{{
                invalidUrl
              }}</span>
              <span class="md-error" v-else-if="!$v.form.videoUrl.youtubeUrl">{{
                youtubeUrl
              }}</span>
            </md-field>
          </div>
        </div>

        <div class="form-row">
          <!-- FILE UPLOAD -->
          <div
            v-if="!isImageModelURL"
            class="d-flex align-items-center col-md-6"
          >
            <div>
              <input
                id="image"
                type="file"
                ref="image"
                name="image"
                class="input-file"
                @change="onSelect($event)"
              />
              <p class="text-danger mt-2" v-show="file.error">
                {{ invalidFile }}
              </p>
            </div>
          </div>

          <!-- IS WARM UP -->
          <div class="col-md-6">
            <md-checkbox
              id="is-warmup"
              v-model.trim="$v.form.isWarmUp.$model"
              class="md-primary"
            >
              <span class="checkbox-text">Ejercicio de calentamiento</span>
            </md-checkbox>
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
import { mapGetters } from 'vuex';
import mediaSource from '../../mixins/mediaSource';
import {
  required,
  minLength,
  maxLength,
  minValue,
  maxValue,
  url
} from 'vuelidate/lib/validators';
import {
  SPORTS,
  LEVELS,
  BODY_PARTS,
  TARGETS,
  MINUTES,
  YOUTUBE_SHARE_URL,
  YOUTUBE_EMBED_URL
} from '../../common/constants';

export default {
  name: 'exercise-new',

  mounted() {
    this.$store.dispatch('GET_EXERCISES');
  },

  mixins: [mediaSource],

  data() {
    return {
      form: {
        name: '',
        sport: '',
        bodyPart: '',
        level: '',
        target: '',
        moveType: '',
        description: '',
        observations: '',
        time: '', // minutes
        rest: '', // minutes
        series: '', // number
        reps: '', // number
        image: {},
        imageUrl: '',
        videoUrl: '',
        isWarmUp: false
      },
      file: {
        format: 'image/',
        maxSize: 5000000, // bytes -> 5MB
        error: false
      },
      invalidFile: 'Formatos válidos: png, jpg, gif. Tamaño máximo 5MB',
      invalidField: 'Campo incorrecto',
      requiredField: 'Campo obligatorio',
      invalidUrl: 'URL incorrecta',
      youtubeUrl: 'No es una URL de Youtube',
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
    ...mapGetters(['totalExercises']),

    isImageModelURL() {
      return this.isImageUrl(this.$v.form.imageUrl.$model);
    }
  },

  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },

    isValidFile() {
      if (this.$refs.image.files[0]) {
        const { type, size } = this.$refs.image.files[0];
        return type.includes(this.file.format) && size < this.file.maxSize;
      }

      return false;
    },

    onSelect() {
      this.file.error = false;
      this.$v.form.imageUrl.$reset();

      if (this.isValidFile()) {
        const image = this.$refs.image.files[0];
        const imageUrl = URL.createObjectURL(image);
        this.form.image = image;

        if (!this.isImageModelURL) {
          this.$v.form.imageUrl.$model = imageUrl;
        }
      } else {
        this.$refs.image.value = '';
        this.$v.form.imageUrl.$model = '';
        this.file.error = true;
      }
    },

    async onSubmit() {
      this.$v.form.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        const formData = this.saveExercise();
        await this.$store.dispatch('SAVE_EXERCISE', formData);
        this.submitStatus = 'OK';
        await this.$store.dispatch('GET_EXERCISES');
        this.$emit('submitStatus', false);
      }
    },

    saveExercise() {
      const formData = new FormData();

      formData.append('name', this.form.name);
      formData.append('sport', this.form.sport);
      formData.append('moveType', this.form.moveType);
      formData.append('bodyPart', this.form.bodyPart);
      formData.append('level', this.form.level);
      formData.append('target', this.form.target);
      formData.append('description', this.form.description);
      formData.append('observations', this.form.observations);
      formData.append('time', this.form.time);
      formData.append('rest', this.form.rest);
      formData.append('series', this.form.series);
      formData.append('reps', this.form.reps);
      formData.append('imageUrl', this.form.imageUrl);
      formData.append('isWarmUp', this.form.isWarmUp);

      if (this.form.image) {
        formData.append('image', this.form.image);
      }

      if (this.form.videoUrl) {
        const videoUrl = this.setVideoUrl(this.form.videoUrl);
        formData.append('videoUrl', videoUrl);
      } else {
        formData.append('videoUrl', '');
      }

      return formData;
    },

    setVideoUrl(videoUrl) {
      if (videoUrl.includes(YOUTUBE_SHARE_URL)) {
        const videoId = videoUrl.split(YOUTUBE_SHARE_URL)[1];
        return `${YOUTUBE_EMBED_URL}${videoId}`;
      } else {
        return videoUrl;
      }
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
        moveType: {},
        description: {
          minLength: minLength(10),
          maxLength: maxLength(500)
        },
        observations: {
          minLength: minLength(10),
          maxLength: maxLength(500)
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
        },
        image: {},
        imageUrl: {},
        videoUrl: {
          url,
          youtubeUrl: url => {
            if (url) {
              return (
                url.includes(YOUTUBE_SHARE_URL) ||
                url.includes(YOUTUBE_EMBED_URL)
              );
            } else {
              return true;
            }
          }
        },
        isWarmUp: {}
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.ft-exercise-new {
}
</style>
