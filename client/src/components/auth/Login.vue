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
          <form name="form" @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">Nombre de usuario</label>
              <input
                v-model="user.username"
                v-validate="'required'"
                type="text"
                class="form-control"
                name="username"
              />
              <div
                v-if="errors.has('username')"
                class="alert alert-danger"
                role="alert"
              >
                Username is required!
              </div>
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                v-model="user.password"
                v-validate="'required'"
                type="password"
                class="form-control"
                name="password"
              />
              <div
                v-if="errors.has('password')"
                class="alert alert-danger"
                role="alert"
              >
                Password is required!
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Iniciar sesión</span>
              </button>
            </div>
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
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

export default {
  name: 'FtLogin',
  data() {
    return {
      user: new User('', ''),
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
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/routine/new');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
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
}

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
