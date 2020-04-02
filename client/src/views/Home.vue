<template>
  <div class="home">
    <div class="jumbotron">
      <h1>Fit Training</h1>
    </div>

    <div class="jumbotron-filter">
      <div class="container">
        <div class="row">
          <div class="col-1"></div>
          <div class="col-10">
            <div class="d-flex flex-row justify-content-between">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      query: null
    };
  },

  components: {
  },

};
</script>

<style scoped>
.search {
  align-self: flex-end;
}
.jumbotron {
  text-align: center;
  color: #fff;
  font-weight: bold;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background: linear-gradient(-45deg, #791c96, #8e4eaf, #6894bf, #417fcc);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
