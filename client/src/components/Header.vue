<template>
  <nav id="navbar-example2" class="ft-navbar navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Fit Training</a>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'home' }">
          New workout
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'new' }">
          <i class="ion-compose"></i>New Routine
        </router-link>
      </li>
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          data-toggle="dropdown"
          href="#"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          >Dropdown</a
        >
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#one">one</a>
          <a class="dropdown-item" href="#two">two</a>
          <div role="separator" class="dropdown-divider"></div>
          <a class="dropdown-item" href="#three">three</a>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'header',
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
    margin-top: 0
  }
}
</style>