export default {
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (fieldName === 'exercises') {
        return {
          'card-add--error': field.$invalid && field.$dirty
        };
      }
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    }
  }
};
