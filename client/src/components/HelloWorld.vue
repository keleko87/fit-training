<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          >eslint</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha"
          >unit-mocha</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://mevn.madlabs.xyz">Core Docs</a>
      </li>
      <li>
        <a href="https://github.com/madlabsinc/mevn-cli" rel="noopener"
          >GitHub Repo</a
        >
      </li>
      <li>
        <a href="https://spectrum.chat/mevn-cli" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/mevn_cli" rel="noopener">Twitter</a>
      </li>
      <li>
        <a href="https://opencollective.com/mevn-cli" rel="noopener"
          >Open Collective</a
        >
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" rel="noopener">vue-router</a>
      </li>
      <li>
        <a href="https://vuex.vuejs.org" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" rel="noopener">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
