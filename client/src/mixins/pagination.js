export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        perPage: 12 // 12 -> Múltiplo de 3 y 4 para el grid
      }
    };
  },

  methods: {
    // Return just page of items needed
    pageItems(items) {
      return items.slice(
        (this.pagination.currentPage - 1) * this.pagination.perPage,
        this.pagination.currentPage * this.pagination.perPage
      );
    },

    getTotalPages(totalItems) {
      const pages = totalItems / this.pagination.perPage;
      const rest = totalItems % this.pagination.perPage;

      return rest !== 0 ? Math.ceil(pages) : pages;
    },

    onPageChange(page) {
      this.pagination.currentPage = page;
    },

    sortItems(items) {
      return items.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;

        return 0; // a must be equal to b
      });
    }
  }
};
