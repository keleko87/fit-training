<template>
  <div class="ft-login">
    <div
      class="ft-login__section d-flex justify-content-center align-items-center"
    >
      <div class="ft-login__section--item col-md-12">
        <p class="ft-login__title text-center mt-5">
          Inicia sesión
          <strong>Fit Training</strong>
        </p>
        <div class="card card-container">
          <!-- <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
            alt="profile image"
          /> -->
          <form name="form" novalidate @submit.prevent="handleLogin">
            <div class="form-row">
              <div class="col-12">
                <md-field :class="getValidationClass('username')">
                  <!-- USERNAME -->
                  <label>Nombre de usuario</label>
                  <md-input
                    type="text"
                    id="username"
                    name="username"
                    v-model.trim="$v.form.username.$model"
                  ></md-input>
                </md-field>
              </div>

              <div class="col-12">
                <md-field :class="getValidationClass('password')">
                  <!-- PASSWORD -->
                  <label>Contraseña</label>
                  <md-input
                    type="password"
                    id="password"
                    name="password"
                    v-model.trim="$v.form.password.$model"
                  ></md-input>
                </md-field>
              </div>
            </div>

            <!-- INICIAR SESION -->
            <div class="form-group mt-4">
              <button
                class="ft-login__btn-session btn btn-default btn-block"
                :disabled="loading"
              >
                <span
                  v-show="loading"
                  class="ft-login__btn-session--text spinner-border spinner-border-sm"
                ></span>
                <span v-show="!loading" class="ft-login__btn-session--text">
                  Iniciar sesión
                </span>
              </button>
            </div>

            <div class="form-group text-center">
              <span v-if="message" class="text-danger">
                {{ message.message ? message.message : message }}
              </span>
            </div>
          </form>
        </div>

        <div class="col-md-12 text-center">
          <span class="mr-1">¿Aún no tienes cuenta?</span>
          <router-link class="router-link" :to="{ name: 'register' }"
            >Regístrate</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../../models/user';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'FtLogin',

  data() {
    return {
      form: new User('', ''),
      loading: false,
      message: ''
    };
  },

  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },

  created() {
    if (this.loggedIn) {
      this.$router.push('/routine/new');
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

    async handleLogin() {
      this.$v.form.$touch();

      if (!this.$v.$invalid) {
        try {
          this.loading = true;
          await this.$store.dispatch('auth/LOGIN', this.form);
          this.$router.push('/routine/new');
        } catch (error) {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      }
    }
  },

  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-login {
  &__section {
    height: calc(100vh - #{$height-navbar});
  }

  &__title {
    font-size: 2em;
    strong {
      color: $mandarine;
      font-weight: bold;
    }
  }

  &__btn-session {
    box-shadow: none;

    &--text {
      color: $white !important;
      letter-spacing: 0.5px;
    }
  }
}
</style>
