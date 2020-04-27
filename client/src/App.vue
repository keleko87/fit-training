<template>
  <div id="app" class="ft-app">
    <header-custom />

    <!-- OLD ROUTES with Workout.vue -->
    <!-- <router-view></router-view> -->

    <div class="ft-app__container">
      <div class="row h-100">
        <div class="col-md-8 elegant-color ft-app__list">
          <router-view class="view content" name="list"></router-view>
        </div>

        <div class="col-md-4 bg-create-section ft-app__create">
          <router-view class="view workout" name="create"></router-view>
        </div>
      </div>

      <!-- <div class="ft-app__footer row d-flex justify-content-end">
        <div class="">
          <small class="text-center">Made with love by Mario Martín</small>
        </div>
      </div> -->

    </div>
  </div>
</template>

<script>
import HeaderCustom from './components/common/HeaderCustom';

export default {
  name: 'App',
  components: {
    HeaderCustom
  }
};
</script>

<style lang="scss" scoped>
.ft-app {
  &__container {
    height: calc(100vh - #{$height-navbar});
    .row {
      margin: 0;
    }
  }
  &__list {
    padding: 0;
    background-color: transparent;
    // background-image: url('./assets/img/fitness_slide_1.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }

  &__create {
    padding: 0;
  }
}
</style>
