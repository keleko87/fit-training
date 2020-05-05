<template>
  <div class="ft-register">
    <div
      class="ft-register__section d-flex justify-content-center align-items-center"
    >
      <div class="ft-register__section--item col-md-12">
        <p class="ft-register__title text-center mt-5">
          Regístrate en
          <strong>Fit Training</strong>
        </p>
        <div class="card card-container">
          <!-- <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
          alt="avatar"
          /> -->
          <!-- <img
            id="profile-img"
            src="@/assets/img/fit-training-logo2.png"
            class="profile-img-card"
            alt="avatar"
          /> -->

          <form name="form" novalidate @submit.prevent="handleRegister">
            <div v-if="!successful" class="form-row">
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
                  <span class="md-error" v-if="!$v.form.username.alphaNum">
                    Sólo puede contener letras y números
                  </span>
                  <span
                    class="md-error"
                    v-else-if="!$v.form.username.minlength"
                  >
                    Debe contener al menos 5 caracteres
                  </span>
                </md-field>
              </div>

              <div class="col-12">
                <md-field :class="getValidationClass('username')">
                  <!-- EMAIL -->
                  <label>Email</label>
                  <md-input
                    type="text"
                    id="email"
                    name="email"
                    v-model.trim="$v.form.email.$model"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.email.email">
                    Dirección de email no válida
                  </span>
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
                  <span class="md-error" v-if="!$v.form.password.minLength">
                    Debe contener al menos 6 caracteres
                  </span>
                  <span
                    class="md-error"
                    v-else-if="!$v.form.password.goodPassword"
                  >
                    Usa al menos una mayúscula, una minúscula, un número y un
                    caracter especial.
                  </span>
                </md-field>
              </div>

              <div class="col-12">
                <md-field :class="getValidationClass('password')">
                  <!-- PASSWORD -->
                  <label>Repite contraseña</label>
                  <md-input
                    type="password"
                    id="password2"
                    name="password2"
                    v-model.trim="$v.form.password2.$model"
                  ></md-input>
                  <span class="md-error" v-if="!$v.form.password2.sameAs">
                    La contraseña no coincide
                  </span>
                </md-field>
              </div>
            </div>

            <!-- CREAR CUENTA -->
            <div v-if="!successful" class="form-group mt-4">
              <button
                class="ft-register__btn-session btn btn-default btn-block"
                :disabled="loading"
              >
                <span
                  v-show="loading"
                  class="ft-register__btn-session--text spinner-border spinner-border-sm"
                ></span>
                <span v-show="!loading" class="ft-register__btn-session--text">
                  Enviar
                </span>
              </button>
            </div>

            <div
              v-if="message"
              class="ft-register__register-successful form-group text-center"
            >
              <span
                v-if="message"
                :class="successful ? 'text-success' : 'text-danger'"
              >
                {{ message.message ? message.message : message }}
              </span>
            </div>
          </form>
        </div>

        <div class="col-md-12 text-center">
          <span class="mr-1">¿Ya tienes una cuenta?</span>
          <router-link class="router-link" :to="{ name: 'login' }"
            >Inicia sesión</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SPECIAL_CHARS_PATTERN } from '../../common/constants';
import {
  required,
  minLength,
  email,
  alphaNum,
  sameAs
} from 'vuelidate/lib/validators';

export default {
  name: 'FtRegister',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        password2: ''
      },
      submitted: false,
      successful: false,
      loading: false,
      message: '',
      specialCharsPattern: SPECIAL_CHARS_PATTERN
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
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

    async handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$v.form.$touch();

      if (!this.$v.$invalid) {
        try {
          this.loading = true;
          const { username, email, password } = this.form;
          const data = await this.$store.dispatch('auth/REGISTER', {
            username,
            email,
            password
          });
          this.message = data.message;
          this.successful = true;
        } catch (error) {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
        }
      }
    }
  },

  validations: function() {
    return {
      form: {
        username: {
          required,
          minLength: minLength(5),
          alphaNum
        },
        email: {
          required: required,
          email: email
        },
        password: {
          required,
          // a custom validator
          minLength: minLength(6),
          goodPassword: password => {
            return (
              /[a-z]/.test(password) &&
              /[A-Z]/.test(password) &&
              /[0-9]/.test(password) &&
              this.specialCharsPattern.test(password)
            );
          },
          sameAs: sameAs('password2')
        },
        password2: {
          required,
          sameAs: sameAs('password')
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.ft-register {
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

  &__register-successful {
    margin: 0;
    .text-success {
      font-weight: bold;
    }
  }
}
</style>
