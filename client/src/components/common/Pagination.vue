<template>
  <div class="ft-pagination">
    <div v-if="showPagination" class="ft-pagination__container">
      <ul class="ft-pagination__list">
        <li class="ft-pagination__item">
          <a
            class="ft-pagination__link"
            :class="{ disabled: isInFirstPage }"
            :disabled="isInFirstPage"
            @click.prevent="onClickFirstPage"
          >
            <!-- First -->
            <mdb-icon icon="step-backward" class="ft-pagination__icon" />
          </a>
        </li>

        <li class="ft-pagination__item">
          <a
            class="ft-pagination__link"
            :class="{ disabled: isInFirstPage }"
            :disabled="isInFirstPage"
            @click.prevent="onClickPreviousPage"
          >
            <!-- Previous -->
            <mdb-icon class="ft-pagination__icon" icon="chevron-left" />
          </a>
        </li>

        <li v-for="page in pages" :key="page.name" class="ft-pagination__item">
          <a
            class="ft-pagination__link ft-pagination__link--page"
            :class="{ active: isPageActive(page.name) }"
            :disabled="page.isDisabled"
            @click.prevent="onClickPage(page.name)"
          >
            {{ page.name }}
          </a>
        </li>

        <li class="ft-pagination__item">
          <a
            class="ft-pagination__link"
            :class="{ disabled: isInLastPage }"
            :disabled="isInLastPage"
            @click.prevent="onClickNextPage"
          >
            <!-- Next -->
            <mdb-icon class="ft-pagination__icon" icon="chevron-right" />
          </a>
        </li>

        <li class="ft-pagination__item">
          <a
            class="ft-pagination__link"
            :class="{ disabled: isInLastPage }"
            :disabled="isInLastPage"
            @click.prevent="onClickLastPage"
          >
            <!-- Last -->
            <mdb-icon class="ft-pagination__icon" icon="step-forward" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mdbIcon } from 'mdbvue/lib';

export default {
  name: 'ft-pagination',

  props: {
    maxVisibleas: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },

  components: {
    mdbIcon
  },

  computed: {
    showPagination() {
      return this.total > 0 && this.total > this.perPage;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        const res = this.totalPages - this.maxVisibleas + 1;
        if (res <= 0) {
          return 1;
        }
        return this.totalPages - this.maxVisibleas + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(this.startPage + this.maxVisibleas - 1, this.totalPages);
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    }
  },

  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    }
  }
};
</script>

<style lang="scss" scoped>
$padding-items-lg: 7px 12px;
$padding-items-sm: 6px 9px;

.ft-pagination {
  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  &__item {
    display: inline-block;
    margin: 2px;
  }

  &__link {
    border: $border-item;
    padding: $padding-items-sm;

    &--page {
      border: none;
    }
  }

  &__link:hover {
    background-color: $mandarine-gradient;
    color: $white !important;
  }

  &__link.active {
    background-color: $teal;
    color: $white !important;
  }

  &__link.active:hover {
    background-color: none;
    color: $white;
  }

  &__link.disabled {
    color: $second-dark-grey !important;
    border-color: $second-dark-grey !important;
  }
}
</style>
