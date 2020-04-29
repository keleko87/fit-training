<template>
  <div class="ft-routine-new">
    <h2 class="ft-routine-new__title text-center">Nueva Rutina</h2>

    <ft-about></ft-about>
  </div>
</template>

<script>
const FtAbout = () => import('../../views/About.vue');

export default {
  name: 'routine-new',

  components: {
    FtAbout
  },
 
  data() {
    return {
      form: {}
    };
  },

  computed: {
  },

  methods: {
  },

  validations: {
    form: {
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-routine-new {
  &__title {
    position: absolute;
    top: 30px;
    left: 25%;
    color: $black !important;
    font-weight: bold;
  }
}
</style>
