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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'exercise-new',

  mounted() {
    this.$store.dispatch('GET_EXERCISES');
  },

  data() {
    return {
      form: {
        name: '',
        description: '',
        tags: ['tag exe'],
        imageUrl: '',
        photo: {}
      },
      photoUrl: ''
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

    onSubmit() {
      const formData = new FormData();

      formData.append('name', this.form.name);
      formData.append('description', this.form.description);
      // formData.append('tags', this.form.tags);
      formData.append('imageUrl', this.form.imageUrl);

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
      description: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(500)
      },
      imageUrl: {},
      tags: {
        required
      },
      file: {}
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
