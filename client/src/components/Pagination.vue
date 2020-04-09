<template>
  <div class="ft-pagination">
    <div v-if="showPagination" class="ft-paginator__container">
      <ul class="pagination">
        <li class="pagination-item">
          <button
            type="button"
            @click="onClickFirstPage"
            :disabled="isInFirstPage"
          >
            First
          </button>
        </li>

        <li class="pagination-item">
          <button
            type="button"
            @click="onClickPreviousPage"
            :disabled="isInFirstPage"
          >
            Previous
          </button>
        </li>

        <li v-for="page in pages" :key="page.name" class="pagination-item">
          <button
            type="button"
            @click="onClickPage(page.name)"
            :disabled="page.isDisabled"
            :class="{ active: isPageActive(page.name) }"
          >
            {{ page.name }}
          </button>
        </li>

        <li class="pagination-item">
          <button
            type="button"
            @click="onClickNextPage"
            :disabled="isInLastPage"
          >
            Next
          </button>
        </li>

        <li class="pagination-item">
          <button
            type="button"
            @click="onClickLastPage"
            :disabled="isInLastPage"
          >
            Last
          </button>
        </li>
      </ul>

      <p>Total: {{ total }} resultados</p>
    </div>
    <!-- 
        <mdb-pagination>
    <mdb-page-item disabled>First</mdb-page-item>
    <mdb-page-nav prev disabled></mdb-page-nav>
    <mdb-page-item active>1</mdb-page-item>
    <mdb-page-item>2</mdb-page-item>
    <mdb-page-item>3</mdb-page-item>
    <mdb-page-item>4</mdb-page-item>
    <mdb-page-item>5</mdb-page-item>
    <mdb-page-nav next></mdb-page-nav>
    <mdb-page-item>Last</mdb-page-item>
  </mdb-pagination>
      -->
  </div>
</template>
<script>
import { mdbPagination, mdbPageItem, mdbPageNav } from 'mdbvue';

export default {
  name: 'ft-pagination',

  props: {
    maxVisibleButtons: {
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

  computed: {
    showPagination() {
      return this.total > 0 && this.total > this.perPage;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        const res = this.totalPages - this.maxVisibleButtons + 1;
        if (res <= 0) {
          return 1;
        }
        return this.totalPages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
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

<style lang="scss">
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
