<template>
  <mdb-navbar class="ft-nav" color="black" dark>
    <mdb-navbar-brand href="#">
      Fit Training
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item href="#" active>Nueva Rutina</mdb-nav-item>
        <mdb-nav-item href="#">Crear Entrenamiento</mdb-nav-item>
        <mdb-nav-item href="#">Ejercicios</mdb-nav-item>
      </mdb-navbar-nav>
       <form>
        <mdb-input type="text" class="text-white" placeholder="Search" aria-label="Search" label navInput waves waves-fixed/>
      </form>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem
} from 'mdbvue';

export default {
  name: 'header-custom',

  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem
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
  .nav-pills {
    margin-top: 0;
  }
}
</style>
