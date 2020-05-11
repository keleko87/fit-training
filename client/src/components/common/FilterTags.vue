<template>
  <div class="ft-filter-tags">
    <md-field class="ft-filter-tags__wrapper">
      <label v-if="label">{{ label }}</label>
      <md-select
        :value="getFilterValues"
        :placeholder="placeholder"
        @md-selected="selectValues($event)"
        @md-closed="triggerFilter()"
        name="filter-tags"
        id="filter-tags"
        multiple
      >
        <md-option v-for="tag in tags" :key="tag" :value="tag">
          {{ tag }}
        </md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script>
export default {
  name: 'FtFilterTags',

  props: {
    items: {
      type: Array,
      default: () => []
    },
    tags: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Filtrar'
    },
    label: String,
    tagField: String,
    value: Array
  },

  data() {
    return {
      itemsFiltered: [],
      filterValues: []
    };
  },

  computed: {
    getFilterValues() {
      return this.value ? this.value : this.filterValues;
    }
  },

  methods: {
    selectValues(ev) {
      this.filterValues = ev;
    },

    filterItems(filterValues) {
      let tags = filterValues;

      if (!tags.length) {
        return this.items;
      }

      return this.items.filter(item =>
        tags.some(tag =>
          item[this.tagField].toLowerCase().includes(tag.toLowerCase())
        )
      );
    },

    triggerFilter() {
      this.itemsFiltered = this.filterItems(this.filterValues);
      this.$emit('filter', {
        items: this.itemsFiltered,
        filterValues: this.filterValues,
        tagField: this.tagField
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.ft-filter-tags {
  &__wrapper.md-field {
    margin: 0;
    width: 150px;
  }

  // &__wrapper.md-field:before {
  //   bottom: 17px;
  // }
}
</style>
