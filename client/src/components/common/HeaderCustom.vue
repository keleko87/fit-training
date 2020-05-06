<template>
  <mdb-navbar class="ft-navbar" color="black" dark>
    <mdb-navbar-brand class="ft-navbar__logo">
      <!-- Fit Training -->
      <router-link class="router-link" :to="{ name: 'home' }">
        <img src="@/assets/img/fit-training-logo4.png" alt="logo header" />
      </router-link>
    </mdb-navbar-brand>
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item>
          <router-link class="router-link" exact :to="{ name: 'workoutNew' }">
            <!-- <mdb-icon far icon="calendar-plus" class="ft-navbar__icon" /> -->
            Ejercicios
          </router-link>
        </mdb-nav-item>
        <mdb-nav-item>
          <router-link class="router-link" exact :to="{ name: 'routineNew' }">
            <!-- <mdb-icon far icon="calendar-alt" class="ft-navbar__icon" /> -->
            Entrenamientos
          </router-link>
        </mdb-nav-item>
      </mdb-navbar-nav>

      <mdb-navbar-nav right>
        <!-- LOGIN -->
        <mdb-nav-item v-if="!currentUser">
          <router-link
            v-if="!currentRouteLogin"
            to="/login"
            class="router-link"
          >
            Entrar
            <mdb-icon icon="sign-in-alt" class="ft-navbar__icon" />
          </router-link>
          <router-link v-else to="/register" class="router-link">
            Registrarse
            <mdb-icon icon="user-plus" class="ft-navbar__icon" />
          </router-link>
        </mdb-nav-item>

        <mdb-dropdown v-else tag="li" class="nav-item">
          <mdb-dropdown-toggle
            tag="a"
            navLink
            slot="toggle"
            class="ft-navbar__dropdown"
          >
            <mdb-icon
              icon="user-circle"
              size="2x"
              class="ft-navbar__icon--avatar"
            />
            {{ currentUser.username }}
          </mdb-dropdown-toggle>

          <mdb-dropdown-menu>
            <!-- ADMIN PANEL -->
            <mdb-dropdown-item v-if="showAdminBoard">
              <router-link to="/admin" class="nav-link">
                <mdb-icon icon="sliders-h" class="ft-navbar__icon" />
                Admin Panel
              </router-link>
            </mdb-dropdown-item>

            <!-- USER PANEL -->
            <mdb-dropdown-item>
              <router-link to="/user" class="nav-link">
                <mdb-icon icon="cog" class="ft-navbar__icon" />
                Ajustes
              </router-link>
            </mdb-dropdown-item>

            <!-- PROFILE -->
            <mdb-dropdown-item>
              <router-link to="/profile" class="nav-link">
                <mdb-icon icon="user" />
                Mi perfil
              </router-link>
            </mdb-dropdown-item>

            <!-- LOGOUT -->
            <mdb-dropdown-item>
              <a class="nav-link" href @click.prevent="logOut">
                <mdb-icon icon="sign-out-alt" class="ft-navbar__icon" />
                Cerrar sesión
              </a>
            </mdb-dropdown-item>
          </mdb-dropdown-menu>
        </mdb-dropdown>
      </mdb-navbar-nav>
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
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbDropdownItem,
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
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbIcon
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentRouteLogin() {
      return this.$route.name === 'login';
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
      this.$store.dispatch('auth/LOGOUT');
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
    // font-size: 1.2em;
    vertical-align: baseline;

    &--avatar {
      vertical-align: sub;
    }
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
