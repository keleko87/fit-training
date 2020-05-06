<template>
  <div class="ft-search">
    <div class="ft-search__wrapper">
      <input
        type="text"
        :value="query"
        @input="search($event)"
        placeholder="Buscar"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FtSearch',

  props: {
    items: Array,
    default: () => []
  },

  data() {
    return {
      query: ''
    };
  },

  methods: {
    search(ev) {
      let itemsFiltered;
      this.query = ev.target.value;

      if (this.query) {
        itemsFiltered = this.items.filter(item => {
          return this.query
            .toLowerCase()
            .split(' ')
            .every(v => item.name.toLowerCase().includes(v));
        });
      } else {
        itemsFiltered = this.items;
      }

      this.$emit('search', itemsFiltered);
    }
  }
};
</script>

<style lang="scss" scoped></style>
