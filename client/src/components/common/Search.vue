<template>
  <div class="ft-search">
    <md-field class="ft-search__wrapper">
      <label v-if="label">{{ label }}</label>
      <md-input
        type="text"
        id="search"
        :placeholder="placeholder"
        :value="queryValue"
        @input.native="search($event)"
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
    resetValue: Boolean,
    label: String,
    placeholder: {
      type: String,
      default: 'Buscar'
    }
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

      this.$emit('search', { items: itemsFiltered, query: this.query });
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-search {
  &__wrapper.md-field {
    margin: 0;
    width: 150px;
  }

  // &__wrapper.md-field:before {
  //   bottom: 17px;
  // }
}
</style>
