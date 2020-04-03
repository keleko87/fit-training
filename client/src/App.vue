<template>
  <div id="app" class="ft-app">
    <Header />
    <div class="ft-app__container">
      <div class="row h-100 draggable-container">
        <div class="col-md-8 blue">
          <!-- <div class="row">
            <div class="col-md-4 col-4">
              <div
                id="draggable-containment"
                class="card card-body ui-draggable ui-draggable-handle"
                style="left: 0px; top: 0px;"
              >
                <h4 class="card-title">Draggable panel</h4>
                <p class="card-text">
                  I can only move inside the blue container
                </p>
              </div>
            </div>
          </div> -->
          <router-view class="view content" name="list"></router-view>
        </div>

        <div class="col-md-4 mdb-color">
          <router-view class="view workout" name="create"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Header from './components/Header';

export default {
  name: 'App',
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.ft-app {
  &__container {
    height: 100vh;

    .row {
      margin: 0;
    }
  }
  .blue {
    background-color: #fff;
  }

  .mdb-color {
    background-color: #494949;
  }
}
</style>
