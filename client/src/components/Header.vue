<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        Fit Training
      </router-link>
      <!-- <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <a href="/auth/login" class="btn btn-primary">Login</a>
        </li>
      </ul> -->
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'new' }">
            <i class="ion-compose"></i>New Routine
          </router-link>
        </li>
        <li class="nav-item">
          <span>
            <router-link class="nav-link" exact :to="{ name: 'settings' }">
              <i class="ion-gear-a"></i>Settings
            </router-link>
          </span>
        </li>
        <li class="nav-item">
          <button @click="login()" class="btn btn-primary">
            Login
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
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
