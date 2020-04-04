<template>
  <div class="ft-exercise container">

    <div class="row">
      <div class="col-12" v-if="filteredTickets.length">
        <h5>{{ filteredTickets.length }} questions</h5>
        <exercise-list :list="filteredTickets" :type="'all'"></exercise-list>
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators';

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
    ...mapGetters(['getTotalExercises']),
    tickets() {
      console.log(this.$store.state.exercise.totalExercises);
      return this.$store.state.exercise.totalExercises;
    },

    filteredTickets() {
      if (this.query) {
        return this.tickets.filter(item => {
          return this.query
            .toLowerCase()
            .split(' ')
            .every(v => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.tickets;
      }
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
      this.form.content = ev.getHTML;
      this.form.photo = ev.file;
      this.form.imageUrl = ev.file.photoUrl;
    },

    onSubmit() {
      const formData = new FormData();

      formData.append('title', this.form.title);
      formData.append('content', this.form.content);
      formData.append('tags', this.form.tags);
      formData.append('imageUrl', this.form.imageUrl);

      if (this.form.photo) {
        formData.append('photo', this.form.photo);
      }

      this.$store.dispatch('SAVE_TICKET', formData);
      this.$router.push({ name: 'home' });
    }
  },

  validations: {
    form: {
      title: {
        required,
        minLength: minLength(5)
      },
      content: {
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
