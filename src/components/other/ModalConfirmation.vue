<template>
  <div class="modal fade" tabindex="-1" ref="confirmationModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">{{ title }}</h4>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <p v-for="(content, index) in contents" :key="index">{{ content }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Hayır
          </button>
          <button
            type="button"
            class="btn"
            :class="'btn-' + buttonClass"
            @click="confirm"
          >
            Evet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    contents: {
      type: Array,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    param: {
      type: Object,
      default: null,
    },
    buttonClass: {
      type: String,
      default: "success",
    },
  },
  methods: {
    show() {
      const modal = new bootstrap.Modal(this.$refs.confirmationModal);
      modal.show();
    },
    closeModal() {
      const modal = bootstrap.Modal.getInstance(this.$refs.confirmationModal);
      modal.hide();
    },
    confirm() {
      this.closeModal();
      this.onConfirm(this.param);
    },
  },
};
</script>
