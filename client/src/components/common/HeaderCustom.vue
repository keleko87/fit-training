<template>
  <mdb-navbar class="ft-navbar" color="black" dark>
    <mdb-navbar-brand>
      Fit Training
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
  &__icon {
    font-size: 1.2em;
  }
}
</style>
