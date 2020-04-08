<template>
  <div class="ticket-new my-5">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-8 col-md-offset-2 mx-auto">
          <h2>Nuevo Ejercicio</h2>

          <div class="well">
            <div>
              <div class="form-group control-label">
                <label for="name">Nombre</label>
                <input
                  type="text"
                  v-model.trim="$v.form.name.$model"
                  class="form-control"
                  id="exercise-name"
                  placeholder="Enter a name for your post"
                  name="name"
                />
              </div>
              <div class="form-group">
                <label for="description">Descripción</label>
                <textarea
                  v-model.trim="$v.form.description.$model"
                  class="form-control"
                  rows="5"
                  id="description"
                  placeholder="Write your issue"
                  name="description"
                >
                </textarea>
              </div>

              <div class="form-group">
                <input
                  id="photo"
                  type="file"
                  ref="photo"
                  name="photo"
                  @change="onSelect($event)"
                />
              </div>
              <!-- <div class="form-group">
                <label for="tags">Tags</label>
                <select
                  v-model.trim="$v.form.tags.$model"
                  class="form-control"
                  id="tags"
                  placeholder="Choose your tag"
                  name="tags"
                >
                  <option v-for="tag in tags" :key="tag">
                    {{ tag }}
                  </option>
                </select>
              </div> -->

              <button
                type="button"
                @click.prevent="onSubmit"
                class="btn btn-success"
              >
                Send Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <form novalidate @submit.prevent="checkForm">
      <div class="form-row">
        <div class="col-md-6">
          <!-- NAME -->
          <mdb-input
            type="text"
            id="name"
            label="Nombre"
            :required="$v.form.name.$model.required"
            v-model.trim="$v.form.name.$model"
          />
        </div>
        <div class="col-md-6">
          <!-- MOVE TYPE -->
          <mdb-input
            type="text"
            id="move-type"
            label="Tipo de ejercicio"
            v-model.trim="$v.form.moveType.$model"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6">
          <!-- SPORT -->
          <label for="sport">Actividad / Deporte</label>
          <select
            v-model.trim="$v.form.sport.$model"
            class="form-control"
            id="sport"
            name="sport"
          >
            <option v-for="sport in sports" :key="sport">
              {{ sport }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <!-- BODY PART -->
          <label for="bodyPart">Parte del cuerpo</label>
          <select
            v-model.trim="$v.form.bodyPart.$model"
            class="form-control"
            id="bodyPart"
            name="bodyPart"
          >
            <option v-for="bodyPart in bodyParts" :key="bodyPart">
              {{ bodyPart }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6">
          <!-- TARGET -->
          <label for="target">Objetivo</label>
          <select
            v-model.trim="$v.form.target.$model"
            class="form-control"
            id="target"
            name="target"
          >
            <option v-for="target in targets" :key="target">
              {{ target }}
            </option>
          </select>
        </div>
        <div class="col-md-6">
          <!-- LEVEL -->
          <label for="level">Nivel</label>
          <select
            v-model.trim="$v.form.level.$model"
            class="form-control"
            id="level"
            name="level"
          >
            <option v-for="level in levels" :key="level">
              {{ level }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6">
          <!-- DESCRIPTION -->
          <mdb-input
            type="textarea"
            id="descripton"
            label="Descripción"
            v-model.trim="$v.form.description.$model"
          />
        </div>
        <div class="col-md-6">
          <!-- OBSERVATIONS -->
          <mdb-input
            type="textarea"
            id="observations"
            label="Observaciones"
            v-model.trim="$v.form.observations.$model"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-3">
          <!-- TIME -->
          <mdb-input
            type="number"
            id="time"
            label="Duración"
            v-model.trim="$v.form.time.$model"
          />
        </div>
        <div class="col-md-3">
          <!-- REST -->
          <mdb-input
            type="number"
            id="rest"
            label="Descanso"
            v-model.trim="$v.form.rest.$model"
          />
        </div>
        <div class="col-md-3">
          <!-- SERIES -->
          <mdb-input
            type="number"
            id="series"
            label="Series"
            v-model.trim="$v.form.series.$model"
          />
        </div>
        <div class="col-md-3">
          <!-- REPS -->
          <mdb-input
            type="number"
            id="reps"
            label="Repeticiones"
            v-model.trim="$v.form.reps.$model"
          />
        </div>
      </div>

      <div class="form-row">
        <!-- IMAGE URL-->
        <div class="col-md-6">
          <mdb-input
            type="url"
            id="imageUrl"
            placeholder="http://example.com"
            label="Imagen (URL)"
            v-model.trim="$v.form.imageUrl.$model"
          />
        </div>

        <!-- VIDEO -->
        <div class="col-md-6">
          <mdb-input
            type="url"
            id="videoUrl"
            placeholder="http://example.com"
            label="Video (URL)"
            v-model.trim="$v.form.videoUrl.$model"
          />
        </div>
      </div>

      <div class="form-row">
        <!-- FILE UPLOAD -->
        <div class="col-md-6">
          <mdb-input
            type="file"
            id="photo"
            ref="photo"
            name="photo"
            @change="onSelect($event)"
          />
        </div>
      </div>

      <div class="form-row">
        <!-- IS WARM UP -->
        <div class="col-md-6">
          <div class="custom-control custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="is-warmup"
              :checked="$v.form.isWarmUp.$model"
              v-model.trim="$v.form.isWarmUp.$model"
            />
            <label class="custom-control-label" for="is-warmup"
              >Ejercicio de calentamiento</label
            >
          </div>
        </div>
      </div>

      <div class="form-row mt-3 text-center">
        <div class="col">
          <mdb-btn type="submit" @click.prevent="onSubmit">Guardar</mdb-btn>
        </div>
      </div>

    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { mdbBtn, mdbInput } from 'mdbvue';
import { SPORTS, LEVELS, BODY_PARTS, TARGETS } from '../common/constants';

export default {
  name: 'exercise-new',

  mounted() {
    this.$store.dispatch('GET_EXERCISES');
  },

  components: {
    mdbBtn,
    mdbInput
  },

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
        time: null, // seconds
        rest: null, // seconds
        series: null, // number
        reps: null, // number
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
.preview-container {
  border: 1px solid #ccc;

  .preview {
    img {
      width: 100%;
    }
  }
}
</style>
