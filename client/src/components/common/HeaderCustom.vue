<template>
  <mdb-navbar class="ft-navbar" color="black" dark>
    <mdb-navbar-brand class="ft-navbar__logo">
      <!-- Fit Training -->
      <router-link class="router-link" to="/home">
        <img src="@/assets/img/fit-training-logo4.png" alt="logo header" />
      </router-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item>
          <router-link class="router-link" exact :to="{ name: 'routineNew' }">
            <mdb-icon far icon="calendar-alt" class="ft-navbar__icon" />
            Nueva Rutina
          </router-link>
        </mdb-nav-item>
        <mdb-nav-item>
          <router-link class="router-link" exact :to="{ name: 'workoutNew' }">
            <mdb-icon far icon="calendar-plus" class="ft-navbar__icon" />
            Crear Entrenamiento
          </router-link>
        </mdb-nav-item>
      </mdb-navbar-nav>
      <div class="navbar-nav mr-auto">
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="router-link">Admin Panel</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="router-link"
            >User</router-link
          >
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="router-link">
            <mdb-icon
              far
              icon="calendar-alt"
              class="ft-navbar__icon"
            />Registarse
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="router-link">
            <mdb-icon far icon="calendar-alt" class="ft-navbar__icon" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="router-link">
            <mdb-icon far icon="calendar-alt" class="ft-navbar__icon" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="router-link" href @click.prevent="logOut">
            <mdb-icon far icon="calendar-alt" class="ft-navbar__icon" />LogOut
          </a>
        </li>
      </div>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbIcon
} from 'mdbvue/lib';

export default {
  name: 'header-custom',

  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbIcon
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    }
  },

  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style lang="scss" scoped>
.ft-navbar {
  // background-color: $blue;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  margin: 0;

  &__icon {
    font-size: 1.2em;
  }

  &__logo /deep/ .navbar-brand {
    padding: 0;
    margin: 0 15px 0 0;
    height: $height-navbar;

    img {
      height: 100%;
    }
  }
}
</style>
