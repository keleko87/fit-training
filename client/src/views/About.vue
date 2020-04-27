<template>
  <div class="ft-about">
    <div
      class="ft-about__section d-flex justify-content-center align-items-center"
    >
      <div class="ft-about__section--item">
        <img class="ft-about__image" src="@/assets/img/fit-training-logo.png" alt="logo 1" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ft-about'
};
</script>

<style lang="scss" scoped>
.ft-about {
  background-color: $white;

  &__section {
    height: calc(100vh - #{$height-navbar});

    &--item {
      height: 40vh;
      width: 75%;
    }
  }

  &__image {
    max-width: 450px;
    min-width: 261px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
