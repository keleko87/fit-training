<template>
  <div id="app" class="ft-app">
    <header-custom />
    <div class="ft-app__container">
      <div class="row h-100">
        <div class="col-md-8 elegant-color ft-app__list">
          <router-view class="view content" name="list"></router-view>
        </div>

        <div class="col-md-4 bg-create-section ft-app__create">
          <router-view class="view workout" name="create"></router-view>
        </div>
      </div>
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
  font-family: cursive;

  &__container {
    height: 100vh;
    .row {
      margin: 0;
    }
  }
  &__list {
    padding: 0;
    background-color: transparent;
    background-image: url('./assets/img/fitness_slide_2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
}
</style>
