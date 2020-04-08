<template>
  <div id="app" class="ft-app">
    <header-custom />
    <div class="ft-app__container">
      <div class="row h-100 draggable-container">

        <div class="col-md-8 elegant-color">
          <router-view class="view content" name="list"></router-view>
        </div>

        <div class="col-md-4 bg-create-section">
          <router-view class="view workout" name="create"></router-view>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import HeaderCustom from './components/HeaderCustom';

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
    height: 100vh;

    .row {
      margin: 0;
    }
  }
}
</style>
