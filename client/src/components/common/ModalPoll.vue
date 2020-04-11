<template>
  <mdb-container class="ft-modal-poll">
    <!-- modal modal -->
    <mdb-modal
      side
      fullHeight
      :size="size"
      :position="position"
      :direction="direction"
      :show="showModal"
    >
      <mdb-modal-header center :close="false">
        <slot name="header"></slot>
      </mdb-modal-header>

      <mdb-modal-body>
        <slot name="body"></slot>
      </mdb-modal-body>

      <mdb-modal-footer center>
        <slot name="footer"></slot>
        <button class="btn btn-default btn-md" @click="closeModal()">
          Cerrar
        </button>
      </mdb-modal-footer>
    </mdb-modal>
  </mdb-container>
</template>
<script>
import {
  mdbContainer,
  mdbModal,
  mdbModalHeader,
  mdbModalBody,
  mdbModalFooter
} from 'mdbvue';
export default {
  name: 'Modalmodal',

  props: {
    modal: { type: Boolean, default: false },
    size: { type: String, default: 'fluid' },
    position: { type: String, default: 'top' },
    direction: { type: String, default: 'left' }
  },

  components: {
    mdbContainer,
    mdbModal,
    mdbModalHeader,
    mdbModalBody,
    mdbModalFooter
  },

  computed: {
    showModal() {
      return this.modal;
    }
  },

  methods: {
    closeModal() {
      this.$emit('close', false);
    }
  }
};
</script>
<style lang="scss" scoped>
.ft-modal-poll {
  & /deep/ .modal-header {
    border-bottom: 1px solid $second-dark-grey;
  }
  & /deep/ .modal-footer {
    border-top: 1px solid $second-dark-grey;
  }
  & /deep/ .modal-dialog .modal-content {
    background-color: $gray-900;
  }
}
</style>
