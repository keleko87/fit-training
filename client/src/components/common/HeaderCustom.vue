<template>
  <mdb-navbar class="ft-navbar" color="black" dark>
    <mdb-navbar-brand class="ft-navbar__logo">
      <!-- Fit Training -->
      <router-link class="router-link" exact :to="{ name: 'home' }">
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
      <!-- <form>
        <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves waves-fixed/>
      </form> -->
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
} from 'mdbvue';

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

  computed: {},

  methods: {
    login() {
      // this.$store.dispatch(LOGIN);
    },

    logout() {
      // this.$store.dispatch(LOGOUT);
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
