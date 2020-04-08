<template>
  <div class="ft-exercise-new my-5">
    <div class="container">
      <div class="row">
        <div class="mx-auto">
          <h3>Crear Ejercicio</h3>
        </div>
      </div>

      <form novalidate @submit.prevent="checkForm">
        <div class="form-row">
          <div class="col-md-6">
            <md-field>
              <!-- NAME -->
              <label>Nombre</label>
              <md-input
                type="text"
                id="name"
                v-model.trim="$v.form.name.$model"
              ></md-input>
            </md-field>
          </div>
          <div class="col-md-6">
            <!-- MOVE TYPE -->
            <md-field>
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
          <div class="col-md-6">
            <!-- SPORT -->
            <!-- <md-autocomplete v-model="form.sport" :md-options="sports">
              <label>Actividad / Deporte</label>
            </md-autocomplete> -->
            <md-field>
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
            </md-field>
          </div>

          <div class="col-md-6">
            <!-- BODY PART -->
            <md-field>
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
            </md-field>
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-6">
            <!-- TARGET -->
            <md-field>
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
            </md-field>
          </div>
          <div class="col-md-6">
            <!-- LEVEL -->
            <md-field>
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
            </md-field>
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-6">
            <!-- DESCRIPTION -->
            <md-field>
              <!-- NAME -->
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
            <md-field>
              <!-- NAME -->
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
            <!-- TIME -->
            <md-field>
              <!-- NAME -->
              <label>Duración</label>
              <md-input
                type="number"
                id="time"
                v-model.trim="$v.form.time.$model"
              ></md-input>
            </md-field>
          </div>
          <div class="col-md-3">
            <!-- REST -->
            <md-field>
              <!-- NAME -->
              <label>Descanso</label>
              <md-input
                type="number"
                id="rest"
                v-model.trim="$v.form.rest.$model"
              ></md-input>
            </md-field>
          </div>
          <div class="col-md-3">
            <!-- SERIES -->
            <md-field>
              <!-- NAME -->
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
            <md-field>
              <!-- NAME -->
              <label>Repeticiones</label>
              <md-input
                type="number"
                id="reps"
                v-model.trim="$v.form.reps.$model"
              ></md-input>
            </md-field>
          </div>
        </div>

        <div class="form-row">
          <!-- IMAGE URL-->
          <div class="col-md-6">
            <md-field>
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
            <md-field>
              <!-- NAME -->
              <label>Video (URL)</label>
              <md-input
                type="url"
                id="videoUrl"
                placeholder="http://example.com"
                v-model.trim="$v.form.videoUrl.$model"
              ></md-input>
            </md-field>
          </div>
        </div>

        <div class="form-row">
          <!-- FILE UPLOAD -->
          <div class="col-md-6">
            <input
              id="photo"
              type="file"
              ref="photo"
              name="photo"
              @change="onSelect($event)"
            />
            <!-- <md-field>
              <label>Subir Imagen</label>
              <md-file
                id="photo"
                ref="photo"
                name="photo"
                @change="onSelect($event)"
              ></md-file>
            </md-field> -->
          </div>
        </div>

        <div class="form-row">
          <!-- IS WARM UP -->
          <div class="col-md-6">
            <md-checkbox
              id="is-warmup"
              :value="$v.form.isWarmUp.$model"
              v-model.trim="$v.form.isWarmUp.$model"
            >
              Ejercicio de calentamiento
            </md-checkbox>
          </div>
        </div>

        <div class="form-row mt-3 text-center">
          <div class="col">
            <md-button type="submit" @click.prevent="onSubmit()">
              Guardar
            </md-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { SPORTS, LEVELS, BODY_PARTS, TARGETS } from '../common/constants';

export default {
  name: 'exercise-new',

  mounted() {
    this.$store.dispatch('GET_EXERCISES');
  },

  data() {
    return {
      form: {
        name: 'Flexiones inclinadas',
        sport: '',
        bodyPart: '',
        level: '',
        target: '',
        moveType: '',
        description: '',
        observations: '',
        time: 0, // seconds
        rest: 0, // seconds
        series: 0, // number
        reps: 0, // number
        image: {},
        photo: {}, // REMOVE THIS
        imageUrl: '',
        videoUrl: '',
        isWarmUp: false
      },
      photoUrl: '',
      sports: SPORTS,
      targets: TARGETS,
      levels: LEVELS,
      bodyParts: BODY_PARTS
    };
  },

  computed: {
    ...mapGetters(['totalExercises']),
    tickets() {
      console.log(this.$store.state);
      return this.$store.state.exercise.totalExercises;
    }
  },

  methods: {
    onSelect() {
      const photo = this.$refs.photo.files[0];
      this.photoUrl = URL.createObjectURL(photo);
      this.form.photo = photo;
      this.$v.form.imageUrl.$model = this.photoUrl;
    },

    onInput(ev) {
      this.form.description = ev.getHTML;
      this.form.photo = ev.file;
      this.form.imageUrl = ev.file.photoUrl;
    },

    checkForm(event) {
      event.target.classList.add('was-validated');
    },

    onSubmit() {
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
      formData.append('videoUrl', this.form.videoUrl);
      formData.append('isWarmUp', this.form.isWarmUp);

      if (this.form.photo) {
        formData.append('photo', this.form.photo);
      }

      this.$store.dispatch('SAVE_EXERCISE', formData);
      // this.$router.push({ name: 'home' });
    }
  },

  validations: {
    form: {
      name: {
        required,
        minLength: minLength(5)
      },
      sport: {},
      bodyPart: {},
      level: {},
      target: {},
      moveType: {},
      description: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500)
      },
      observations: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500)
      },
      time: {},
      rest: {},
      series: {},
      reps: {},
      image: {},
      imageUrl: {},
      videoUrl: {},
      isWarmUp: {}
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-exercise-new {
}
</style>
