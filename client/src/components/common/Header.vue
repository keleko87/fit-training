<template>
  <nav class="ft-navbar navbar navbar-dark bg-dark">
    <ul class="nav nav-pills">
      <slot name="nav-list">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'home' }">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'routineNew' }">
            Nueva rutina
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
      </slot>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ft-header'
};
</script>
<style lang="scss" scoped>
.ft-navbar {
  height: auto;

  .nav-pills {
    margin: 0;
  }
}
</style>
