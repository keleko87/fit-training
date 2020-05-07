<template>
  <div class="ft-search">
    <md-field class="ft-search__wrapper">
      <label>Buscar</label>
      <md-input
        type="text"
        id="search"
        :value="queryValue"
        @input.native="search($event)"
        placeholder=""
      ></md-input>
    </md-field>
  </div>
</template>

<script>
export default {
  name: 'FtSearch',

  props: {
    items: {
      type: Array,
      default: () => []
    },
    resetValue: Boolean
  },

  data() {
    return {
      query: ''
    };
  },

  computed: {
    queryValue() {
      return this.query !== '' && this.resetValue ? '' : this.query;
    }
  },

  methods: {
    resetQuery(value) {
      this.query = value;
      console.log(value, 'this.query', this.query);
    },

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

<style lang="scss" scoped>
.ft-search {
  &__wrapper.md-field {
    margin: 0;
  }

  // &__wrapper.md-field:before {
  //   bottom: 17px;
  // }
}
</style>
