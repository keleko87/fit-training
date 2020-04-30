<template>
  <div class="ft-home">
    <div
      class="ft-home__section d-flex justify-content-center align-items-center"
    >
      <div class="ft__section--item">
        <h1 class="text-center my-4">
          Crea tus propios
          <strong class="ft-home__strong">ejercicios.</strong>
        </h1>
        <h1 class="text-center mb-4">
          Añadelos a tus
          <strong class="ft-home__strong">entrenamientos</strong>
          personalizados.
        </h1>
        <h1 class="text-center mb-4">
          Fija una <strong class="ft-home__strong">rutina</strong>
          y alcanza tu
          <strong class="ft-home__strong">objetivo.</strong>
        </h1>
        <div class="col-12 text-center">
          <router-link
            class="ft-home__button btn btn-default btn-lg"
            :to="{ name: userLoggedIn ? 'routineNew' : 'login' }"
          >
            Comienza ahora!
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',

  computed: {
    userLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-home {
  &__section {
    height: calc(100vh - #{$height-navbar});
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../assets/img/fitness_slide_1.jpg');
  }

  &__button {
    // width: 100%;
  }

  &__strong {
    color: $mandarine;
    font-weight: bold;
  }
}
</style>
